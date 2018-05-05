

const eventManager = (function () {
	const events = new Map();
	return {
		on (eventType, callBack) {
			if (callBack) {
				events.has(eventType) || events.set(eventType, []);
				events.get(eventType).push(callBack);
			}
		},

		off (eventType, callBack) {
			const eventList = events.get(eventType) || [],
				callBackIndex = eventList.find(eventCallBack => eventCallBack === callBack);

			if (callBackIndex) {
				eventList.splice(callBackIndex, 1);
			}
		},

		emit (eventType, ...callBackParams) {
			const eventList = events.get(eventType) || [];

			eventList.forEach(eventCallBack => {
				eventCallBack(...callBackParams);
			});
		},

		clear () {
			events.clear();
		},
	};
})();

export default eventManager;
