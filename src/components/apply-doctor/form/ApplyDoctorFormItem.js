import { Col, Input } from 'antd';
import { Form } from 'antd';

const { Item } = Form;

const ApplyDoctorFormItem = ({
  placeholder,
  name,
  rules,
  inputPlaceholder,
  type,
  required = true,
}) => {
  return (
    <Col span={8} lg={8} xs={24} sm={24}>
      <Item required={required} label={placeholder} name={name} rules={rules}>
        <Input placeholder={inputPlaceholder} type={type} />
      </Item>
    </Col>
  );
};

export default ApplyDoctorFormItem;
