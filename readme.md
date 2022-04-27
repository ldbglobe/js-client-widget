# JS-Client-Widget

Extendable javascript class to easily build some Client script + Popin Widget

## Install

```/bash
npm i js-client-widget
```

```/bash
yarn add -D js-client-widget
```

## Usage

```js
// myClient.js
import { ClientBase } from "js-client-widget"
class Client extends ClientBase {
	constructor(param) {
		param = param || {};
		super(param);
	}
}
```

```js
// myWidget.js
import { WidgetBase } from "js-client-widget"
class Widget extends WidgetBase {
	constructor(param) {
		param = param || {};
		super(param);
	}
}
```

## Client/Widget interraction (Events handling)

```js
// adding an event listener on one side (client or widget)
// eg. in the constructor
this.on('TEST',() => console.log('TEST received '));
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
myClient.fire('TEST',"optionnal additional data !!will be JSON.stringified!!");
```



## Demonstration

You can consult an simple client/widget demonstration here [https://ldbglobe.github.io/js-client-widget/example/dist/index.html](https://ldbglobe.github.io/js-client-widget/example/dist/index.html)