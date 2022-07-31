import { getAllDoctorsHandler, updateDoctorStatusHandler } from 'api/doctor';
import CommonLayout from 'components/shared/CommonLayout';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import { RiCloseCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';
import { Table, Tag, Tooltip } from 'antd';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  console.log(doctors);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    handleGetAllDoctors();

    return () => {
      setDoctors([]);
    };
  }, [auth?.token]);

  const handleGetAllDoctors = async () => {
    dispatch(showLoading());

    const { err, data } = await getAllDoctorsHandler(auth?.token);

    if (err) {
      console.log(err);
      toast.error(err?.error);
      dispatch(hideLoading());
      return;
    }
    dispatch(hideLoading());
    setDoctors(data?.doctors);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, { first_name, last_name }) => (
        <span>
          {first_name} {last_name}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },

    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        let color;
        if (status === 'approved') {
          color = '#2ecc71';
        } else if (status === 'rejected') {
          color = '#e74c3c';
        } else {
          color = '#9b59b6';
        }
        // return <span style={{ color }}>{status}</span>;
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, { _id, status }) => (
        <div className="d-flex align-items-center justify-content-between">
          {status !== 'approved' && (
            <Tooltip title="approved doctor" color={'#2ecc71'}>
              <RiCheckboxCircleLine
                size={25}
                color="#2ecc71"
                className="c-pointer"
                onClick={() => handleUpdateDoctorStatus(_id, 'approved')}
              />
            </Tooltip>
          )}
          <Tooltip title="reject doctor" color={'#e74c3c'}>
            <RiCloseCircleLine
              size={25}
              color="#e74c3c"
              className="c-pointer"
              onClick={() => handleUpdateDoctorStatus(_id, 'rejected')}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleUpdateDoctorStatus = async (doctorId, status) => {
    if (status === 'rejected') {
      if (window.confirm('Are you sure you want to reject this doctor?')) {
        dispatch(showLoading());

        const { err, data } = await updateDoctorStatusHandler(
          status,
          doctorId,
          auth?.token
        );

        if (err) {
          console.log(err);
          toast.error(err?.error);
          dispatch(hideLoading());
          return;
        }
        dispatch(hideLoading());
        toast.success(data?.message);
        handleGetAllDoctors();
      }
    } else {
      dispatch(showLoading());

      const { err, data } = await updateDoctorStatusHandler(
        status,
        doctorId,
        auth?.token
      );

      if (err) {
        console.log(err);
        toast.error(err?.error);
        dispatch(hideLoading());
        return;
      }
      dispatch(hideLoading());
      toast.success(data?.message);
      handleGetAllDoctors();
    }
  };

  return (
    <CommonLayout>
      <h1>Admin Doctors</h1>
      <Table
        columns={columns}
        dataSource={doctors}
        key={doctors.map((doctor) => doctor._id)}
        rowKey={(doctor) => doctor._id}
      />
    </CommonLayout>
  );
};

export default AdminDoctors;
