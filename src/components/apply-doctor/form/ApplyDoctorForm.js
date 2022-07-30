import { Button, Form, Row } from 'antd';
import ApplyDoctorFormItem from './ApplyDoctorFormItem';
import ApplyDoctorFormTimePicker from './ApplyDoctorFormTimePicker';

const ApplyDoctorForm = ({ onFinish, loading }) => {
  return (
    <Form layout="vertical" onFinish={onFinish}>
      <h1 className="card-title" style={{ marginBottom: '10px' }}>
        Personal Information
      </h1>
      <Row gutter={20}>
        <ApplyDoctorFormItem
          placeholder={'First Name'}
          inputPlaceholder={'Enter First Name Please'}
          name="first_name"
          rules={[{ required: true, message: 'Please input your first name!' }]}
          type="text"
        />
        <ApplyDoctorFormItem
          placeholder={'Last Name'}
          inputPlaceholder={'Enter Last Name Please'}
          name="last_name"
          rules={[{ required: true, message: 'Please input your last name!' }]}
          type="text"
        />
        <ApplyDoctorFormItem
          placeholder={'Email'}
          inputPlaceholder={'Enter Email Please'}
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          type="email"
        />
        <ApplyDoctorFormItem
          placeholder={'Phone Number'}
          inputPlaceholder={'Enter Phone Number Please'}
          name="phoneNumber"
          rules={[
            { required: true, message: 'Please input your phone number!' },
          ]}
          type="text"
        />
        <ApplyDoctorFormItem
          placeholder={'Website'}
          inputPlaceholder={'Enter Website Please'}
          required={false}
          name="website"
          rules={[{ required: true, message: 'Please input your website!' }]}
          type="text"
        />
        <ApplyDoctorFormItem
          placeholder={'Address'}
          inputPlaceholder={'Enter Address Please'}
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
          type="text"
        />
      </Row>
      <hr />
      <h1 className="card-title" style={{ marginBottom: '10px' }}>
        Personal Information
      </h1>
      <Row gutter={20}>
        <ApplyDoctorFormItem
          placeholder={'Specialization'}
          inputPlaceholder={'Enter Specialization Please'}
          name="specialization"
          rules={[
            { required: true, message: 'Please input your specialization!' },
          ]}
          type="text"
        />
        <ApplyDoctorFormItem
          placeholder={'Experience'}
          inputPlaceholder={'Enter Experience Please'}
          name="experience"
          rules={[
            { required: true, message: 'Please input your experience!' },
            {
              pattern: /^[0-9]*$/,
              message: 'Please input your experience in number!',
            },
            {
              min: 0,
              message: 'Please input your Fee Per Consultation in number!',
            },
          ]}
          type="number"
        />
        <ApplyDoctorFormItem
          placeholder={'Fee Per Consultation'}
          inputPlaceholder={'Enter Fee Per Consultation Please'}
          name="feePerConsultation"
          rules={[
            {
              required: true,
              message: 'Please input your Fee Per Consultation!',
            },
            {
              pattern: /^[0-9]*$/,
              message: 'Please input your Fee Per Consultation in number!',
            },
            {
              min: 0,
              message: 'Please input your Fee Per Consultation in number!',
            },
          ]}
          type="number"
        />
        <ApplyDoctorFormTimePicker
          placeholder={'Timings'}
          name="timings"
          rules={[{ required: true, message: 'Please input your timings!' }]}
        />
      </Row>
      <div className="d-flex justify-content-end">
        <Button
          loading={loading}
          htmlType="submit"
          type="primary"
          className="primary-btn"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default ApplyDoctorForm;
