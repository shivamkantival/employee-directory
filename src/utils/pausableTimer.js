
function Timer(callback, delay) {
	let timerId,
		start,
		remaining = delay,
		isCancelled = false;

	this.pause = function() {
		window.clearTimeout(timerId);
		remaining -= new Date() - start;
	};

	this.resume = function() {
		if (isCancelled) {
			return;
		}

		start = new Date();
		timerId = window.setTimeout(callback, remaining);
	};

	this.cancel = function() {
		isCancelled = true;
		window.clearTimeout(timerId);
	};

	this.resume();
}

export default Timer;
