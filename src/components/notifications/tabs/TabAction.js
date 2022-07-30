const TabAction = ({ onClick, action }) => {
  return (
    <div className="d-flex justify-content-end">
      <span className="route-link" onClick={onClick}>
        {action}
      </span>
    </div>
  );
};

export default TabAction;
