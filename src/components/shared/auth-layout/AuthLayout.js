import './auth-layout.css';
const AuthLayout = ({ title, children }) => {
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">{title}</h1>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
