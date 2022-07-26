import { signinUser } from 'api/auth';
import LoginComponent from 'components/auth/login/LoginComponent';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import { setAuth, setError } from 'redux/reducers/authSlice';

const Login = () => {
  const { loading } = useSelector((state) => state.alerts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    dispatch(showLoading());

    const { err, data } = await signinUser(values);
    if (err) {
      console.log(err);
      dispatch(hideLoading());
      dispatch(setError(err?.error));
      return toast.error(err?.error);
    }
    dispatch(hideLoading());
    toast.success('Login Successful');
    console.log(data);
    dispatch(setError(''));
    const { success, ...rest } = data;
    dispatch(setAuth(rest));
    Cookies.set('auth', JSON.stringify(rest));
    navigate('/');
  };
  return (
    <>
      <LoginComponent onFinish={onFinish} loading={loading} />
    </>
  );
};

export default Login;
