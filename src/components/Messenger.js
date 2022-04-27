import EventDispatcher from "./EventDispatcher.js";

export default class Messenger {
	constructor(param) {
		param = param || {};

		this.recipients = new Set();

		if(param.recipient)
			this.setRecipient(param.recipient);

		this.id = param.id || (()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16)))();
		this.events = new EventDispatcher(this);
		window.addEventListener('message', this.__handleMessage.bind(this))
	}

	setRecipient(browserWindow) {
		if(browserWindow && browserWindow.length > 0)
		{
			this.recipients = new Set(browserWindow);
		}
		else if(browserWindow)
		{
			this.recipients = new Set([browserWindow]);
		}
	}
	addRecipient(browserWindow) {
		if(browserWindow)
		{
			this.recipients.add(browserWindow);
		}
	}
	deleteRecipient(browserWindow) {
		if(browserWindow)
		{
			this.recipients.delete(browserWindow);
		}
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
		if(this.recipients.size > 0)
		{
			this.recipients.forEach(function(message, recipient) {
				if(typeof recipient.postMessage === "function")
				{
					recipient.postMessage(JSON.stringify({
						format:'messenger',
						version:1,
						id:this.id,
						message:message,
					}),"*");
				}
			}.bind(this,message));
		}
	}
}