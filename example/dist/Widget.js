(()=>{"use strict";var e={d:(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function n(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}
/*!***********************************!*\
  !*** ./src/Widget.js + 5 modules ***!
  \***********************************/
e.r(t),e.d(t,{default:()=>m});var i=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.eventSource=t,this.events=new Set}var t,i,r;return t=e,(i=[{key:"registerEvent",value:function(e,t){"function"==typeof t&&(this.events[e]||(this.events[e]=new Set),this.events[e].add(t))}},{key:"unregisterEvent",value:function(e,t){this.events[e]&&this.events[e].delete(t)}},{key:"fireEvent",value:function(e,t){this.events[e]&&this.events[e].forEach(function(n,i){n(t,{eventSource:this.eventSource,eventName:e,data:t})}.bind(this))}}])&&n(t.prototype,i),r&&n(t,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var o,s,a,_=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t=t||{},this.recipient=t.recipient||null,this.id=t.id||([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^16*Math.random()>>e/4).toString(16)})),this.events=new i(this),window.addEventListener("message",this.__handleMessage.bind(this))}var t,n,o;return t=e,(n=[{key:"setRecipient",value:function(e){this.recipient=e}},{key:"getId",value:function(){return this.id}},{key:"on",value:function(e,t){this.events.registerEvent(e,t)}},{key:"off",value:function(e,t){this.events.unregisterEvent(e,t)}},{key:"__handleMessage",value:function(e){var t="string"==typeof e.data?JSON.parse(e.data):e.data||{};"messenger"===t.format&&t.id===this.id&&this.events.fireEvent("message",t.message)}},{key:"send",value:function(e){this.recipient&&"function"==typeof this.recipient.postMessage&&this.recipient.postMessage(JSON.stringify({format:"messenger",version:1,id:this.id,message:e}),"*")}}])&&r(t.prototype,n),o&&r(t,o),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function c(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function f(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}o=function(){function e(t){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t=t||{},this.___={id:([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^16*Math.random()>>e/4).toString(16)})),widgetUrl:t.widgetUrl||null,widgetWindow:null,closeDetectionInterval:null},this.___.events=new i(this),this.___.messenger=new _({id:this.___.id}),this.___.messenger.on("message",this.___handleMessage.bind(this)),!this.___.widgetUrl)throw"widgetUrl parameter is mandatory";if(this.___.widgetUrl.match(/#/))throw"widgetUrl parameter can not contain any hash (".concat(this.___.widgetUrl,")");e.___.instances.add(this)}var t,n,r;return t=e,n=[{key:"___getId",value:function(){return this.___.id}},{key:"getId",value:function(){return this.___getId()}},{key:"___on",value:function(e,t){this.___.events.registerEvent(e,t)}},{key:"on",value:function(e,t){this.___on(e,t)}},{key:"___off",value:function(e,t){this.___.events.unregisterEvent(e,t)}},{key:"off",value:function(e,t){this.___off(e,t)}},{key:"___fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;null!==n&&"widget"!==n||this.___.messenger.send({eventName:e,data:t}),null!==n&&"client"!==n||this.___.events.fireEvent(e,t)}},{key:"fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.___fire(e,t,n)}},{key:"___open",value:function(){this.close(),e.___.opened&&e.___.opened.id!==this.___.id&&e.___.opened.___close(),e.___.opened=this,this.___.widgetWindow=window.open("".concat(this.___.widgetUrl,"#id=").concat(this.___.id),this.___.id,"resizable,scrollbars,width=640,height=480,top=200,left=200, dependent, modal"),this.___.messenger.setRecipient(this.___.widgetWindow),this.___fire("widget.open",null,"client"),this.___startDetectionLoop()}},{key:"open",value:function(){this.___open()}},{key:"___close",value:function(){this.___.messenger.setRecipient(null),this.___stopDetectionLoop(),this.___.widgetWindow&&!this.___.widgetWindow.closed&&(this.___.widgetWindow.close(),this.___.widgetWindow=null,this.___fire("widget.close",null,"client"))}},{key:"close",value:function(){this.___close()}},{key:"___handleMessage",value:function(e){e.eventName&&this.___fire(e.eventName,e.data,"client")}},{key:"___stopDetectionLoop",value:function(){clearInterval(this.___.closeDetectionInterval),this.___.closeDetectionInterval=null}},{key:"___startDetectionLoop",value:function(){this.___.widgetWindow.closed?(this.___stopDetectionLoop(),this.___fire("widget.close",null,"client")):this.___.closeDetectionInterval||(this.___.closeDetectionInterval=setInterval(this.___startDetectionLoop.bind(this),10))}}],r=[{key:"invokeAll",value:function(t,n){"function"==typeof t?e.___.instances.forEach((function(e){t(e)})):"string"==typeof t&&e.___.instances.forEach((function(e){return"function"==typeof(null==e?void 0:e[t])?null==e?void 0:e[t].apply(e,l(n)):null}))}}],n&&c(t.prototype,n),r&&c(t,r),Object.defineProperty(t,"prototype",{writable:!1}),e}(),s="___",a={opened:null,instances:new Set},s in o?Object.defineProperty(o,s,{value:a,enumerable:!0,configurable:!0,writable:!0}):o[s]=a;var d=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t=t||{},this.___={id:t.id||this.___extractIdFromBRowserHash(),parentWindow:t.parentWindow||window.opener},this.___.events=new i(this),this.___.messenger=new _({id:this.___.id,recipient:this.___.parentWindow}),this.___.messenger.on("message",this.___handleMessage.bind(this)),setTimeout(function(){this.___fire("widget.ready",null,"client")}.bind(this),0)}var t,n,r;return t=e,n=[{key:"___getId",value:function(){return this.___.id}},{key:"getId",value:function(){return this.___getId()}},{key:"___on",value:function(e,t){this.___.events.registerEvent(e,t)}},{key:"on",value:function(e,t){this.___on(e,t)}},{key:"___off",value:function(e,t){this.___.events.unregisterEvent(e,t)}},{key:"off",value:function(e,t){this.___off(e,t)}},{key:"___fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;null!==n&&"client"!==n||this.___.messenger.send({eventName:e,data:t}),null!==n&&"widget"!==n||this.___.events.fireEvent(e,t)}},{key:"fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.___fire(e,t,n)}},{key:"___extractIdFromBRowserHash",value:function(){var e=document.location.hash.match(/#id=([a-z0-9-]+)/);if(e)return e[1];throw"Unable to retrieve the widget ID from location.hash"}},{key:"___handleMessage",value:function(e){e.eventName&&this.___fire(e.eventName,e.data,"widget")}}],n&&f(t.prototype,n),r&&f(t,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function h(e){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h(e)}function v(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function y(e,t){return y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},y(e,t)}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=b(e);if(t){var r=b(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return g(this,n)}}function g(e,t){if(t&&("object"===h(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return w(e)}function w(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e){return b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},b(e)}!function(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}(d,"___",{});var m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&y(e,t)}(o,e);var t,n,i,r=p(o);function o(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),(t=r.call(this,e)).messageBoard="string"==typeof e.messageBoard?document.querySelector(e.messageBoard):e.messageBoard||null,t.on("display-message",t.handleDisplayMessage.bind(w(t))),t.on("TEST-EVENT",(function(){return console.log("TEST-EVENT received in the widget")})),t}return t=o,n=[{key:"select",value:function(e){this.fire("select",e)}},{key:"handleDisplayMessage",value:function(e){this.messageBoard&&(this.messageBoard.innerHTML=e)}}],n&&v(t.prototype,n),i&&v(t,i),Object.defineProperty(t,"prototype",{writable:!1}),o}(d);window.Widget=m})();
//# sourceMappingURL=Widget.js.map