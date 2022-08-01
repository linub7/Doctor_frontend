import {
  getSingleDoctorProfileHandler,
  updateDoctorProfileHandler,
} from 'api/doctor';
import ApplyDoctorForm from 'components/apply-doctor/form/ApplyDoctorForm';
import CommonLayout from 'components/shared/CommonLayout';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import moment from 'moment';

const DoctorProfile = () => {
  const [doctorProfile, setDoctorProfile] = useState(null);
  const { auth } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getDoctorProfile();

    return () => {
      setDoctorProfile(null);
    };
  }, [auth?._id]);

  const getDoctorProfile = async () => {
    dispatch(showLoading());

    const { err, data } = await getSingleDoctorProfileHandler(
      auth?._id,
      auth?.token
    );

    if (err) {
      console.log(err);
      dispatch(hideLoading());
      toast.error(err?.error);
      navigate('/');

      return;
    }
    dispatch(hideLoading());
    setDoctorProfile(data?.doctor);
  };

  const onFinish = async (values) => {
    dispatch(showLoading());

    values.timings = [
      moment(values.timings[0]).format('HH:mm'),
      moment(values.timings[1]).format('HH:mm'),
    ];

    const { err, data } = await updateDoctorProfileHandler(
      values,
      doctorProfile?._id,
      auth?.token
    );

    if (err) {
      console.log(err);
      dispatch(hideLoading());
      toast.error(err?.error);
      return;
    }

    dispatch(hideLoading());
    toast.success('Profile updated successfully');
    navigate('/');
  };

  return (
    <CommonLayout>
      <h1>Doctor Profile Page</h1>
      <hr />

      {doctorProfile && (
        <ApplyDoctorForm
          loading={loading}
          onFinish={onFinish}
          initialValues={doctorProfile}
        />
      )}
    </CommonLayout>
  );
};

export default DoctorProfile;
