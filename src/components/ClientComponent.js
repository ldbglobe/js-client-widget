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
			closeDetectionInterval: null,
		};

		// position set at screen center if top or left no set
		this.___.widget.top = this.___.widget.top || (screen.height - this.___.widget.height) / 2;
		this.___.widget.left = this.___.widget.left || (screen.width - this.___.widget.width) / 2;

		this.___.events = new EventDispatcher(this);
		this.___.messenger = new Messenger({id:this.___.id});
		this.___.messenger.on('message',this.___handleMessage.bind(this));

		if(!this.___.widget.url)
		{
			throw `widge.url parameter is mandatory`
		}
		else if(this.___.widget.url.match(/#/))
		{
			throw `widget.url parameter can not contain any hash (${this.___.widget.url})`
		}

		ClientComponent.___.instances.add(this);
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

	___open(param) {
		// close current instance (if previously opened)
		this.close();
		// close any extra instances  previously opened
		this.___openedLimitRelease();
		// open new window and register the client as opened
		var windowSettings = [];
		windowSettings.push(`resizable=${this.___.widget.resizable ? 'yes':'no'}`);
		windowSettings.push(`scrollbars=${this.___.widget.scrollbars ? 'yes':'no'}`);
		windowSettings.push(`dependent=${this.___.widget.dependent ? 'yes':'no'}`);
		if(this.___.widget.width)      windowSettings.push(`width=${this.___.widget.width}`);
		if(this.___.widget.height)     windowSettings.push(`height=${this.___.widget.height}`);
		if(this.___.widget.top)        windowSettings.push(`top=${this.___.widget.top}`);
		if(this.___.widget.left)       windowSettings.push(`left=${this.___.widget.left}`);

		var widgetUrl = param && param.widgetUrl
			// if custom widgetUrl set in parameters we simply use it
			? param.widgetUrl
			// else if widget url is a function we call it with the received param to build the real url string
			: (typeof this.___.widget.url === 'function' ? this.___.widget.url(param) : this.___.widget.url);

		this.___.widget.window = window.open(`${widgetUrl}`, this.___.id, windowSettings.join(','));

		ClientComponent.___.opened.add(this);
		// then set messenger link, send event and start the "close" watcher
		this.___.messenger.setRecipient(this.___.widget.window);
		this.___fire('widget.open',null,"local");
		this.___startDetectionLoop();
	}
	open(param) { this.___open(param); }

	___close() {
		this.___stopDetectionLoop();
		this.___.messenger.clearRecipient();
		ClientComponent.___.opened.delete(this);
		if(this.___.widget.window && !this.___.widget.window.closed)
		{
			this.___.widget.window.close();
			this.___.widget.window = null;
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
		}
		else if(!this.___.closeDetectionInterval)
		{
			this.___.closeDetectionInterval = setInterval(this.___startDetectionLoop.bind(this),10);
		}
	}
}