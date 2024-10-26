import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import { Notification } from "../../utility/types";
import './notificationFeed.css';

type Props = {
    notifications: Notification[]
}

const NotificationFeed = (props: Props) => {

    const { notifications } = props;

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
        <div
            className={`notification-card ${notifications[index]?.type}-bg`}
            style={{ ...style, marginBottom: index === notifications.length - 1 ? 0 : '10px' }}
        >
            <p className='notification-message'>
                {notifications[index]?.content?.text}
            </p>
            <div className="notification-timestamp">
                {notifications[index]?.timestamp}
            </div>
        </div>
    );

    return (
        <div id='notification-feed' className='parent-right'>
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        height={height}
                        width={width}
                        itemSize={80} // 70px card + 10px gap
                        itemCount={notifications.length}
                    >
                        {Row}
                    </List>
                )}
            </AutoSizer>
        </div>
    );
}

export default NotificationFeed;
