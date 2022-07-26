import { signupUser } from 'api/auth';
import RegisterComponent from 'components/auth/register/RegisterComponent';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';

const Register = () => {
  const { loading } = useSelector((state) => state.alerts);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    dispatch(showLoading());

    const { err, data } = await signupUser(values);

    if (err) {
      console.log(err);
      dispatch(hideLoading());
      return toast.error(err?.error);
    }

    dispatch(hideLoading());
    toast.success('Register Successful');
    const { success, ...rest } = data;
    Cookies.set('auth', JSON.stringify(rest));
    navigate('/');
  };
  return (
    <>
      <RegisterComponent onFinish={onFinish} loading={loading} />
    </>
  );
};

export default Register;
