# JS-Client-Widget

Extendable javascript class to easily build some Client script + Popin Widget

## Install

```/bash
npm i js-client-widget
```

```/bash
yarn add js-client-widget
```

## Usage

```js
// Client.js
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

		this.on('TEST-EVENT',() => console.log('TEST-EVENT received in the client'));
	}
	displayMessage(message) {
		this.fire('display-message',message);
	}
}
```

```js
//Widget.js
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

		this.on('TEST-EVENT',(data) => console.log('TEST-EVENT received in the client',data));
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
```

## Client/Widget interraction (Events handling)

```js
/**
 * adding an event listener on one side (client or widget)
 * eg. in the constructor
 * @param (string) eventName 
 * @param (function) callback(data)
 */
this.on('TEST-EVENT',(data) => console.log('TEST-EVENT received in the client',data));
```

```js
/**
 * and just fire an event on the other site (client or widget)
 * eg. from a custom internal method or directly from the instance var using the .fire() method
 * myClient.fire(eventName, data, dest)
 * @param (string)eventName 
 * @param (mixed)data (must be JSON encodable)
 * @param (mixed)dest [null,"widget","client"] Target of the event
 */ 
this.fire('TEST-EVENT',"optionnal additional data !!will be JSON.stringified!!");
```

## Demonstration

You can consult an extended client/widget demonstration here
[ldbglobe.github.io/js-client-widget/example/dist](https://ldbglobe.github.io/js-client-widget/example/dist)

Or a native implementation (direct call of the components classes)
[ldbglobe.github.io/js-client-widget/example-native](https://ldbglobe.github.io/js-client-widget/example-native)
