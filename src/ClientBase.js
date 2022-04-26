import EventDispatcher from "./EventDispatcher.js";
import Messenger from "./Messenger.js";

export default class ClientBase {
	static opened = null;
	constructor(param) {
		param = param || {};

		this.id = (()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16)))();
		this.widgetWindow = null;
		this.events = new EventDispatcher(this);
		this.__closeDetectionInterval = null;
		this.messenger = new Messenger({id:this.id});
		this.messenger.on('message',this.__handleMessage.bind(this));
	}

	/* --------------------------------------------------
	 * Native available events name from WidgetBase class
	 * --------------------------------------------------
	 * open
	 * ready
	 * close
	*/
	on(eventName,callback) { this.events.registerEvent(eventName,callback) }
	off(eventName,callback) { this.events.unregisterEvent(eventName,callback) }

	open() {
		// close current instance (if previously opened)
		this.close();

		// close any other instances  previously opened
		if(Client.opened && Client.opened.id !== this.id)
			Client.opened.close();
		Client.opened = this;

		this.widgetWindow = window.open(`widget.html#id=${this.id}`, this.id, `resizable,scrollbars,width=640,height=480,top=200,left=200, dependent, modal`);
		this.messenger.setRecipient(this.widgetWindow);
		this.events.fireEvent('open');
		this.__startDetectionLoop();
	}

	close() {
		this.messenger.setRecipient(null);
		this.__stopDetectionLoop();
		if(this.widgetWindow && !this.widgetWindow.closed)
		{
			this.widgetWindow.close();
			this.widgetWindow = null;
			this.events.fireEvent('close');
		}
	}

	__handleMessage(message) {
		if(message.eventName)
		{
			this.events.fireEvent(message.eventName,message.data);
		}
	}

	// passive detection of widget popup close event
	// we do not need messenging for this
	__stopDetectionLoop() {
		clearInterval(this.__closeDetectionInterval);
		this.__closeDetectionInterval = null;
	}
	__startDetectionLoop() {
		if(this.widgetWindow.closed)
		{
			this.__stopDetectionLoop();
			this.events.fireEvent('close');
		}
		else if(!this.__closeDetectionInterval)
		{
			this.__closeDetectionInterval = setInterval(this.__startDetectionLoop.bind(this),10);
		}
	}
}