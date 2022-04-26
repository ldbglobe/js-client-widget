import WidgetBase from "../../src/WidgetBase.js"

export default class Widget extends WidgetBase {

	/* --------------------------------------------------
	 * Inherited methods
	 * --------------------------------------------------
	 * getId()
	 * on(eventName,callback)
	 * off(eventName,callback)
	 * fire(eventName,callback)
	 * --------------------------------------------------
	 * Native available events name
	 * --------------------------------------------------
	 * [no native events]
	 * --------------------------------------------------
	 * Additionnal events from the extended Client class
	 * --------------------------------------------------
	 * display-message
	*/

	constructor(param) {
		super(param);
		this.messageBoard = typeof param.messageBoard === "string" ? document.querySelector(param.messageBoard) : param.messageBoard || null;
		this.on('display-message',this.handleDisplayMessage.bind(this));
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