import EventDispatcher from "./EventDispatcher.js";
import Messenger from "./Messenger.js";

export default class ClientComponent {
	static ___ = {
		opened:null,
		instances:new Set(),
	};
	constructor(param) {
		param = param || {};

		this.___ = {
			id: (()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16)))(),
			widgetUrl: param.widgetUrl || null,
			widgetWindow: null,
			closeDetectionInterval: null,

		};
		this.___.events = new EventDispatcher(this);
		this.___.messenger = new Messenger({id:this.___.id});
		this.___.messenger.on('message',this.___handleMessage.bind(this));

		if(!this.___.widgetUrl)
		{
			throw `widgetUrl parameter is mandatory`
		}
		else if(this.___.widgetUrl.match(/#/))
		{
			throw `widgetUrl parameter can not contain any hash (${this.___.widgetUrl})`
		}

		ClientComponent.___.instances.add(this);
	}

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

	___open() {
		// close current instance (if previously opened)
		this.close();

		// close any other instances  previously opened
		if(ClientComponent.___.opened && ClientComponent.___.opened.id !== this.___.id)
			ClientComponent.___.opened.___close();
		ClientComponent.___.opened = this;

		this.___.widgetWindow = window.open(`${this.___.widgetUrl}#id=${this.___.id}`, this.___.id, `resizable,scrollbars,width=640,height=480,top=200,left=200, dependent, modal`);
		this.___.messenger.setRecipient(this.___.widgetWindow);
		this.___fire('widget.open',null,"local");
		this.___startDetectionLoop();
	}
	open() { this.___open(); }

	___close() {
		this.___.messenger.clearRecipient();
		this.___stopDetectionLoop();
		if(this.___.widgetWindow && !this.___.widgetWindow.closed)
		{
			this.___.widgetWindow.close();
			this.___.widgetWindow = null;
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
	// passive detection of widget popup close event
	// we do not need messenging for this
	___stopDetectionLoop() {
		clearInterval(this.___.closeDetectionInterval);
		this.___.closeDetectionInterval = null;
	}
	___startDetectionLoop() {
		if(this.___.widgetWindow.closed)
		{
			this.___stopDetectionLoop();
			// widget is closed don't bother to send any message
			// just use internal dispatcher
			this.___fire('widget.close',null,"local");
		}
		else if(!this.___.closeDetectionInterval)
		{
			this.___.closeDetectionInterval = setInterval(this.___startDetectionLoop.bind(this),10);
		}
	}
}