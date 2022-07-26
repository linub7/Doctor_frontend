import { Button } from 'antd';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/reducers/authSlice';

const Home = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove('auth');
    dispatch(logout());
    window.location.href = '/auth/login';
  };

  return (
    <Button onClick={handleLogout} type="primary">
      Temp. Logout
    </Button>
  );
};

export default Home;
