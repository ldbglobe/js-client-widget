import EventDispatcher from "./EventDispatcher.js";
import Messenger from "./Messenger.js";

export default  class WidgetComponent {
	static ___ = { };

	constructor(param) {
		param = param || {};

		this.___ = {
			id: param.id || window.name, // as default behavior, JS client set the ID in the windows name
			parentWindow: param.parentWindow || window.opener,
		};

		this.___.events = new EventDispatcher(this);
		this.___.messenger = new Messenger({
			id:this.___.id,
			recipient: this.___.parentWindow
		});
		this.___.messenger.on('message',this.___handleMessage.bind(this));

		// send a ready message to the opener
		setTimeout(function(){ this.___fire('widget.ready',null,"broadcast"); }.bind(this),0);
	}

	___getId() { return this.___.id; }
	getId() { return this.___getId(); }

	/* --------------------------------------------------
	 * Native available events
	 * --------------------------------------------------
	 * client.postInitialData
	 */

	___on(eventName,callback) { this.___.events.registerEvent(eventName,callback); }
	on(eventName,callback) { this.___on(eventName,callback); }

	___off(eventName,callback) { this.___.events.unregisterEvent(eventName,callback); }
	off(eventName,callback) { this.___off(eventName,callback); }

	// all the events are handled by the messenger services
	___fire(eventName,data,dest=null) {
		// send event to the widget
		if(dest === null || dest === "broadcast")
		{
			this.___.messenger.send({eventName, data});
		}
		// fire the event locally
		if(dest === null || dest === "local")
			this.___.events.fireEvent(eventName, data);
	}
	fire(eventName,data,dest=null) { this.___fire(eventName,data,dest); }

	___handleMessage(message) {
		if(message.eventName)
		{
			// received event => only local dispatch
			this.___fire(message.eventName,message.data,"local");
		}
	}
}