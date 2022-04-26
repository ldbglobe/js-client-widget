import ClientBase from "../../src/ClientBase.js"

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

	displayMessage(message) {
		this.fire('display-message',message);
	}
}
window.Client = Client;