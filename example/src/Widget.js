import { WidgetComponent } from "../../src/index.js"

export default class Widget extends WidgetComponent {

	/* --------------------------------------------------
	 * Inherited methods
	 * --------------------------------------------------
	 * getId()
	 * on((string)eventName,(function)callback)
	 * off((string)eventName,(function)callback)
	 * fire((string)eventName,(mixed)data,([null,client,widget])destination)
	 * --------------------------------------------------
	 * Native available events name
	 * --------------------------------------------------
	 * client.postInitialData
	 * --------------------------------------------------
	 * Additionnal events from the extended Client class
	 * --------------------------------------------------
	 * display-message
	*/

	constructor(param) {
		super(param);
		this.messageBoard = typeof param.messageBoard === "string" ? document.querySelector(param.messageBoard) : param.messageBoard || null;
		this.on('display-message',this.handleDisplayMessage.bind(this));

		this.on('TEST-EVENT',() => console.log('TEST-EVENT received in the widget'));
	}
	select(value) {
		this.fire('select',value);
	}
	handleDisplayMessage(message) {
		if(this.messageBoard)
			this.messageBoard.innerHTML = message;
	}
}
window.Widget = Widget;