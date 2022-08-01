import { getAllApprovedDoctorsHandler } from 'api/doctor';
import CommonLayout from 'components/shared/CommonLayout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';

const Home = () => {
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(approvedDoctors);

  useEffect(() => {
    getApprovedDoctors();

    return () => {
      setApprovedDoctors([]);
    };
  }, [auth?.token]);

  const getApprovedDoctors = async () => {
    dispatch(showLoading());

    const { err, data } = await getAllApprovedDoctorsHandler(auth?.token);

    if (err) {
      console.log(err);
      dispatch(hideLoading());
      return;
    }

    dispatch(hideLoading());
    setApprovedDoctors(data?.doctors);
  };

  return (
    <CommonLayout>
      <h1>Home Page</h1>
    </CommonLayout>
  );
};

export default Home;
