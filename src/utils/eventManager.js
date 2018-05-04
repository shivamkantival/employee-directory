const eventManager = {
	events: new Map(),

	on (eventType, callBack) {
		this.events.has(eventType) || this.events.set(eventType, []);

		this.events.get(eventType).push(callBack);
	},

	off (eventType, callBack) {
		const eventList = this.events.get(eventType);
		const callBackIndex = eventList.find((eventCallBack) => eventCallBack === callBack);

		if (callBackIndex) {
			eventList.splice(callBackIndex, 1);
		}
	},

	emit (eventType, ...callBackParams) {
		const eventList = this.events.get(eventType) || [];

		eventList.forEach((eventCallBack) => {
			eventCallBack(...callBackParams);
		});
	},
};

export default eventManager;
