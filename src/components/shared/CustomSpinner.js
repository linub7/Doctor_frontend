import { Space, Spin } from 'antd';

const CustomSpinner = () => {
  return (
    <div className="spinner-parent">
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default CustomSpinner;
