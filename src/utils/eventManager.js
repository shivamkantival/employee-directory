

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
				callBackIndex = eventList.findIndex(eventCallBack => eventCallBack === callBack);

			if (callBackIndex !== -1) {
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

		getListeners (eventType) {
			return events.get(eventType) || [];
		},
	};
})();

export default eventManager;
