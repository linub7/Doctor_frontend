import { Col } from 'antd';
import DoctorCard from './DoctorCard';

const DoctorItem = ({ doctor }) => {
  return (
    <Col span={8} xs={24} lg={8}>
      <DoctorCard doctor={doctor} />
    </Col>
  );
};

export default DoctorItem;
