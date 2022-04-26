import ClientBase from "../../src/ClientBase.js"

export class Client extends ClientBase {

	/* --------------------------------------------------
	 * Native available events name from WidgetBase class
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
		this.messenger.send({eventName:'display-message',data:message});
	}
}
window.Client = Client;