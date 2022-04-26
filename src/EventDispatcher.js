export default class EventDispatcher {
	constructor(eventSource) {
		this.eventSource = eventSource;
		this.events = new Set();
	}

	// registration methods
	registerEvent(eventName, callback) {
		if(typeof callback === "function")
		{
			if(!this.events[eventName])
				this.events[eventName] = new Set();

			this.events[eventName].add(callback)
		}
	}
	unregisterEvent(eventName, callback) {
		if(this.events[eventName])
			this.events[eventName].delete(callback)
	}

	// trigger event
	fireEvent(eventName, data) {
		if(this.events[eventName])
		{
			this.events[eventName].forEach(function(callback, index) {
				callback(data,{
					eventSource:this.eventSource,
					eventName:eventName,
					data:data
				});
			}.bind(this))
		}
	}
}