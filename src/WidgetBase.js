import EventDispatcher from "./EventDispatcher.js";
import Messenger from "./Messenger.js";

export default  class WidgetBase {
	constructor(param) {
		param = param || {};
		this.parentWindow = param.parentWindow || window.opener;
		this.events = new EventDispatcher(this);
		this.messenger = new Messenger({
			id:param.id || this.__extractIdFromBRowserHash(), // as default behavior, JS client set the ID in the location hash
			recipient: this.parentWindow,
		});
		this.messenger.on('message',this.__handleMessage.bind(this));

		// send a ready message to the opener
		setTimeout(function(){ this.messenger.send({eventName:'ready', data:null}); }.bind(this),0);
	}

	on(eventName,callback) { this.events.registerEvent(eventName,callback) }
	off(eventName,callback) { this.events.unregisterEvent(eventName,callback) }

	__extractIdFromBRowserHash() {
		var reg = document.location.hash.match(/#id=([a-z0-9-]+)/)
		if(reg)
			return reg[1];
		return null;
	}

	__handleMessage(message) {
		if(message.eventName)
		{
			this.events.fireEvent(message.eventName,message.data);
		}
	}
}