import './index.css';

const CommonLayout = ({ children }) => {
  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className="sidebar">sidebar</div>
        <div className="content">
          <div className="header">header</div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
