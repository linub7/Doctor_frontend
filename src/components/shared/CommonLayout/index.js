import './index.css';
import LeftMenu from '../menu/LeftMenu';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useWindowWidth } from '@react-hook/window-size';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CustomBadge from './Badge';
import { getUserUnseenNotificationsHandler } from 'api/users';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import { setAuth } from 'redux/reducers/authSlice';
import Cookies from 'js-cookie';

const CommonLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [unseenNotificationsCount, setUnseenNotificationsCount] = useState(0);
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // hooks
  const onlyWidth = useWindowWidth();

  // resize method with hooks
  useEffect(() => {
    onlyWidth < 800 ? setCollapsed(true) : setCollapsed(false);
  }, [onlyWidth < 800]);

  useEffect(() => {
    handleGetUnseenNotifications();
  }, [unseenNotificationsCount]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleGetUnseenNotifications = async () => {
    dispatch(showLoading());
    const { err, data } = await getUserUnseenNotificationsHandler(auth?.token);
    if (err) {
      console.log(err);
      dispatch(hideLoading());
      return;
    }
    dispatch(hideLoading());
    setUnseenNotificationsCount(data?.unseenNotifications.length);
    dispatch(
      setAuth({ ...auth, unseenNotifications: data?.unseenNotifications })
    );
    const authCookie = JSON.parse(Cookies.get('auth'));
    authCookie.unseenNotifications = data?.unseenNotifications;
    Cookies.set('auth', JSON.stringify(authCookie));
  };

  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className={collapsed ? 'sidebar-collapsed' : 'sidebar'}>
          {!collapsed && (
            <h1
              style={{ color: '#fff', textAlign: 'center', marginTop: '30px' }}
            >
              Hi Doctor
            </h1>
          )}
          <LeftMenu collapsed={collapsed} role={auth?.role} />
        </div>
        <div className="content">
          <div className="d-flex header">
            {onlyWidth >= 800 ? (
              <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                  marginLeft: '10px',
                  // marginBottom: 16,
                }}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
            ) : (
              <div></div>
            )}
            <div className="d-flex align-items-center justify-content-between header-right">
              <CustomBadge
                length={auth?.unseenNotifications.length}
                color="#f39c12"
              >
                <BellOutlined
                  className="bell-icon"
                  onClick={() => {
                    navigate('/notifications');
                  }}
                />
              </CustomBadge>
              <Link className="route-link" to="/profile">
                {auth?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
