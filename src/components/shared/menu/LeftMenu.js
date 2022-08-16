import {
  HomeOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logout } from 'redux/reducers/authSlice';
import { useDispatch } from 'react-redux';

const LeftMenu = ({ collapsed, role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const [current, setCurrent] = useState(pathname.split('/')[1]);

  const isUserOrDoctor = role === 'user' || role === 'doctor';
  const isAdmin = role === 'admin';
  const isDoctor = role === 'doctor';
  const isUser = role === 'user';

  const items = [
    {
      label: 'Home',
      key: 'home',
      icon: <HomeOutlined />,
      onClick: () => {
        navigate('/');
        setCurrent('home');
      },
    },
    isUserOrDoctor && {
      label: 'Appointment',
      key: 'appointment',
      icon: <ProfileOutlined />,
      onClick: () => {
        isDoctor ? navigate('/doctor/appointments') : navigate('/appointment');
        setCurrent('appointment');
      },
    },
    isUser && {
      label: 'Apply Doctor',
      key: 'apply-doctor',
      icon: <MedicineBoxOutlined />,
      onClick: () => {
        navigate('/apply-doctor');
        setCurrent('apply-doctor');
      },
    },
    isAdmin && {
      label: 'Users',
      key: 'users',
      icon: <MedicineBoxOutlined />,
      onClick: () => {
        navigate('/admin/users');
        setCurrent('users');
      },
    },
    isAdmin && {
      label: 'Doctors',
      key: 'doctors',
      icon: <MedicineBoxOutlined />,
      onClick: () => {
        navigate('/admin/doctors');
        setCurrent('doctors');
      },
    },
    isDoctor
      ? {
          label: 'Doctor Profile',
          key: 'profile',
          icon: <UserOutlined />,
          onClick: () => {
            navigate('/doctor/profile');
            setCurrent('profile');
          },
        }
      : {
          label: 'Profile',
          key: 'profile',
          icon: <UserOutlined />,
          onClick: () => {
            navigate('/profile');
            setCurrent('profile');
          },
        },
    {
      label: 'Logout',
      key: 'logout',
      icon: <LogoutOutlined />,
      onClick: () => {
        dispatch(logout());
        Cookies.remove('auth');
        window.location.href = '/auth/login';
      },
    },
  ];

  const handleCurrent = (e) => {
    pathname !== '/' ? setCurrent(e.key) : setCurrent('home');
  };
  return (
    <div
      style={{
        width: 200,
      }}
    >
      <Menu
        onClick={handleCurrent}
        selectedKeys={current}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default LeftMenu;
