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

You can consult an extended client/widget demonstration here
[ldbglobe.github.io/js-client-widget/example/dist](https://ldbglobe.github.io/js-client-widget/example/dist)

Or a native implementation (direct call of the components classes)
[ldbglobe.github.io/js-client-widget/example-native](https://ldbglobe.github.io/js-client-widget/example-native)

Client
```html
<script>
var counter = 0;
var client = new ClientComponent({widgetUrl:'widget.html'});
client.on('counter++',function(){counter++; refresh(); })
client.on('counter--',function(){counter--; refresh(); })
function refresh(){
	document.querySelector('.counter').innerHTML = counter;
}
</script>
<button onclick="client.open();">Open</button>
<span class="counter">0</span>
```

Widget
```html
<script>
var widget = new WidgetComponent();
</script>
<button onclick="widget.fire('counter--');">-</button>
<button onclick="widget.fire('counter++');">+</button>
```