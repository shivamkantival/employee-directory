import React from 'react';
import NotificationServiceContainer from '../NotificationServiceContainer';

//utils
import {mount} from 'enzyme';
import _uniqueId from 'lodash/uniqueId';

//constants
import {SHOW_NOTIF} from 'constants/eventTypes';
import EventManager from 'utils/eventManager';
import NOTIF_TYPES from 'constants/notificationTypes';

jest.useFakeTimers();

describe('NotificationServiceContainer', () => {

	test('Service should subscribe to eventManager on mount and unsubscribe before unmount to eventManager to prevent any memory leaks', () => {
		const wrapper = mount(<NotificationServiceContainer />);

		expect(EventManager.getListeners(SHOW_NOTIF)).toHaveLength(1);

		//event must be unsubscribed before unmount
		wrapper.unmount();
		expect(EventManager.getListeners(SHOW_NOTIF)).toHaveLength(0);
	});

	test('emiting the subscribed event along with a notification item should create a new notification item in state', () => {
		const wrapper = mount(<NotificationServiceContainer />);

		expect(wrapper.state('notifications')).toHaveLength(0); //initially there is no notification item present

		//addition of notifs
		EventManager.emit(SHOW_NOTIF, {type: NOTIF_TYPES.DEFAULT, message: 'defaultNotif'});
		EventManager.emit(SHOW_NOTIF, {type: NOTIF_TYPES.SUCCESS, message: 'successNotif'});
		EventManager.emit(SHOW_NOTIF, {type: NOTIF_TYPES.ERROR, message: 'failureNotif'});

		expect(wrapper.state('notifications')).toHaveLength(3);
	});

	test('once some notification expires, it is automatically removed from the state notifications', () => {
		const wrapper = mount(<NotificationServiceContainer />);

		//addition of notifs
		EventManager.emit(SHOW_NOTIF, {type: NOTIF_TYPES.DEFAULT, message: 'defaultNotif'});
		EventManager.emit(SHOW_NOTIF, {type: NOTIF_TYPES.SUCCESS, message: 'successNotif'});
		EventManager.emit(SHOW_NOTIF, {type: NOTIF_TYPES.ERROR, message: 'failureNotif'});
		expect(wrapper.state('notifications')).toHaveLength(3);

		jest.runAllTimers();
		expect(wrapper.state('notifications')).toHaveLength(0);
	});

	test('if we try to remove some notification that is not present in notifications state, it should have no effect on state', () => {
		const wrapper = mount(<NotificationServiceContainer />);

		//addition of notifs
		EventManager.emit(SHOW_NOTIF, {type: NOTIF_TYPES.DEFAULT, message: 'defaultNotif'});
		EventManager.emit(SHOW_NOTIF, {type: NOTIF_TYPES.SUCCESS, message: 'successNotif'});
		EventManager.emit(SHOW_NOTIF, {type: NOTIF_TYPES.ERROR, message: 'failureNotif'});
		expect(wrapper.state('notifications')).toHaveLength(3);

		wrapper.instance().onRemove(_uniqueId());

		expect(wrapper.state('notifications')).toHaveLength(3);
	});

	test('if SHOW_NOTIF event is called without passing notification, it should have no effect on component state', () => {
		const wrapper = mount(<NotificationServiceContainer />);

		//addition of notifs
		EventManager.emit(SHOW_NOTIF);

		expect(wrapper.state('notifications')).toHaveLength(0); // as no notification was passed when emitting show_notif event
	});
});
