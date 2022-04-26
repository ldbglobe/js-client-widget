import ClientBase from "../../src/ClientBase.js"

export class Client extends ClientBase {

	/* --------------------------------------------------
	 * Native available events name
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