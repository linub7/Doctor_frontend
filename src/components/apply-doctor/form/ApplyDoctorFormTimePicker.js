import { Col, Form, TimePicker } from 'antd';
const { Item } = Form;
const { RangePicker } = TimePicker;

const ApplyDoctorFormTimePicker = ({ placeholder, name, rules }) => {
  return (
    <Col span={8} lg={8} xs={24} sm={24}>
      <Item required label={placeholder} name={name} rules={rules}>
        <RangePicker />
      </Item>
    </Col>
  );
};

export default ApplyDoctorFormTimePicker;
