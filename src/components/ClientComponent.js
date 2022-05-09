import EventDispatcher from "./EventDispatcher.js";
import Messenger from "./Messenger.js";

export default class ClientComponent {
	static ___ = {
		opened:new Set(),
		instances:new Set(),
	};
	constructor(param) {
		param = param || {};
		param.widget = param.widget || {};

		this.___ = {
			id: (()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16)))(),
			widget: {
				limit:      param.widget.limit      || param.widgetLimit      || 1,
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

		this.___.events = new EventDispatcher(this);
		this.___.messenger = new Messenger({id:this.___.id});
		this.___.messenger.on('message',this.___handleMessage.bind(this));

		ClientComponent.___.instances.add(this);

		// handle native defaults data exchange
		this.___on('widget.ready',this.___postDefaults.bind(this)); // automatic on widget is ready

		// autoclose widget on client page refresh or close
		window.addEventListener("beforeunload",this.close.bind(this),true);
	}

	// call a method or apply a calback on all client instances registered
	static invokeAll(methodOrCallback,args) {
		if(typeof methodOrCallback === "function")
		{
			ClientComponent.___.instances.forEach(function(client) { methodOrCallback(client) });
		}
		else if(typeof methodOrCallback === "string")
		{
			ClientComponent.___.instances.forEach(function(client) {
				return typeof client?.[methodOrCallback] === "function" ? client?.[methodOrCallback](...args) : null;
			});
		}
	}

	___getId() { return this.___.id; }
	getId() { return this.___getId(); }

	/* --------------------------------------------------
	 * Native available events
	 * --------------------------------------------------
	 * widget.open
	 * widget.ready
	 * widget.close
	*/
	___on(eventName,callback) { this.___.events.registerEvent(eventName,callback) }
	on(eventName,callback) { this.___on(eventName,callback); }

	___off(eventName,callback) { this.___.events.unregisterEvent(eventName,callback) }
	off(eventName,callback) { this.___off(eventName,callback); }

	// all the events are handled by the messenger services
	___fire(eventName,data,dest=null) {
		// send event to the widget
		if(dest === null || dest === "broadcast")
			this.___.messenger.send({eventName, data});
		// fire the event locally
		if(dest === null || dest === "local")
			this.___.events.fireEvent(eventName, data);
	}
	fire(eventName,data,dest=null) { this.___fire(eventName,data,dest); }

	___open(widgetOptions=null,defaults=undefined) {
		// close current instance (if previously opened)
		this.close();
		// close any extra instances  previously opened
		this.___openedLimitRelease();
		// open new window and register the client as opened

		widgetOptions = widgetOptions || {};
		widgetOptions.url        = widgetOptions.url        || this.___.widget.url;
		widgetOptions.resizable  = widgetOptions.resizable  || this.___.widget.resizable;
		widgetOptions.scrollbars = widgetOptions.scrollbars || this.___.widget.scrollbars;
		widgetOptions.dependent  = widgetOptions.dependent  || this.___.widget.dependent;
		widgetOptions.width      = widgetOptions.width      || this.___.widget.width;
		widgetOptions.height     = widgetOptions.height     || this.___.widget.height;
		widgetOptions.top        = widgetOptions.top        || this.___.widget.top;
		widgetOptions.left       = widgetOptions.left       || this.___.widget.left;

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
			this.___.defaults = defaults;

		this.___.widget.window = window.open(widgetUrl, this.___.id, windowSettings.join(','));

		ClientComponent.___.opened.add(this);
		// then set messenger link, send event and start the "close" watcher
		this.___.messenger.setRecipient(this.___.widget.window);
		this.___fire('widget.open',null,"local");
		this.___startDetectionLoop();
	}
	open(widgetOptions,defaults=null) { this.___open(widgetOptions,defaults); }

	___close() {
		this.___stopDetectionLoop();
		this.___.messenger.clearRecipient();
		ClientComponent.___.opened.delete(this);
		if(this.___.widget.window && !this.___.widget.window.closed)
		{
			this.___.widget.window.close();
			this.___.widget.window = null;
			if(!this.___.keepDefaults)
				this.___.defaults = undefined;
			this.___fire('widget.close',null,"local");
		}
	}
	close() { this.___close(); }

	// **********************************************************
	// private methods
	// **********************************************************

	// close older client->widget to set a new free slot
	___openedLimitRelease() {
		var deleteCount = ClientComponent.___.opened.size - this.___.widget.limit + 1;
		var list = Array.from(ClientComponent.___.opened).reverse();
		for (let c of list) {
			if(deleteCount>0)
			{
				deleteCount--;
				c.close();
				ClientComponent.___.opened.delete(c)
			}
			else
			{
				break;
			}
		}
	}

	// generic message handling and event dispatch
	___handleMessage(message) {
		if(message.eventName)
		{
			// received event => only local dispatch
			this.___fire(message.eventName, message.data, "local");
		}
	}

	___postDefaults() {
		if(this.___.defaults)
		{
			this.___.messenger.send({
				eventName:'client.postDefaults',
				data:this.___.defaults
			});
			// we dont unset the data so each time we reload the data still remain for a new initialization
		}
	}
	postDefaults() {
		this.___postDefaults()
	}

	___setDefaults(defaults) {
		this.___.defaults = defaults;
		this.___postDefaults(); // send the new defaults
	}
	setDefaults(defaults) {
		this.___setDefaults(defaults)
	}
	___keepDefaults(keep) {
		this.___.keepDefaults = keep;
	}
	keepDefaults(keep) {
		this.___keepDefaults(keep)
	}

	// passive detection of widget popup close event
	// we do not need messenging for this
	___stopDetectionLoop() {
		clearInterval(this.___.closeDetectionInterval);
		this.___.closeDetectionInterval = null;
	}
	___startDetectionLoop() {
		if(this.___.widget.window.closed)
		{
			this.___close();
			this.___fire('widget.close',null,"local");
		}
		else if(!this.___.closeDetectionInterval)
		{
			this.___.closeDetectionInterval = setInterval(this.___startDetectionLoop.bind(this),10);
		}
	}
}