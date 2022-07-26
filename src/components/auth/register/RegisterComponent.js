import AuthLayout from 'components/shared/auth-layout/AuthLayout';
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Item } = Form;

const RegisterComponent = ({ onFinish, loading }) => {
  return (
    <AuthLayout title={'Nice to meet You'}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
            {
              min: 3,
              message: 'Name must be at least 3 characters long',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Item>
        <Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Item>
        <Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
            {
              min: 6,
              message: 'Password must be at least 6 characters',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Item>

        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
            block
          >
            Register
          </Button>
          <hr />
          Already have an account? <Link to="/auth/login">Login</Link>
        </Item>
      </Form>
    </AuthLayout>
  );
};

export default RegisterComponent;
