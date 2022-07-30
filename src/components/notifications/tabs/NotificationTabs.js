import { Tabs } from 'antd';
import NotificationItem from './NotificationItem';
import TabAction from './TabAction';
const { TabPane } = Tabs;

const NotificationTabs = ({
  unseenNotifications,
  handleSeenNotification,
  seenNotifications,
  handleRemoveNotifications,
}) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Unread" key="1">
        {unseenNotifications && unseenNotifications.length > 0 && (
          <TabAction
            action={'Mark all as read'}
            onClick={handleSeenNotification}
          />
        )}
        {unseenNotifications &&
          unseenNotifications.length > 0 &&
          unseenNotifications.map((el, index) => (
            <NotificationItem el={el} key={index} />
          ))}
      </TabPane>
      <TabPane tab="Read" key="2">
        {seenNotifications && seenNotifications.length > 0 && (
          <TabAction
            action={'Remove All'}
            onClick={handleRemoveNotifications}
          />
        )}
        {seenNotifications &&
          seenNotifications.length > 0 &&
          seenNotifications.map((el, index) => (
            <NotificationItem el={el} key={index} />
          ))}
      </TabPane>
    </Tabs>
  );
};

export default NotificationTabs;
