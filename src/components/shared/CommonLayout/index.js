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
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CustomBadge from './Badge';

const CommonLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // hooks
  const onlyWidth = useWindowWidth();

  // resize method with hooks
  useEffect(() => {
    onlyWidth < 800 ? setCollapsed(true) : setCollapsed(false);
  }, [onlyWidth < 800]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
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
                length={auth?.unseenNotifications?.length}
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
