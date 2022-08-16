import { Table, Tag, Tooltip } from 'antd';
import {
  getDoctorAllAppointmentsHandler,
  updateDoctorAppointmentStatusHandler,
} from 'api/doctor';
import CommonLayout from 'components/shared/CommonLayout';
import moment from 'moment';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RiCheckboxCircleLine, RiCloseCircleLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetDoctorAppointments();

    return () => {
      setAppointments([]);
    };
  }, []);

  const handleGetDoctorAppointments = async () => {
    dispatch(showLoading());

    const { err, data } = await getDoctorAllAppointmentsHandler(auth?.token);

    if (err) {
      console.log(err);
      toast.error(err?.error);
      dispatch(hideLoading());
      return;
    }

    dispatch(hideLoading());
    setAppointments(data?.appointments);
  };

  const handleUpdateUserAppointmentStatus = async (id, status) => {
    dispatch(showLoading());

    const { err, data } = await updateDoctorAppointmentStatusHandler(
      status,
      id,
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
    handleGetDoctorAppointments();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, { user }) => <span>{user?.name}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, { user }) => <span>{user?.email}</span>,
    },
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, { date, time }) => (
        <span>
          {moment(date).format('DD-MM-YYYY')} {moment(time).format('HH:mm')}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        let color;
        if (status === 'confirmed') {
          color = '#2ecc71';
        } else if (status === 'cancelled') {
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
          {status !== 'confirmed' && (
            <Tooltip title="confirmed doctor" color={'#2ecc71'}>
              <RiCheckboxCircleLine
                size={25}
                color="#2ecc71"
                className="c-pointer"
                onClick={() =>
                  handleUpdateUserAppointmentStatus(_id, 'confirmed')
                }
              />
            </Tooltip>
          )}
          {status !== 'cancelled' && (
            <Tooltip title="cancel doctor" color={'#e74c3c'}>
              <RiCloseCircleLine
                size={25}
                color="#e74c3c"
                className="c-pointer"
                onClick={() =>
                  handleUpdateUserAppointmentStatus(_id, 'cancelled')
                }
              />
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  return (
    <CommonLayout>
      <h1>Doctor Appointments</h1>
      <Table
        columns={columns}
        dataSource={appointments}
        key={appointments.map((appointment) => appointment._id)}
        rowKey={(appointment) => appointment._id}
      />
    </CommonLayout>
  );
};

export default DoctorAppointments;
