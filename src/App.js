import Login from 'pages/auth/login';
import './index.css';
import Register from 'pages/auth/register';
import Home from 'pages/home';
import NotFound from 'pages/not-found';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import CustomSpinner from 'components/shared/CustomSpinner';
import NotLoggedInRoutes from 'routes/NotLoggedInRoutes';
import LoggedInRoutes from 'routes/LoggedInRoutes';
import Appointment from 'pages/appointment';
import Profile from 'pages/profile';
import OnlyAdminRoutes from 'routes/OnlyAdminRoutes';
import AdminDoctors from 'pages/admin/doctors';
import AdminUsers from 'pages/admin/users';
import ApplyDoctor from 'pages/apply-doctor';

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      {loading && <CustomSpinner />}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/apply-doctor" element={<ApplyDoctor />} />
        </Route>
        <Route element={<OnlyAdminRoutes />}>
          <Route path="/admin/doctors" element={<AdminDoctors />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
