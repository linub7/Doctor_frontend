import {
  removeAllNotificationHandler,
  seenNotificationHandler,
} from 'api/doctor';
import NotificationTabs from 'components/notifications/tabs/NotificationTabs';
import CommonLayout from 'components/shared/CommonLayout';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import { setAuth } from 'redux/reducers/authSlice';

const Notifications = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state?.auth);
  const { loading } = useSelector((state) => state?.alerts);

  const handleSeenNotification = async () => {
    dispatch(showLoading());
    const { err, data } = await seenNotificationHandler(auth?.token);

    if (err) {
      console.log(err);
      toast.error(err?.error);
      dispatch(hideLoading());
      return;
    }
    const { message, seenNotifications } = data;
    toast.success(message);
    dispatch(hideLoading());
    dispatch(setAuth({ ...auth, seenNotifications, unseenNotifications: [] }));
    const cookieAuth = JSON.parse(Cookies.get('auth'));
    cookieAuth.seenNotifications = seenNotifications;
    cookieAuth.unseenNotifications = [];
    Cookies.set('auth', JSON.stringify(cookieAuth));
  };

  const handleRemoveNotifications = async () => {
    dispatch(showLoading());

    const { err, data } = await removeAllNotificationHandler(auth?.token);

    if (err) {
      console.log(err);
      toast.error(err?.error);
      dispatch(hideLoading());
      return;
    }

    toast.success(data?.message);
    dispatch(hideLoading());
    dispatch(
      setAuth({ ...auth, unseenNotifications: [], seenNotifications: [] })
    );
    const cookieAuth = JSON.parse(Cookies.get('auth'));
    cookieAuth.seenNotifications = [];
    cookieAuth.unseenNotifications = [];
    Cookies.set('auth', JSON.stringify(cookieAuth));
  };

  return (
    <CommonLayout>
      <h1>NotificationsPage</h1>
      <NotificationTabs
        seenNotifications={auth?.seenNotifications}
        unseenNotifications={auth?.unseenNotifications}
        handleSeenNotification={handleSeenNotification}
        handleRemoveNotifications={handleRemoveNotifications}
        loading={loading}
      />
    </CommonLayout>
  );
};

export default Notifications;
