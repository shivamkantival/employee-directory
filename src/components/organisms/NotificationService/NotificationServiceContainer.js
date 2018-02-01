import React, {PureComponent} from 'react';

//utils
import _uniqueId from 'lodash/uniqueId';
import eventManager from 'utils/eventManager';

//constants
import {SHOW_NOTIF} from 'constants/eventTypes';

//components
import NotificationService from './NotificationService';

class NotificationServiceContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
        }
    }

    componentDidMount() {
        eventManager.on(SHOW_NOTIF, this.addNotification);
    }

    componentWillUnmount() {
        eventManager.off(SHOW_NOTIF, this.addNotification);
    }

    addNotification = (notificationData = {}) => {
        const notifications = this.state.notifications;
        this.setState({
            notifications: [...notifications, {...notificationData, id: _uniqueId()}],
        })
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
        />)
    }
}

export default NotificationServiceContainer;
