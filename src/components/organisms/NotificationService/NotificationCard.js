import React, {PureComponent} from 'react';
//styles
import s from './NotificationService.mod.scss';

//components
import Alert from 'components/atoms/Alert';

//utils
import PausableTimer from 'utils/pausableTimer';

//constants
import NOTIFICATION_TYPES from 'constants/notificationTypes';

const DEFAULT_TIMEOUT = 3000,
  NOTIF_TYPE_TO_ALERT_COLOR = new Map([
    [NOTIFICATION_TYPES.SUCCESS, 'info'],
    [NOTIFICATION_TYPES.ERROR, 'danger'],
    [NOTIFICATION_TYPES.DEFAULT, 'primary'],
  ]);

class NotificationCard extends PureComponent {
  
  componentDidMount() {
    this.timer = new PausableTimer(this.closeNotification, DEFAULT_TIMEOUT);
  }

  closeNotification = () => {
    const {onRemove, notification} = this.props;

    onRemove && onRemove(notification.id);
  };

  forceClose = () => {
    const that = this;
    that.timer.cancel();
    that.closeNotification();
  };
  
  pauseTimer = () => {
    this.timer.pause();
  };
  
  resumeTimer = () => {
    this.timer.resume();
  };
  
  render() {
    const {type = NOTIFICATION_TYPES.DEFAULT, message} = this.props.notification;
    return (<div
      className={s.notificationCardContainer}
      onClick={this.forceClose}
      onMouseEnter={this.pauseTimer}
      onMouseLeave={this.resumeTimer}
    >
      <Alert type={NOTIF_TYPE_TO_ALERT_COLOR.get(type)} message={message} >
        {message}
      </Alert>
    </div>)
  }
}

export default NotificationCard;
