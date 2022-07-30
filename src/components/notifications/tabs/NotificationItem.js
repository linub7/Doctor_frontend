import { useNavigate } from 'react-router-dom';

const NotificationItem = ({ el }) => {
  const navigate = useNavigate();
  return (
    <div className="card p-2 c-pointer" onClick={() => navigate(el?.path)}>
      <div className="card-text">{el.message}</div>
    </div>
  );
};

export default NotificationItem;
