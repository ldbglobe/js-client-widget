import WidgetBase from "../../src/WidgetBase.js"

export default class Widget extends WidgetBase {
	constructor(param) {
		super(param);
		this.messageBoard = typeof param.messageBoard === "string" ? document.querySelector(param.messageBoard) : param.messageBoard || null;
		this.on('display-message',this.__handleDisplayMessage.bind(this));
	}
	select(value) {
		this.messenger.send({eventName:'select',data:value});
	}
	__handleDisplayMessage(message) {
		if(this.messageBoard)
			this.messageBoard.innerHTML = message;
	}
}
window.Widget = Widget;