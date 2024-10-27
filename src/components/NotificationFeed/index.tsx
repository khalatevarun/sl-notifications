import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import { Notification } from '../../utility/types';
import { formatTimestamp } from '../../utility/helper';

import './notificationFeed.css';

type Props = {
  notifications: Notification[];
};

const NotificationFeed = (props: Props) => {
  const { notifications } = props;

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div style={style}>
      <div className={`notification-card ${notifications[index]?.type}-bg`}>
        <p className="notification-message">
          {notifications[index]?.content?.text}
        </p>
        <div className="notification-timestamp">
          {formatTimestamp(notifications[index]?.timestamp)}
        </div>
      </div>
    </div>
  );

  return (
    <div id="notification-feed" className="parent-right">
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            itemSize={80} // 70px for height + 10px for the gap
            itemCount={notifications.length}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default NotificationFeed;
