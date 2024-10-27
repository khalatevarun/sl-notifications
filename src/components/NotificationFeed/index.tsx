import { formatTimestamp } from '../../utility/helper';
import { Notification } from '../../utility/types';

import './notificationFeed.css';

type Props = {
  notifications: Notification[];
};

const NotificationFeed = (props: Props) => {
  const { notifications } = props;

  return (
    <div id="notification-feed" className="parent-right">
      {notifications.map((notification: Notification) => (
        <div className={`notification-card ${notification?.type}-bg`}>
          <p className="notification-message">{notification?.content?.text}</p>
          <div className="notification-timestamp">
            {formatTimestamp(notification?.timestamp)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationFeed;
