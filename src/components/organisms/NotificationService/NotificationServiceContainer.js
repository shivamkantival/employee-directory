import React, {PureComponent} from 'react';

//utils
import _uniqueId from 'lodash/uniqueId';
import eventManager from 'utils/eventManager';

//constants
import {SHOW_NOTIF} from 'constants/eventTypes';

//components
import NotificationService from './NotificationService';

/**
 * uses custom event manager and provides system wide unified pusher notifications
 * anyone from across the platform can show notification by throwing a simple SHOW_NOTIF event
 */
class NotificationServiceContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			notifications: [],
		};
	}

	componentDidMount() {
		eventManager.on(SHOW_NOTIF, this.addNotification);
	}

	componentWillUnmount() {
		eventManager.off(SHOW_NOTIF, this.addNotification);
	}

	addNotification = notificationData => {
		notificationData && this.setState({
			notifications: [...this.state.notifications, {...notificationData, id: _uniqueId()}],
		});
	}

	onRemove = notificationId => {
		const notifications = this.state.notifications,
			indexOfSelectedNotification = notifications.findIndex(notification => notification.id === notificationId);

		(indexOfSelectedNotification !== -1) && notifications.splice(indexOfSelectedNotification, 1);

		this.setState({
			notifications: [...notifications],
		});
	}

	render() {
		return(<NotificationService
            onRemove={this.onRemove}
            notifications={this.state.notifications}
        />);
	}
}

export default NotificationServiceContainer;
