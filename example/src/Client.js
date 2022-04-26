import { ClientBase } from "../../src/index.js"

export class Client extends ClientBase {

	/* --------------------------------------------------
	 * Inherited methods
	 * --------------------------------------------------
	 * open()
	 * close()
	 * getId()
	 * on(eventName,callback)
	 * off(eventName,callback)
	 * fire(eventName,callback)
	 * --------------------------------------------------
	 * Native events name
	 * --------------------------------------------------
	 * open
	 * ready
	 * close
	 * --------------------------------------------------
	 * Additionnal events from the extenbded Widget class
	 * --------------------------------------------------
	 * select
	*/

	constructor(param) {
		param = param || {};
		param.widgetUrl = param.widgetUrl || './widget.html?custom-url=set-in-the-custom-client-class';
		super(param);

		this.on('TEST-EVENT',() => console.log('TEST-EVENT received in the client'));
	}

	displayMessage(message) {
		this.fire('display-message',message);
	}
}
window.Client = Client;