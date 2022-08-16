import { Button, Col, DatePicker, Row } from 'antd';
import CommonLayout from 'components/shared/CommonLayout';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TimePicker } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import { bookAppointmentHandler, checkAvailabilityHandler } from 'api/doctor';
import toast from 'react-hot-toast';

const DoctorBookAppointment = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState();

  const navigate = useNavigate();
  const {
    state: { doctor },
  } = useLocation();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.auth);

  console.log(time);
  console.log(date);

  const checkAvailability = async () => {
    if (
      date === undefined ||
      time === undefined ||
      date === 'Invalid date' ||
      time === 'Invalid date'
    ) {
      toast.error('Please select date and time');
      return;
    }
    dispatch(showLoading());

    const values = {
      doctor,
      date,
      time,
    };

    console.log(values);

    const { err, data } = await checkAvailabilityHandler(values, auth?.token);

    if (err) {
      dispatch(hideLoading());
      toast.error(err?.error);
      return;
    }

    dispatch(hideLoading());
    setIsAvailable(true);
    toast.success(data?.message);
  };

  console.log(isAvailable);

  const handleBookNow = async () => {
    if (
      date === undefined ||
      time === undefined ||
      date === 'Invalid date' ||
      time === 'Invalid date'
    ) {
      toast.error('Please select date and time');
      return;
    }
    dispatch(showLoading());

    const values = {
      doctor,
      user: {
        _id: auth?._id,
        name: auth?.name,
        email: auth?.email,
      },
      date,
      time,
    };

    console.log(values);

    const { err, data } = await bookAppointmentHandler(values, auth?.token);

    if (err) {
      console.log(err);
      dispatch(hideLoading());
      toast.error(err?.error);
      return;
    }

    dispatch(hideLoading());
    toast.success('Appointment booked successfully');
    navigate('/');
  };

  return (
    <CommonLayout>
      <h1 className="page-title">
        {doctor.first_name} {doctor.last_name}
      </h1>
      <hr />

      <Row>
        <Col span={8} sm={24} xs={24} lg={8}>
          <h1 className="normal-text">
            <b>Timings</b>: {doctor.timings[0]} - {doctor.timings[1]}
          </h1>

          <div className="d-flex flex-column mt-2">
            <DatePicker
              format="DD-MM-YYYY"
              onChange={(value) => {
                setIsAvailable(false);
                setDate(moment(value).format('DD-MM-YYYY'));
              }}
            />
            <TimePicker
              format={'HH:mm'}
              className="mt-3"
              onChange={(value) => {
                setIsAvailable(false);
                setTime(moment(value).format('HH:mm'));
              }}
            />
            <Button
              className="primary-btn mt-3 full-width-button"
              onClick={checkAvailability}
            >
              Check Availability
            </Button>
            <Button
              disabled={!isAvailable}
              className="primary-btn mt-3 full-width-button"
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </div>
        </Col>
      </Row>
    </CommonLayout>
  );
};

export default DoctorBookAppointment;
