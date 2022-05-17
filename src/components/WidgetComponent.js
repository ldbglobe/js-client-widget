import EventDispatcher from "js-class.event-dispatcher";
import Messenger from "js-class.messenger";

export default  class WidgetComponent {
	static ___ = { };

	constructor(param) {
		param = param || {};

		this.___ = {
			id: param.id || window.name, // as default behavior, JS client set the ID in the windows name
			defaults:undefined,
			defaultsVersion:0,
		};

		console.log(this.___.id)

		this.___.events = new EventDispatcher(this);
		this.___.messenger = new Messenger({channel:this.___.id});
		this.___.messenger.onMessage(this.___handleMessage.bind(this));

		// send a ready message to the opener
		setTimeout(function(){ this.___fire('widget.ready',null,"broadcast"); }.bind(this),0);

		this.___on('client.postDefaults',this.___handleDefaults.bind(this));
	}

	___getId() { return this.___.id; }
	getId() { return this.___getId(); }

	/* --------------------------------------------------
	 * Native available events
	 * --------------------------------------------------
	 * client.postDefaults // avoid to use this one
	 * widget.defaults.init
	 * widget.defaults.update
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
		{
			this.___.events.fireEvent(eventName, data);
		}
	}
	fire(eventName,data,dest=null) { this.___fire(eventName,data,dest); }

	___handleMessage(message) {
		if(message.eventName)
		{
			// received event => only local dispatch
			this.___fire(message.eventName,message.data,"local");
		}
	}

	___handleDefaults(defaults)	{
		this.___.defaults = defaults;
		this.___.defaultsVersion++;

		if(this.___.defaultsVersion===1)
			this.___fire('widget.defaults.init',this.___.defaults,'local')
		else
			this.___fire('widget.defaults.update',this.___.defaults,'local')
	}
	___getDefaults() {
		return this.___.defaults;
	}
	getDefaults() {
		return this.___getDefaults();
	}

	___isDefaultsAvailable() {
		return this.___.defaultsVersion>0
	}
	isDefaultsAvailable() {
		return this.___isDefaultsAvailable();
	}
}