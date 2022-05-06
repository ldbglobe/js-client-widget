(()=>{"use strict";var e={d:(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function n(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}
/*!***********************************!*\
  !*** ./src/Widget.js + 5 modules ***!
  \***********************************/
e.r(t),e.d(t,{default:()=>S});var i=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.eventSource=t,this.events=new Set}var t,i,o;return t=e,(i=[{key:"registerEvent",value:function(e,t){"function"==typeof t&&(this.events[e]||(this.events[e]=new Set),this.events[e].add(t))}},{key:"unregisterEvent",value:function(e,t){this.events[e]&&this.events[e].delete(t)}},{key:"fireEvent",value:function(e,t){this.events[e]&&this.events[e].forEach(function(n,i){n(t,{eventSource:this.eventSource,eventName:e,data:t})}.bind(this))}}])&&n(t.prototype,i),o&&n(t,o),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var s,a,l,u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t=t||{},this.setRecipient(t.recipient),this.id=t.id||([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^16*Math.random()>>e/4).toString(16)})),this.events=new i(this),window.addEventListener("message",this.__handleMessage.bind(this))}var t,n,s;return t=e,(n=[{key:"clearRecipient",value:function(){this.recipients=new Set}},{key:"setRecipient",value:function(e){this.clearRecipient(),this.addRecipient(e)}},{key:"addRecipient",value:function(e){e&&this.recipients.add(e)}},{key:"deleteRecipient",value:function(e){if(e&&e.length>0)for(var t=0;t<e.length;t++)this.recipients.delete(e[t]);else e&&this.recipients.delete(e)}},{key:"getId",value:function(){return this.id}},{key:"on",value:function(e,t){this.events.registerEvent(e,t)}},{key:"off",value:function(e,t){this.events.unregisterEvent(e,t)}},{key:"__handleMessage",value:function(e){var t="string"==typeof e.data?JSON.parse(e.data):e.data||{};"messenger"===t.format&&t.id===this.id&&this.events.fireEvent("message",t.message)}},{key:"send",value:function(e){this.recipients.size>0&&this.recipients.forEach(function(e,t){console.log(e,t,o(t.postMessage)),"function"==typeof t.postMessage&&t.postMessage(JSON.stringify({format:"messenger",version:1,id:this.id,message:e}),"*")}.bind(this,e))}}])&&r(t.prototype,n),s&&r(t,s),Object.defineProperty(t,"prototype",{writable:!1}),e}();function _(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||f(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){if(e){if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function d(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function h(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),(t=t||{}).widget=t.widget||{},this.___={id:([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^16*Math.random()>>e/4).toString(16)})),widget:{limit:t.widget.limit||t.widgetLimit||1,url:t.widget.url||t.widgetUrl||null,resizable:t.widget.resizable||t.widgetResizable||!0,scrollbars:t.widget.scrollbars||t.widgetScrollbars||!0,dependent:t.widget.dependent||t.widgetDependent||!0,width:t.widget.width||t.widgetWidth||600,height:t.widget.height||t.widgetHeight||400,top:t.widget.top||t.widgetTop||null,left:t.widget.left||t.widgetLeft||null,window:null},defaults:void 0,keepDefaults:!1,closeDetectionInterval:null},this.___.events=new i(this),this.___.messenger=new u({id:this.___.id}),this.___.messenger.on("message",this.___handleMessage.bind(this)),e.___.instances.add(this),this.___on("widget.ready",this.___postDefaults.bind(this))}var t,n,o;return t=e,n=[{key:"___getId",value:function(){return this.___.id}},{key:"getId",value:function(){return this.___getId()}},{key:"___on",value:function(e,t){this.___.events.registerEvent(e,t)}},{key:"on",value:function(e,t){this.___on(e,t)}},{key:"___off",value:function(e,t){this.___.events.unregisterEvent(e,t)}},{key:"off",value:function(e,t){this.___off(e,t)}},{key:"___fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;null!==n&&"broadcast"!==n||this.___.messenger.send({eventName:e,data:t}),null!==n&&"local"!==n||this.___.events.fireEvent(e,t)}},{key:"fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.___fire(e,t,n)}},{key:"___open",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.close(),this.___openedLimitRelease(),(t=t||{}).url=t.url||this.___.widget.url,t.resizable=t.resizable||this.___.widget.resizable,t.scrollbars=t.scrollbars||this.___.widget.scrollbars,t.dependent=t.dependent||this.___.widget.dependent,t.width=t.width||this.___.widget.width,t.height=t.height||this.___.widget.height,t.top=t.top||this.___.widget.top,t.left=t.left||this.___.widget.left,t.top=t.top||(screen.height-t.height)/2,t.left=t.left||(screen.width-t.width)/2;var i=[];i.push("resizable=".concat(t.resizable?"yes":"no")),i.push("scrollbars=".concat(t.scrollbars?"yes":"no")),i.push("dependent=".concat(t.dependent?"yes":"no")),t.width&&i.push("width=".concat(t.width)),t.height&&i.push("height=".concat(t.height)),t.top&&i.push("top=".concat(t.top)),t.left&&i.push("left=".concat(t.left));var o=t.url;if(!o)throw"widget url parameter missing";void 0!==n&&(this.___.defaults=n),this.___.widget.window=window.open(o,this.___.id,i.join(",")),e.___.opened.add(this),this.___.messenger.setRecipient(this.___.widget.window),this.___fire("widget.open",null,"local"),this.___startDetectionLoop()}},{key:"open",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.___open(e,t)}},{key:"___close",value:function(){this.___stopDetectionLoop(),this.___.messenger.clearRecipient(),e.___.opened.delete(this),this.___.widget.window&&!this.___.widget.window.closed&&(this.___.widget.window.close(),this.___.widget.window=null,this.___.keepDefaults||(this.___.defaults=void 0),this.___fire("widget.close",null,"local"))}},{key:"close",value:function(){this.___close()}},{key:"___openedLimitRelease",value:function(){var t,n=e.___.opened.size-this.___.widget.limit+1,i=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=f(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,o=function(){};return{s:o,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,s=!0,a=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){a=!0,r=e},f:function(){try{s||null==n.return||n.return()}finally{if(a)throw r}}}}(Array.from(e.___.opened).reverse());try{for(i.s();!(t=i.n()).done;){var o=t.value;if(!(n>0))break;n--,o.close(),e.___.opened.delete(o)}}catch(e){i.e(e)}finally{i.f()}}},{key:"___handleMessage",value:function(e){e.eventName&&this.___fire(e.eventName,e.data,"local")}},{key:"___postDefaults",value:function(){this.___.defaults&&this.___.messenger.send({eventName:"client.postDefaults",data:this.___.defaults})}},{key:"postDefaults",value:function(){this.___postDefaults()}},{key:"___setDefaults",value:function(e){this.___.defaults=e,this.___postDefaults()}},{key:"setDefaults",value:function(e){this.___setDefaults(e)}},{key:"___keepDefaults",value:function(e){this.___.keepDefaults=e}},{key:"keepDefaults",value:function(e){this.___keepDefaults(e)}},{key:"___stopDetectionLoop",value:function(){clearInterval(this.___.closeDetectionInterval),this.___.closeDetectionInterval=null}},{key:"___startDetectionLoop",value:function(){this.___.widget.window.closed?this.___close():this.___.closeDetectionInterval||(this.___.closeDetectionInterval=setInterval(this.___startDetectionLoop.bind(this),10))}}],o=[{key:"invokeAll",value:function(t,n){"function"==typeof t?e.___.instances.forEach((function(e){t(e)})):"string"==typeof t&&e.___.instances.forEach((function(e){return"function"==typeof(null==e?void 0:e[t])?null==e?void 0:e[t].apply(e,_(n)):null}))}}],n&&d(t.prototype,n),o&&d(t,o),Object.defineProperty(t,"prototype",{writable:!1}),e}(),a="___",l={opened:new Set,instances:new Set},a in s?Object.defineProperty(s,a,{value:l,enumerable:!0,configurable:!0,writable:!0}):s[a]=l;var p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t=t||{},this.___={id:t.id||window.name,parentWindow:t.parentWindow||window.opener.top,defaults:void 0,defaultsVersion:0},this.___.events=new i(this),this.___.messenger=new u({id:this.___.id,recipient:this.___.parentWindow}),this.___.messenger.on("message",this.___handleMessage.bind(this)),setTimeout(function(){this.___fire("widget.ready",null,"broadcast")}.bind(this),0),this.___on("client.postDefaults",this.___handleDefaults.bind(this))}var t,n,o;return t=e,n=[{key:"___getId",value:function(){return this.___.id}},{key:"getId",value:function(){return this.___getId()}},{key:"___on",value:function(e,t){this.___.events.registerEvent(e,t)}},{key:"on",value:function(e,t){this.___on(e,t)}},{key:"___off",value:function(e,t){this.___.events.unregisterEvent(e,t)}},{key:"off",value:function(e,t){this.___off(e,t)}},{key:"___fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;null!==n&&"broadcast"!==n||this.___.messenger.send({eventName:e,data:t}),null!==n&&"local"!==n||this.___.events.fireEvent(e,t)}},{key:"fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.___fire(e,t,n)}},{key:"___handleMessage",value:function(e){e.eventName&&this.___fire(e.eventName,e.data,"local")}},{key:"___handleDefaults",value:function(e){this.___.defaults=e,this.___.defaultsVersion++,1===this.___.defaultsVersion?this.___fire("widget.defaults.init",this.___.defaults,"local"):this.___fire("widget.defaults.update",this.___.defaults,"local")}},{key:"___getDefaults",value:function(){return this.___.defaults}},{key:"getDefaults",value:function(){return this.___getDefaults()}},{key:"___isDefaultsAvailable",value:function(){return this.___.defaultsVersion>0}},{key:"isDefaultsAvailable",value:function(){return this.___isDefaultsAvailable()}}],n&&h(t.prototype,n),o&&h(t,o),Object.defineProperty(t,"prototype",{writable:!1}),e}();function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function y(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function g(e,t){return g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},g(e,t)}function w(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=k(e);if(t){var o=k(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return b(this,n)}}function b(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return m(e)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},k(e)}!function(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}(p,"___",{});var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(r,e);var t,n,i,o=w(r);function r(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),(t=o.call(this,e)).messageBoard="string"==typeof e.messageBoard?document.querySelector(e.messageBoard):e.messageBoard||null,t.on("display-message",t.handleDisplayMessage.bind(m(t))),t.on("TEST-EVENT",(function(){return console.log("TEST-EVENT received in the widget")})),t}return t=r,n=[{key:"select",value:function(e){this.fire("select",e)}},{key:"handleDisplayMessage",value:function(e){this.messageBoard&&(this.messageBoard.innerHTML=e)}}],n&&y(t.prototype,n),i&&y(t,i),Object.defineProperty(t,"prototype",{writable:!1}),r}(p);window.Widget=S})();
//# sourceMappingURL=Widget.js.map