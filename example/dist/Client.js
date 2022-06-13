(()=>{"use strict";var e={d:(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};
/*!***********************************!*\
  !*** ./src/Client.js + 5 modules ***!
  \***********************************/
e.r(t),e.d(t,{Client:()=>y});class n{constructor(e){this.eventSource=e,this.events=new Set}registerEvent(e,t){"function"==typeof t&&(this.events[e]||(this.events[e]=new Set),this.events[e].add(t))}unregisterEvent(e,t){this.events[e]&&this.events[e].delete(t)}fireEvent(e,t){this.events[e]&&this.events[e].forEach(function(n,i){n(t,{eventSource:this.eventSource,eventName:e,data:t})}.bind(this))}}window.MessengerWelcome_260b9b39071b9918=function(e=null){e?i.___.recipients.add(e):window.opener&&"function"==typeof window.opener.MessengerWelcome_260b9b39071b9918&&window.opener.MessengerWelcome_260b9b39071b9918(window)};class i{static ___={recipients:new Set};constructor(e){e="string"==typeof e?{channel:e}:e||{},this.id=("MSG_"+[1e16]).replace(/[018]/g,(e=>(e^16*Math.random()>>e/4).toString(16))),this.channels=new Set,this.recipients=new Set,e.channel&&this.subscribe(e.channel),window.opener&&i.___.recipients.add(window.opener),this.events=new n(this),window.addEventListener("message",this.__handleMessage.bind(this)),window.MessengerWelcome_260b9b39071b9918()}subscribe(e){e&&"string"==typeof e&&(console.info(`Messenger ${this.id} connected to ${e}`),this.channels.add(e))}unsubscribe(e){this.channels.delete(e)}onMessage(e,t=null){t=(t="string"==typeof t?[t]:t)&&t.length?t:[],this.events.registerEvent("message",function(e,t,n,i){(0===t.length||t.includes(n.channel))&&e(n.message,n.channel)}.bind(this,e,t))}__handleMessage(e){let t={};try{t="string"==typeof e.data?JSON.parse(e.data):e.data||{}}catch{}"messenger"===t.format&&(this.send(t.message,t.channel,e.source,!0),this.channels.has(t.channel)&&this.events.fireEvent("message",t))}send(e,t=null,n=null,i=!1){if(t&&!this.channels.has(t)){if(!i)throw`Messenger.send not subscribed to ${t}`}else{var s=t?new Set([t]):this.channels;s.size>0&&s.forEach(function(e,t,n,i){null!==t&&t!==i||this.__sendToWindows(JSON.stringify({format:"messenger",version:1,emiter:this.id,channel:i,message:e}),n)}.bind(this,e,t,n))}}__sendToWindows(e,t){i.___.recipients.forEach(function(t,n){n&&"function"==typeof n.postMessage&&(t===n||n.closed||n.postMessage(e,"*"))}.bind(this,t))}}function s(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var l,_,a,u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),(t=t||{}).widget=t.widget||{},this.___={id:([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^16*Math.random()>>e/4).toString(16)})),widget:{url:t.widget.url||t.widgetUrl||null,resizable:t.widget.resizable||t.widgetResizable||!0,scrollbars:t.widget.scrollbars||t.widgetScrollbars||!0,dependent:t.widget.dependent||t.widgetDependent||!0,width:t.widget.width||t.widgetWidth||600,height:t.widget.height||t.widgetHeight||400,top:t.widget.top||t.widgetTop||null,left:t.widget.left||t.widgetLeft||null,window:null},defaults:void 0,keepDefaults:!1,closeDetectionInterval:null},this.___.events=new n(this),this.___.messenger=new i({channel:this.___.id}),this.___.messenger.onMessage(this.___handleMessage.bind(this)),e.___.instances.add(this),this.___on("widget.ready",this.___postDefaults.bind(this)),window.addEventListener("beforeunload",this.close.bind(this),!0)}var t,o,l;return t=e,o=[{key:"___getId",value:function(){return this.___.id}},{key:"getId",value:function(){return this.___getId()}},{key:"___on",value:function(e,t){this.___.events.registerEvent(e,t)}},{key:"on",value:function(e,t){this.___on(e,t)}},{key:"___off",value:function(e,t){this.___.events.unregisterEvent(e,t)}},{key:"off",value:function(e,t){this.___off(e,t)}},{key:"___fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;null!==n&&"broadcast"!==n||this.___.messenger.send({eventName:e,data:t}),null!==n&&"local"!==n||this.___.events.fireEvent(e,t)}},{key:"fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.___fire(e,t,n)}},{key:"___open",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.close(),e.openLimitApply(!0),(t=t||{}).url=t.url||this.___.widget.url,t.resizable=t.resizable||this.___.widget.resizable,t.scrollbars=t.scrollbars||this.___.widget.scrollbars,t.dependent=t.dependent||this.___.widget.dependent,t.width=t.width||this.___.widget.width,t.height=t.height||this.___.widget.height,t.top=t.top||this.___.widget.top,t.left=t.left||this.___.widget.left,t.top=t.top||(screen.height-t.height)/2,t.left=t.left||(screen.width-t.width)/2;var i=[];i.push("resizable=".concat(t.resizable?"yes":"no")),i.push("scrollbars=".concat(t.scrollbars?"yes":"no")),i.push("dependent=".concat(t.dependent?"yes":"no")),t.width&&i.push("width=".concat(t.width)),t.height&&i.push("height=".concat(t.height)),t.top&&i.push("top=".concat(t.top)),t.left&&i.push("left=".concat(t.left));var s=t.url;if(!s)throw"widget url parameter missing";void 0!==n&&(this.___.defaults=n),this.___.widget.window=window.open(s,this.___.id,i.join(",")),e.___.opened.add(this),this.___fire("widget.open",null,"local"),this.___startDetectionLoop()}},{key:"open",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.___open(e,t)}},{key:"___close",value:function(){this.___stopDetectionLoop(),e.___.opened.delete(this),this.___.widget.window&&!this.___.widget.window.closed&&(this.___.widget.window.close(),this.___.widget.window=null,this.___.keepDefaults||(this.___.defaults=void 0),this.___fire("widget.close",null,"local"))}},{key:"close",value:function(){this.___close()}},{key:"___handleMessage",value:function(e){e.eventName&&this.___fire(e.eventName,e.data,"local")}},{key:"___postDefaults",value:function(){this.___.defaults&&this.___.messenger.send({eventName:"client.postDefaults",data:this.___.defaults})}},{key:"postDefaults",value:function(){this.___postDefaults()}},{key:"___setDefaults",value:function(e){this.___.defaults=e,this.___postDefaults()}},{key:"setDefaults",value:function(e){this.___setDefaults(e)}},{key:"___keepDefaults",value:function(e){this.___.keepDefaults=e}},{key:"keepDefaults",value:function(e){this.___keepDefaults(e)}},{key:"___stopDetectionLoop",value:function(){clearInterval(this.___.closeDetectionInterval),this.___.closeDetectionInterval=null}},{key:"___startDetectionLoop",value:function(){this.___.widget.window.closed?(this.___close(),this.___fire("widget.close",null,"local")):this.___.closeDetectionInterval||(this.___.closeDetectionInterval=setInterval(this.___startDetectionLoop.bind(this),10))}}],l=[{key:"setOpenLimit",value:function(t){e.___.openLimit=t,e.openLimitApply()}},{key:"openLimitApply",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e.___.openLimit>0){var n=e.___.openLimit,i=e.___.opened.size+(t?1:0);if(i>n){var s=Array.from(e.___.opened)[0];s&&(s.close(),e.openLimitApply(t))}}}},{key:"invokeAll",value:function(t,n){"function"==typeof t?e.___.instances.forEach((function(e){t(e)})):"string"==typeof t&&e.___.instances.forEach((function(e){return"function"==typeof(null==e?void 0:e[t])?null==e?void 0:e[t].apply(e,s(n)):null}))}}],o&&r(t.prototype,o),l&&r(t,l),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function d(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function h(e,t){return h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},h(e,t)}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=g(e);if(t){var s=g(this).constructor;n=Reflect.construct(i,arguments,s)}else n=i.apply(this,arguments);return v(this,n)}}function v(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function g(e){return g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},g(e)}l=u,_="___",a={opened:new Set,openLimit:null,instances:new Set},_ in l?Object.defineProperty(l,_,{value:a,enumerable:!0,configurable:!0,writable:!0}):l[_]=a,function(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}(function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t=t||{},this.___={id:t.id||window.name,defaults:void 0,defaultsVersion:0},console.log(this.___.id),this.___.events=new n(this),this.___.messenger=new i({channel:this.___.id}),this.___.messenger.onMessage(this.___handleMessage.bind(this)),setTimeout(function(){this.___fire("widget.ready",null,"broadcast")}.bind(this),0),this.___on("client.postDefaults",this.___handleDefaults.bind(this))}var t,s,o;return t=e,s=[{key:"___getId",value:function(){return this.___.id}},{key:"getId",value:function(){return this.___getId()}},{key:"___on",value:function(e,t){this.___.events.registerEvent(e,t)}},{key:"on",value:function(e,t){this.___on(e,t)}},{key:"___off",value:function(e,t){this.___.events.unregisterEvent(e,t)}},{key:"off",value:function(e,t){this.___off(e,t)}},{key:"___fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;null!==n&&"broadcast"!==n||this.___.messenger.send({eventName:e,data:t}),null!==n&&"local"!==n||this.___.events.fireEvent(e,t)}},{key:"fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.___fire(e,t,n)}},{key:"___handleMessage",value:function(e){e.eventName&&this.___fire(e.eventName,e.data,"local")}},{key:"___handleDefaults",value:function(e){this.___.defaults=e,this.___.defaultsVersion++,1===this.___.defaultsVersion?this.___fire("widget.defaults.init",this.___.defaults,"local"):this.___fire("widget.defaults.update",this.___.defaults,"local")}},{key:"___getDefaults",value:function(){return this.___.defaults}},{key:"getDefaults",value:function(){return this.___getDefaults()}},{key:"___isDefaultsAvailable",value:function(){return this.___.defaultsVersion>0}},{key:"isDefaultsAvailable",value:function(){return this.___isDefaultsAvailable()}}],s&&c(t.prototype,s),o&&c(t,o),Object.defineProperty(t,"prototype",{writable:!1}),e}(),"___",{});var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&h(e,t)}(o,e);var t,n,i,s=p(o);function o(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),(e=e||{}).widgetUrl=e.widgetUrl||"./widget.html?custom-url=set-in-the-custom-client-class",(t=s.call(this,e)).on("TEST-EVENT",(function(){return console.log("TEST-EVENT received in the client")})),t}return t=o,(n=[{key:"displayMessage",value:function(e){this.fire("display-message",e)}}])&&d(t.prototype,n),i&&d(t,i),Object.defineProperty(t,"prototype",{writable:!1}),o}(u);window.Client=y})();
//# sourceMappingURL=Client.js.map