(()=>{"use strict";var e={r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}};
/*!********************************************!*\
  !*** ./src/ClientComponent.js + 3 modules ***!
  \********************************************/
e.r({});class t{constructor(e){this.eventSource=e,this.events=new Set}registerEvent(e,t){"function"==typeof t&&(this.events[e]||(this.events[e]=new Set),this.events[e].add(t))}unregisterEvent(e,t){this.events[e]&&this.events[e].delete(t)}fireEvent(e,t){this.events[e]&&this.events[e].forEach(function(n,i){n(t,{eventSource:this.eventSource,eventName:e,data:t})}.bind(this))}}window.MessengerWelcome_260b9b39071b9918=function(e=null){e?n.___.recipients.add(e):window.opener&&"function"==typeof window.opener.MessengerWelcome_260b9b39071b9918&&window.opener.MessengerWelcome_260b9b39071b9918(window)};class n{static ___={recipients:new Set};constructor(e){e="string"==typeof e?{channel:e}:e||{},this.id=("MSG_"+[1e16]).replace(/[018]/g,(e=>(e^16*Math.random()>>e/4).toString(16))),this.channels=new Set,this.recipients=new Set,e.channel&&this.subscribe(e.channel),window.opener&&n.___.recipients.add(window.opener),this.events=new t(this),window.addEventListener("message",this.__handleMessage.bind(this)),window.MessengerWelcome_260b9b39071b9918()}subscribe(e){e&&"string"==typeof e&&(console.info(`Messenger ${this.id} connected to ${e}`),this.channels.add(e))}unsubscribe(e){this.channels.delete(e)}onMessage(e,t=null){t=(t="string"==typeof t?[t]:t)&&t.length?t:[],this.events.registerEvent("message",function(e,t,n,i){(0===t.length||t.includes(n.channel))&&e(n.message,n.channel)}.bind(this,e,t))}__handleMessage(e){let t={};try{t="string"==typeof e.data?JSON.parse(e.data):e.data||{}}catch{}"messenger"===t.format&&(this.send(t.message,t.channel,e.source,!0),this.channels.has(t.channel)&&this.events.fireEvent("message",t))}send(e,t=null,n=null,i=!1){if(t&&!this.channels.has(t)){if(!i)throw`Messenger.send not subscribed to ${t}`}else{var s=t?new Set([t]):this.channels;s.size>0&&s.forEach(function(e,t,n,i){null!==t&&t!==i||this.__sendToWindows(JSON.stringify({format:"messenger",version:1,emiter:this.id,channel:i,message:e}),n)}.bind(this,e,t,n))}}__sendToWindows(e,t){n.___.recipients.forEach(function(t,n){n&&"function"==typeof n.postMessage&&(t===n||n.closed||n.postMessage(e,"*"))}.bind(this,t))}}function i(e){return function(e){if(Array.isArray(e))return s(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var _,l,r,a=function(){function e(i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),(i=i||{}).widget=i.widget||{},this.___={id:([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^16*Math.random()>>e/4).toString(16)})),widget:{url:i.widget.url||i.widgetUrl||null,resizable:i.widget.resizable||i.widgetResizable||!0,scrollbars:i.widget.scrollbars||i.widgetScrollbars||!0,dependent:i.widget.dependent||i.widgetDependent||!0,width:i.widget.width||i.widgetWidth||600,height:i.widget.height||i.widgetHeight||400,top:i.widget.top||i.widgetTop||null,left:i.widget.left||i.widgetLeft||null,window:null},defaults:void 0,keepDefaults:!1,closeDetectionInterval:null},this.___.events=new t(this),this.___.messenger=new n({channel:this.___.id}),this.___.messenger.onMessage(this.___handleMessage.bind(this)),e.___.instances.add(this),this.___on("widget.ready",this.___postDefaults.bind(this)),window.addEventListener("beforeunload",this.close.bind(this),!0)}var s,_,l;return s=e,_=[{key:"___getId",value:function(){return this.___.id}},{key:"getId",value:function(){return this.___getId()}},{key:"___on",value:function(e,t){this.___.events.registerEvent(e,t)}},{key:"on",value:function(e,t){this.___on(e,t)}},{key:"___off",value:function(e,t){this.___.events.unregisterEvent(e,t)}},{key:"off",value:function(e,t){this.___off(e,t)}},{key:"___fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;null!==n&&"broadcast"!==n||this.___.messenger.send({eventName:e,data:t}),null!==n&&"local"!==n||this.___.events.fireEvent(e,t)}},{key:"fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.___fire(e,t,n)}},{key:"___open",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.close(),e.openLimitApply(!0),(t=t||{}).url=t.url||this.___.widget.url,t.resizable=t.resizable||this.___.widget.resizable,t.scrollbars=t.scrollbars||this.___.widget.scrollbars,t.dependent=t.dependent||this.___.widget.dependent,t.width=t.width||this.___.widget.width,t.height=t.height||this.___.widget.height,t.top=t.top||this.___.widget.top,t.left=t.left||this.___.widget.left,t.top=t.top||(screen.height-t.height)/2,t.left=t.left||(screen.width-t.width)/2;var i=[];i.push("resizable=".concat(t.resizable?"yes":"no")),i.push("scrollbars=".concat(t.scrollbars?"yes":"no")),i.push("dependent=".concat(t.dependent?"yes":"no")),t.width&&i.push("width=".concat(t.width)),t.height&&i.push("height=".concat(t.height)),t.top&&i.push("top=".concat(t.top)),t.left&&i.push("left=".concat(t.left));var s=t.url;if(!s)throw"widget url parameter missing";void 0!==n&&(this.___.defaults=n),this.___.widget.window=window.open(s,this.___.id,i.join(",")),e.___.opened.add(this),this.___fire("widget.open",null,"local"),this.___startDetectionLoop()}},{key:"open",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.___open(e,t)}},{key:"___close",value:function(){this.___stopDetectionLoop(),e.___.opened.delete(this),this.___.widget.window&&!this.___.widget.window.closed&&(this.___.widget.window.close(),this.___.widget.window=null,this.___.keepDefaults||(this.___.defaults=void 0),this.___fire("widget.close",null,"local"))}},{key:"close",value:function(){this.___close()}},{key:"___handleMessage",value:function(e){e.eventName&&this.___fire(e.eventName,e.data,"local")}},{key:"___postDefaults",value:function(){this.___.defaults&&this.___.messenger.send({eventName:"client.postDefaults",data:this.___.defaults})}},{key:"postDefaults",value:function(){this.___postDefaults()}},{key:"___setDefaults",value:function(e){this.___.defaults=e,this.___postDefaults()}},{key:"setDefaults",value:function(e){this.___setDefaults(e)}},{key:"___keepDefaults",value:function(e){this.___.keepDefaults=e}},{key:"keepDefaults",value:function(e){this.___keepDefaults(e)}},{key:"___stopDetectionLoop",value:function(){clearInterval(this.___.closeDetectionInterval),this.___.closeDetectionInterval=null}},{key:"___startDetectionLoop",value:function(){this.___.widget.window.closed?(this.___close(),this.___fire("widget.close",null,"local")):this.___.closeDetectionInterval||(this.___.closeDetectionInterval=setInterval(this.___startDetectionLoop.bind(this),10))}}],l=[{key:"setOpenLimit",value:function(t){e.___.openLimit=t,e.openLimitApply()}},{key:"openLimitApply",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e.___.openLimit>0){var n=e.___.openLimit,i=e.___.opened.size+(t?1:0);if(i>n){var s=Array.from(e.___.opened)[0];s&&(s.close(),e.openLimitApply(t))}}}},{key:"invokeAll",value:function(t,n){"function"==typeof t?e.___.instances.forEach((function(e){t(e)})):"string"==typeof t&&e.___.instances.forEach((function(e){return"function"==typeof(null==e?void 0:e[t])?null==e?void 0:e[t].apply(e,i(n)):null}))}}],_&&o(s.prototype,_),l&&o(s,l),Object.defineProperty(s,"prototype",{writable:!1}),e}();_=a,l="___",r={opened:new Set,openLimit:null,instances:new Set},l in _?Object.defineProperty(_,l,{value:r,enumerable:!0,configurable:!0,writable:!0}):_[l]=r,window.ClientComponent=a})();
//# sourceMappingURL=ClientComponent.js.map