import EventDispatcher from "js-class.event-dispatcher";
import Messenger from "js-class.messenger";

export default  class WidgetComponent {
	static statics = { };

	constructor(param) {
		param = param || {};

		this.statics = {
			id: param.id || window.name, // as default behavior, JS client set the ID in the windows name
			defaults:undefined,
			defaultsVersion:0,
		};

		console.log(this.statics.id)

		this.statics.events = new EventDispatcher(this);
		this.statics.messenger = new Messenger({channel:this.statics.id});
		this.statics.messenger.onMessage(this.___handleMessage.bind(this));

		// send a ready message to the opener
		setTimeout(function(){ this.___fire('widget.ready',null,"broadcast"); }.bind(this),0);

		this.___on('client.postDefaults',this.___handleDefaults.bind(this));
	}

	___getId() { return this.statics.id; }
	getId() { return this.___getId(); }

	/* --------------------------------------------------
	 * Native available events
	 * --------------------------------------------------
	 * client.postDefaults // avoid to use this one
	 * widget.defaults.init
	 * widget.defaults.update
	 */

	___on(eventName,callback) { this.statics.events.registerEvent(eventName,callback); }
	on(eventName,callback) { this.___on(eventName,callback); }

	___off(eventName,callback) { this.statics.events.unregisterEvent(eventName,callback); }
	off(eventName,callback) { this.___off(eventName,callback); }

	// all the events are handled by the messenger services
	___fire(eventName,data,dest=null) {
		// send event to the widget
		if(dest === null || dest === "broadcast")
		{
			this.statics.messenger.send({eventName, data});
		}
		// fire the event locally
		if(dest === null || dest === "local")
		{
			this.statics.events.fireEvent(eventName, data);
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
		this.statics.defaults = defaults;
		this.statics.defaultsVersion++;

		if(this.statics.defaultsVersion===1)
			this.___fire('widget.defaults.init',this.statics.defaults,'local')
		else
			this.___fire('widget.defaults.update',this.statics.defaults,'local')
	}
	___getDefaults() {
		return this.statics.defaults;
	}
	getDefaults() {
		return this.___getDefaults();
	}

	___isDefaultsAvailable() {
		return this.statics.defaultsVersion>0
	}
	isDefaultsAvailable() {
		return this.___isDefaultsAvailable();
	}
}