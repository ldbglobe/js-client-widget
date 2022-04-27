import EventDispatcher from "./EventDispatcher.js";
import Messenger from "./Messenger.js";

export default class ClientBase {
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

		ClientBase.___.instances.add(this);
	}

	static invokeAll(methodOrCallback,args) {
		if(typeof methodOrCallback === "function")
		{
			ClientBase.___.instances.forEach(function(client) { methodOrCallback(client) });
		}
		else if(typeof methodOrCallback === "string")
		{
			ClientBase.___.instances.forEach(function(client) {
				return typeof client?.[methodOrCallback] === "function" ? client?.[methodOrCallback](...args) : null;
			});
		}
	}

	___getId() { return this.___.id; }
	getId() { return this.___getId(); }

	/* --------------------------------------------------
	 * Native available events
	 * --------------------------------------------------
	 * open
	 * ready
	 * close
	*/
	___on(eventName,callback) { this.___.events.registerEvent(eventName,callback) }
	on(eventName,callback) { this.___on(eventName,callback); }

	___off(eventName,callback) { this.___.events.unregisterEvent(eventName,callback) }
	off(eventName,callback) { this.___off(eventName,callback); }

	// all the events are handled by the messenger services
	___fire(eventName,data) { this.___.messenger.send({eventName, data}); }
	fire(eventName,callback) { this.___fire(eventName,callback); }

	___open() {
		// close current instance (if previously opened)
		this.close();

		// close any other instances  previously opened
		if(ClientBase.___.opened && ClientBase.___.opened.id !== this.___.id)
			ClientBase.___.opened.___close();
		ClientBase.___.opened = this;

		this.___.widgetWindow = window.open(`${this.___.widgetUrl}#id=${this.___.id}`, this.___.id, `resizable,scrollbars,width=640,height=480,top=200,left=200, dependent, modal`);
		this.___.messenger.setRecipient(this.___.widgetWindow);
		this.___.events.fireEvent('open');
		this.___startDetectionLoop();
	}
	open() { this.___open(); }

	___close() {
		this.___.messenger.setRecipient(null);
		this.___stopDetectionLoop();
		if(this.___.widgetWindow && !this.___.widgetWindow.closed)
		{
			this.___.widgetWindow.close();
			this.___.widgetWindow = null;
			this.___.events.fireEvent('close');
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
			this.___.events.fireEvent(message.eventName, message.data);
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
			this.___.events.fireEvent('close');
		}
		else if(!this.___.closeDetectionInterval)
		{
			this.___.closeDetectionInterval = setInterval(this.___startDetectionLoop.bind(this),10);
		}
	}
}