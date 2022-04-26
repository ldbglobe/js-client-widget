import EventDispatcher from "./EventDispatcher.js";

export default class Messenger {
	constructor(param) {
		param = param || {};
		this.recipient = param.recipient || null;
		this.id = param.id || (()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16)))();
		this.events = new EventDispatcher(this);
		window.addEventListener('message', this.__handleMessage.bind(this))
	}

	setRecipient(browserWindow)
	{
		this.recipient = browserWindow;
	}

	getId() {
		return this.id;
	}

	on(eventName,callback) { this.events.registerEvent(eventName,callback) }
	off(eventName,callback) { this.events.unregisterEvent(eventName,callback) }

	__handleMessage(e) {
		let data = typeof e.data === "string" ? JSON.parse(e.data) : (e.data || {});
		if(data.format === 'messenger' && data.id === this.id)
			this.events.fireEvent('message',data.message);
	}

	send(message) {
		if(this.recipient && typeof this.recipient.postMessage === "function")
		{
			this.recipient.postMessage(JSON.stringify({
				format:'messenger',
				version:1,
				id:this.id,
				message:message,
			}));
		}
	}
}