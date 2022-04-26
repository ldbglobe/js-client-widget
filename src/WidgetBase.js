import EventDispatcher from "./EventDispatcher.js";
import Messenger from "./Messenger.js";

export default  class WidgetBase {
	static ___ = { };

	constructor(param) {
		param = param || {};

		this.___ = {
			id: param.id || this.___extractIdFromBRowserHash(), // as default behavior, JS client set the ID in the location hash
			parentWindow: param.parentWindow || window.opener,
		};

		this.___.events = new EventDispatcher(this);
		this.___.messenger = new Messenger({
			id:this.___.id,
			recipient: this.___.parentWindow
		});
		this.___.messenger.on('message',this.___handleMessage.bind(this));

		// send a ready message to the opener
		setTimeout(function(){ this.___.messenger.send({eventName:'ready', data:null}); }.bind(this),0);
	}

	/* --------------------------------------------------
	 * Native available events
	 * --------------------------------------------------
	* [no native events]
	*/

	___on(eventName,callback) { this.___.events.registerEvent(eventName,callback) }
	on(eventName,callback) { this.___on(eventName,callback); }

	___off(eventName,callback) { this.___.events.unregisterEvent(eventName,callback) }
	off(eventName,callback) { this.___off(eventName,callback); }

	// all the events are handled by the messenger services
	___fire(eventName,data) { this.___.messenger.send({eventName, data}); }
	fire(eventName,callback) { this.___fire(eventName,callback); }

	___extractIdFromBRowserHash() {
		var reg = document.location.hash.match(/#id=([a-z0-9-]+)/)
		if(reg)
			return reg[1];
		return null;
	}

	___handleMessage(message) {
		if(message.eventName)
		{
			this.___.events.fireEvent(message.eventName,message.data);
		}
	}
}