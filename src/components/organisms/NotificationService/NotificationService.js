import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//components
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NotificatioCard from './NotificationCard';

//styles
import s from './NotificationService.mod.scss';

function AnimatedNotification({children, ...props}) {
  return(<CSSTransition
    {...props}
    timeout={450}
    classNames={s.animation}
  >
    {children}
  </CSSTransition>)
}

class NotificationService extends PureComponent {
  
  renderNotification = notification => {
    return (<AnimatedNotification key={notification.id} >
      <NotificatioCard notification={notification} onRemove={this.props.onRemove} />
    </AnimatedNotification>)
  }
  
  render() {
    const notifications = this.props.notifications;
    
    return (<div className={s.notificationContainer}>
      <TransitionGroup >
        {notifications.map(this.renderNotification)}
      </TransitionGroup>
    </div>);
  }
}

export default NotificationService;