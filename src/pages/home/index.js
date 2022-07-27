import CommonLayout from 'components/shared/CommonLayout';
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
    <CommonLayout>
      <h1>Home Page</h1>
    </CommonLayout>
  );
};

export default Home;
