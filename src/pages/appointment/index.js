import { Table, Tag } from 'antd';
import { getAllUserAppointmentsHandler } from 'api/users';
import CommonLayout from 'components/shared/CommonLayout';
import moment from 'moment';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    handleGetAllUserAppointments();

    return () => {
      setAppointments([]);
    };
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Doctor',
      dataIndex: 'doctor',
      key: 'doctor.name',
      render: (text, { doctor }) => (
        <span>
          {doctor?.first_name} {doctor?.last_name}
        </span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'doctor.phoneNumber',
      render: (text, { doctor }) => <span>{doctor?.phoneNumber}</span>,
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
  ];

  const handleGetAllUserAppointments = async () => {
    dispatch(showLoading());

    const { err, data } = await getAllUserAppointmentsHandler(auth?.token);

    if (err) {
      console.log(err);
      toast.error(err?.error);
      dispatch(hideLoading());
      return;
    }

    dispatch(hideLoading());
    setAppointments(data?.appointments);
  };
  return (
    <CommonLayout>
      <h1>Appointments</h1>
      <Table
        columns={columns}
        dataSource={appointments}
        key={appointments.map((appointment) => appointment._id)}
        rowKey={(appointment) => appointment._id}
      />
    </CommonLayout>
  );
};

export default Appointment;
