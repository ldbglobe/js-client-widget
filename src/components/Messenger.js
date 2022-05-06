import EventDispatcher from "./EventDispatcher.js";

export default class Messenger {
	constructor(param) {
		param = param || {};

		this.id = param.id || (()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16)))();

		this.recipients = [];
		this.setRecipient(param.recipient);

		this.events = new EventDispatcher(this);
		window.addEventListener('message', this.__handleMessage.bind(this))
	}

	clearRecipient() {
		this.recipients = [];
	}
	setRecipient(browserWindow) {
		this.clearRecipient();
		this.addRecipient(browserWindow);
	}
	addRecipient(browserWindow) {
		if(browserWindow)
		{
			if(this.recipients.indexOf(browserWindow)<0)
				this.recipients.push(browserWindow);
		}
	}
	deleteRecipient(browserWindow) {
		if(browserWindow && this.recipients.indexOf(browserWindow)>=0)
		{
			for(let i=0; i<this.recipients.length; i++)
			{
				if(this.recipients[i] === browserWindow)
				{
					delete this.recipients[i];
					break;
				}
			}
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
		if(this.recipients.length > 0)
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