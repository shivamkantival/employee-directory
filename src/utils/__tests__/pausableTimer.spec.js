import PausableTimer from '../pausableTimer';

jest.useFakeTimers();

describe('pausableTimer', () => {
    const mockCallback = jest.fn();

    beforeEach(() => {
        mockCallback.mockClear();
        setTimeout.mockClear();
    })

    test('should start timer for given delay and fire callback once the timer is completed', () => {
        const timer = new PausableTimer(mockCallback, 5000);

        // to ensure timeout is set with proper values
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(mockCallback, 5000);

        jest.runAllTimers();

        //to ensure callback is fired after timeout
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback.mock.calls[0].length).toBe(0);
    });

    test('timer should be halted once pause timer is called', () => {
        const timer = new PausableTimer(mockCallback, 5000);

        //timer is paused halfway
        timer.pause(); // since this use native date to calculate remaining time, jest.advanceTimersByTime is of no use

        // to ensure even after given time is passed, no callback is fired as timer was paused
        jest.advanceTimersByTime(5000);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledTimes(0);

        //timer is again resumed
        timer.resume();

        //after remaining time timer is fired
        jest.runAllTimers();
        expect(setTimeout).toHaveBeenCalledTimes(2);
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback.mock.calls[0].length).toBe(0);
    });

    test('if timer is cancelled, it cannot be resumed and made to run again', () => {
        const timer = new PausableTimer(mockCallback, 5000);

        //to ensure timer was set properly
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(mockCallback, 5000);

        timer.cancel();

        //once cancelled timer cannot be started again
        timer.resume();
        jest.runAllTimers();
        expect(setTimeout).toHaveBeenCalledTimes(1); // no setTimeout to resume callback
        expect(mockCallback).toHaveBeenCalledTimes(0);
    });
})