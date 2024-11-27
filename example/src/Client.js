import { ClientComponent } from "../../src/index.js"

export class Client extends ClientComponent {

	/* --------------------------------------------------
	 * Inherited methods
	 * --------------------------------------------------
	 * open()
	 * close()
	 * getId()
	 * on((string)eventName,(function)callback)
	 * off((string)eventName,(function)callback)
	 * fire((string)eventName,(mixed)data,([null,client,widget])destination)
	 * --------------------------------------------------
	 * Native events name
	 * --------------------------------------------------
	 * widget.open
	 * widget.ready
	 * widget.close
	 * --------------------------------------------------
	 * Additionnal events from the extenbded Widget class
	 * --------------------------------------------------
	 * select
	*/

	constructor(param) {
		param = param || {};
		param.widgetUrl = param.widgetUrl || './widget.html?custom-url=set-in-the-custom-client-class';
		super(param);

		this.on('TEST-EVENT', (data) => console.log('TEST-EVENT received in the client', data));
	}

	displayMessage(message) {
		this.fire('display-message', message);
	}
}
window.Client = Client;