import { applyDoctorHandler } from 'api/doctor';
import ApplyDoctorForm from 'components/apply-doctor/form/ApplyDoctorForm';
import CommonLayout from 'components/shared/CommonLayout';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import moment from 'moment';

const ApplyDoctor = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.alerts);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    dispatch(showLoading());

    values.timings = [
      moment(values.timings[0]).format('HH:mm'),
      moment(values.timings[1]).format('HH:mm'),
    ];

    const { data, err } = await applyDoctorHandler(values, auth?.token);
    if (err) {
      console.log(err);
      dispatch(hideLoading());
      return toast.error(err?.error);
    }
    console.log(data);
    dispatch(hideLoading());
    toast.success(data?.message);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  return (
    <CommonLayout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />

      <ApplyDoctorForm onFinish={onFinish} loading={loading} />
    </CommonLayout>
  );
};

export default ApplyDoctor;
