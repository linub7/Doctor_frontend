import { Badge } from 'antd';

const CustomBadge = ({ children, length, color }) => {
  return (
    <Badge size="small" color={color} count={length}>
      {children}
    </Badge>
  );
};

export default CustomBadge;
