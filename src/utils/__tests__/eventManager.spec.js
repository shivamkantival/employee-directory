import eventManager from '../eventManager';

const mockCallback1 = jest.fn(),
	mockCallback2 = jest.fn(),
	mockCallback3 = jest.fn(),
	EVENT1 = 'EVENT1',
	EVENT2 = 'EVENT2',
	PARAM1 = {},
	PARAM2 = [],
	PARAM3 = 'sjdjf',
	PARAM4 = 345;

describe('EventManager', () => {
	beforeEach(() => {
		mockCallback1.mockClear();
		mockCallback2.mockClear();
		mockCallback3.mockClear();
		eventManager.clear();
	});

	test('if no listener method is provided while registering to an event, it has no effect', () => {
		eventManager.on(EVENT1);

		expect(eventManager.getListeners(EVENT1).length).toBeFalsy();
	});

	test('all callbacks on a event must fire when that event is emitted', () => {
		eventManager.on(EVENT1, mockCallback1);
		eventManager.on(EVENT1, mockCallback2);
		eventManager.on(EVENT2, mockCallback3);

    //all listeners for only the emitted event should be fired
		eventManager.emit(EVENT1, PARAM1);
		expect(mockCallback1).toHaveBeenCalledTimes(1);
		expect(mockCallback2).toHaveBeenCalledTimes(1);
		expect(mockCallback3).toHaveBeenCalledTimes(0);

		expect(mockCallback1).toHaveBeenLastCalledWith(PARAM1);
		expect(mockCallback2).toHaveBeenLastCalledWith(PARAM1);
	});

	test('a callback must not be fired if it has already been removed from an event', () => {
		eventManager.on(EVENT1, mockCallback1);
		eventManager.on(EVENT1, mockCallback2);

    //once mockCallback1 is removed from EVENT1, is must not be fired when EVENT1 is emitted
		eventManager.off(EVENT1, mockCallback1);
		eventManager.emit(EVENT1, PARAM1);
		expect(mockCallback1).toHaveBeenCalledTimes(0);
		expect(mockCallback2).toHaveBeenCalledTimes(1);
		expect(mockCallback2).toHaveBeenLastCalledWith(PARAM1);

		//removing a listener that is never registered has no effect
		eventManager.off(EVENT1, mockCallback1);
		eventManager.emit(EVENT1, PARAM1);
		expect(mockCallback1).toHaveBeenCalledTimes(0);
		expect(mockCallback2).toHaveBeenCalledTimes(2);
		expect(mockCallback2).toHaveBeenLastCalledWith(PARAM1);
	});

	test('trying to remove a listener for some event that does not have that event registered has no effect', () => {
		eventManager.on(EVENT1, mockCallback1);
		eventManager.off(EVENT2, mockCallback1);

		//mockcallback1 is still fired when EVENT1 is emitted
		eventManager.emit(EVENT1, PARAM1);
		expect(mockCallback1).toHaveBeenCalledTimes(1);
		expect(mockCallback1).toHaveBeenLastCalledWith(PARAM1);
	});

	test('all listeners on all eventTypes must be removed if clear is called on eventManager', () => {
		eventManager.on(EVENT1, mockCallback1);
		eventManager.on(EVENT2, mockCallback2);

		eventManager.emit(EVENT1, PARAM1);
		eventManager.emit(EVENT2, PARAM2);

    //to ensure event are being properly emitted
		expect(mockCallback1).toHaveBeenCalledTimes(1);
		expect(mockCallback2).toHaveBeenCalledTimes(1);
		expect(mockCallback1).toHaveBeenLastCalledWith(PARAM1);
		expect(mockCallback2).toHaveBeenLastCalledWith(PARAM2);

    //if eventManager.clear is called, all listeners must be removed
		eventManager.clear();
		eventManager.emit(EVENT1, PARAM3);
		eventManager.emit(EVENT2, PARAM4);
    //listeners are not called twice
		expect(mockCallback1).toHaveBeenCalledTimes(1); // not called 2nd time
		expect(mockCallback1).toHaveBeenLastCalledWith(PARAM1); // last call was with PARAM1 only not with PARAM3
		expect(mockCallback1).not.toHaveBeenLastCalledWith(PARAM3);
    //similarly for listener on EVENT2
		expect(mockCallback2).toHaveBeenCalledTimes(1);
		expect(mockCallback2).toHaveBeenLastCalledWith(PARAM2);
		expect(mockCallback2).not.toHaveBeenLastCalledWith(PARAM4);
	});
});
