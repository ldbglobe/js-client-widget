(()=>{"use strict";var e={r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}};function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}
/*!********************************************!*\
  !*** ./src/WidgetComponent.js + 3 modules ***!
  \********************************************/
e.r({});var n=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.eventSource=t,this.events=new Set}var n,i,r;return n=e,(i=[{key:"registerEvent",value:function(e,t){"function"==typeof t&&(this.events[e]||(this.events[e]=new Set),this.events[e].add(t))}},{key:"unregisterEvent",value:function(e,t){this.events[e]&&this.events[e].delete(t)}},{key:"fireEvent",value:function(e,t){this.events[e]&&this.events[e].forEach(function(n,i){n(t,{eventSource:this.eventSource,eventName:e,data:t})}.bind(this))}}])&&t(n.prototype,i),r&&t(n,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t=t||{},this.recipient=t.recipient||null,this.id=t.id||([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^16*Math.random()>>e/4).toString(16)})),this.events=new n(this),window.addEventListener("message",this.__handleMessage.bind(this))}var t,r,a;return t=e,(r=[{key:"setRecipient",value:function(e){this.recipient=e}},{key:"getId",value:function(){return this.id}},{key:"on",value:function(e,t){this.events.registerEvent(e,t)}},{key:"off",value:function(e,t){this.events.unregisterEvent(e,t)}},{key:"__handleMessage",value:function(e){var t="string"==typeof e.data?JSON.parse(e.data):e.data||{};"messenger"===t.format&&t.id===this.id&&this.events.fireEvent("message",t.message)}},{key:"send",value:function(e){this.recipient&&"function"==typeof this.recipient.postMessage&&this.recipient.postMessage(JSON.stringify({format:"messenger",version:1,id:this.id,message:e}),"*")}}])&&i(t.prototype,r),a&&i(t,a),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var s,o,u,f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t=t||{},this.___={id:t.id||this.___extractIdFromBRowserHash(),parentWindow:t.parentWindow||window.opener},this.___.events=new n(this),this.___.messenger=new r({id:this.___.id,recipient:this.___.parentWindow}),this.___.messenger.on("message",this.___handleMessage.bind(this)),setTimeout(function(){this.___fire("widget.ready",null,"client")}.bind(this),0)}var t,i,s;return t=e,i=[{key:"___getId",value:function(){return this.___.id}},{key:"getId",value:function(){return this.___getId()}},{key:"___on",value:function(e,t){this.___.events.registerEvent(e,t)}},{key:"on",value:function(e,t){this.___on(e,t)}},{key:"___off",value:function(e,t){this.___.events.unregisterEvent(e,t)}},{key:"off",value:function(e,t){this.___off(e,t)}},{key:"___fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;null!==n&&"client"!==n||this.___.messenger.send({eventName:e,data:t}),null!==n&&"widget"!==n||this.___.events.fireEvent(e,t)}},{key:"fire",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.___fire(e,t,n)}},{key:"___extractIdFromBRowserHash",value:function(){var e=document.location.hash.match(/#id=([a-z0-9-]+)/);if(e)return e[1];throw"Unable to retrieve the widget ID from location.hash"}},{key:"___handleMessage",value:function(e){e.eventName&&this.___fire(e.eventName,e.data,"widget")}}],i&&a(t.prototype,i),s&&a(t,s),Object.defineProperty(t,"prototype",{writable:!1}),e}();u={},(o="___")in(s=f)?Object.defineProperty(s,o,{value:u,enumerable:!0,configurable:!0,writable:!0}):s[o]=u,window.WidgetComponent=f})();
//# sourceMappingURL=WidgetComponent.js.map