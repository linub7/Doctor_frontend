import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 c-pointer"
      onClick={() =>
        navigate(`/appointment/book/${doctor._id}`, { state: { doctor } })
      }
    >
      <h4 className="card-title-2">
        {doctor.first_name} {doctor.last_name}
      </h4>
      <hr />
      <p className="card-text">
        {' '}
        <b>Specialization: </b> {doctor.specialization}
      </p>
      <p className="card-text">
        {' '}
        <b>Experience: </b> {doctor.experience}
      </p>
      <p className="card-text">
        {' '}
        <b>Phone Number: </b> {doctor.phoneNumber}
      </p>
      <p className="card-text">
        {' '}
        <b>Email: </b> {doctor.email}
      </p>
      <p className="card-text">
        {' '}
        <b>Address: </b> {doctor.address}
      </p>
      <p className="card-text">
        {' '}
        <b>Fee Per Consultation: </b> {doctor.feePerConsultation}
      </p>
      <p className="card-text">
        {' '}
        <b>Timings: </b> {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
};

export default DoctorCard;
