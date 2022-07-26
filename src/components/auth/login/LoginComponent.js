import AuthLayout from 'components/shared/auth-layout/AuthLayout';
import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Item } = Form;

const LoginComponent = ({ onFinish, loading }) => {
  return (
    <AuthLayout title={'Welcome Back'}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
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
            block
            loading={loading}
          >
            Login
          </Button>
          <hr />
          have'nt a account? then <Link to="/auth/register">Register</Link>
        </Item>
      </Form>
    </AuthLayout>
  );
};

export default LoginComponent;
