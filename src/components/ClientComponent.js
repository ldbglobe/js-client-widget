import EventDispatcher from "js-class.event-dispatcher";
import Messenger from "js-class.messenger";

export default class ClientComponent {
	static statics = {
		opened:new Set(),
		openLimit:null,
		instances:new Set(),
	};
	constructor(param) {
		param = param || {};
		param.widget = param.widget || {};

		this.statics = {
			id: (()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16)))(),
			widget: {
				url:        param.widget.url        || param.widgetUrl        || null,
				resizable:  param.widget.resizable  || param.widgetResizable  || true,
				scrollbars: param.widget.scrollbars || param.widgetScrollbars || true,
				dependent:  param.widget.dependent  || param.widgetDependent  || true,
				width:      param.widget.width      || param.widgetWidth      || 600,
				height:     param.widget.height     || param.widgetHeight     || 400,
				top:        param.widget.top        || param.widgetTop        || null,
				left:       param.widget.left       || param.widgetLeft       || null,
				window:     null,
			},
			defaults:undefined, // defaults data (can be set up on widget open)
			keepDefaults:false, // if set to true, keep defaults data accross widget open/close cycles
			closeDetectionInterval: null,
		};

		this.statics.events = new EventDispatcher(this);
		this.statics.messenger = new Messenger({channel:this.statics.id});
		this.statics.messenger.onMessage(this.___handleMessage.bind(this));

		ClientComponent.statics.instances.add(this);

		// handle native defaults data exchange
		this.___on('widget.ready',this.___postDefaults.bind(this)); // automatic on widget is ready

		// autoclose widget on client page refresh or close
		window.addEventListener("beforeunload",this.close.bind(this),true);
	}

	static setOpenLimit(limit) {
		ClientComponent.statics.openLimit = limit;
		ClientComponent.openLimitApply();
	}

	// close older client->widget to set a new free slot
	static openLimitApply(releaseASlot=false) {
		if(ClientComponent.statics.openLimit>0)
		{
			var limit = ClientComponent.statics.openLimit
			var opened = ClientComponent.statics.opened.size + (releaseASlot ? 1:0);
			if(opened > limit)
			{
				var c = Array.from(ClientComponent.statics.opened)[0];
				if(c)
				{
					c.close();
					ClientComponent.openLimitApply(releaseASlot);
				}
			}
		}
	}

	// call a method or apply a calback on all client instances registered
	static invokeAll(methodOrCallback,args) {
		if(typeof methodOrCallback === "function")
		{
			ClientComponent.statics.instances.forEach(function(client) { methodOrCallback(client) });
		}
		else if(typeof methodOrCallback === "string")
		{
			ClientComponent.statics.instances.forEach(function(client) {
				return typeof client?.[methodOrCallback] === "function" ? client?.[methodOrCallback](...args) : null;
			});
		}
	}

	___getId() { return this.statics.id; }
	getId() { return this.___getId(); }

	/* --------------------------------------------------
	 * Native available events
	 * --------------------------------------------------
	 * widget.open
	 * widget.ready
	 * widget.close
	*/
	___on(eventName,callback) { this.statics.events.registerEvent(eventName,callback) }
	on(eventName,callback) { this.___on(eventName,callback); }

	___off(eventName,callback) { this.statics.events.unregisterEvent(eventName,callback) }
	off(eventName,callback) { this.___off(eventName,callback); }

	// all the events are handled by the messenger services
	___fire(eventName,data,dest=null) {
		// send event to the widget
		if(dest === null || dest === "broadcast")
		{
			this.statics.messenger.send({eventName, data});
		}
		// fire the event locally
		if(dest === null || dest === "local")
		{
			this.statics.events.fireEvent(eventName, data);
		}
	}
	fire(eventName,data,dest=null) { this.___fire(eventName,data,dest); }

	___open(widgetOptions=null,defaults=undefined) {
		// close current instance (if previously opened)
		this.close();
		// close any extra instances  previously opened
		ClientComponent.openLimitApply(true);
		// open new window and register the client as opened

		widgetOptions = widgetOptions || {};
		widgetOptions.url        = widgetOptions.url        || this.statics.widget.url;
		widgetOptions.resizable  = widgetOptions.resizable  || this.statics.widget.resizable;
		widgetOptions.scrollbars = widgetOptions.scrollbars || this.statics.widget.scrollbars;
		widgetOptions.dependent  = widgetOptions.dependent  || this.statics.widget.dependent;
		widgetOptions.width      = widgetOptions.width      || this.statics.widget.width;
		widgetOptions.height     = widgetOptions.height     || this.statics.widget.height;
		widgetOptions.top        = widgetOptions.top        || this.statics.widget.top;
		widgetOptions.left       = widgetOptions.left       || this.statics.widget.left;

		// position set at screen center if top or left no set
		widgetOptions.top = widgetOptions.top || (screen.height - widgetOptions.height) / 2;
		widgetOptions.left = widgetOptions.left || (screen.width - widgetOptions.width) / 2;

		var windowSettings = [];
		windowSettings.push(`resizable=${widgetOptions.resizable ? 'yes':'no'}`);
		windowSettings.push(`scrollbars=${widgetOptions.scrollbars ? 'yes':'no'}`);
		windowSettings.push(`dependent=${widgetOptions.dependent ? 'yes':'no'}`);
		if(widgetOptions.width)  windowSettings.push(`width=${widgetOptions.width}`);
		if(widgetOptions.height) windowSettings.push(`height=${widgetOptions.height}`);
		if(widgetOptions.top)    windowSettings.push(`top=${widgetOptions.top}`);
		if(widgetOptions.left)   windowSettings.push(`left=${widgetOptions.left}`);

		var widgetUrl = widgetOptions.url;

		if(!widgetUrl)
		{
			throw `widget url parameter missing`;
			return ;
		}

		if(defaults!==undefined)
			this.statics.defaults = defaults;

		this.statics.widget.window = window.open(widgetUrl, this.statics.id, windowSettings.join(','));
		this.statics.messenger.addRecipient(this.statics.widget.window);

		ClientComponent.statics.opened.add(this);
		// then set messenger link, send event and start the "close" watcher
		this.___fire('widget.open',null,"local");
		this.___startDetectionLoop();
	}
	open(widgetOptions,defaults=null) { this.___open(widgetOptions,defaults); }

	___close() {
		this.___stopDetectionLoop();
		ClientComponent.statics.opened.delete(this);
		if(this.statics.widget.window && !this.statics.widget.window.closed)
		{
			this.statics.widget.window.close();
			this.statics.widget.window = null;
			if(!this.statics.keepDefaults)
				this.statics.defaults = undefined;
			this.___fire('widget.close',null,"local");
		}
	}
	close() { this.___close(); }

	// **********************************************************
	// private methods
	// **********************************************************

	// generic message handling and event dispatch
	___handleMessage(message) {
		if(message.eventName)
		{
			// received event => only local dispatch
			this.___fire(message.eventName, message.data, "local");
		}
	}

	___postDefaults() {
		if(this.statics.defaults)
		{
			this.statics.messenger.send({
				eventName:'client.postDefaults',
				data:this.statics.defaults
			});
			// we dont unset the data so each time we reload the data still remain for a new initialization
		}
	}
	postDefaults() {
		this.___postDefaults()
	}

	___setDefaults(defaults) {
		this.statics.defaults = defaults;
		this.___postDefaults(); // send the new defaults
	}
	setDefaults(defaults) {
		this.___setDefaults(defaults)
	}
	___keepDefaults(keep) {
		this.statics.keepDefaults = keep;
	}
	keepDefaults(keep) {
		this.___keepDefaults(keep)
	}

	// passive detection of widget popup close event
	// we do not need messenging for this
	___stopDetectionLoop() {
		clearInterval(this.statics.closeDetectionInterval);
		this.statics.closeDetectionInterval = null;
	}
	___startDetectionLoop() {
		if(this.statics.widget.window.closed)
		{
			this.___close();
			this.___fire('widget.close',null,"local");
		}
		else if(!this.statics.closeDetectionInterval)
		{
			this.statics.closeDetectionInterval = setInterval(this.___startDetectionLoop.bind(this),10);
		}
	}
}