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
import Notifications from 'pages/notifications';
import { useEffect, useState } from 'react';
import DoctorProfile from 'pages/doctor/profile';

function App() {
  const [forceRenderPage, setForceRenderPage] = useState(false);
  const { loading } = useSelector((state) => state.alerts);

  useEffect(() => {}, [forceRenderPage]);

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
          <Route
            path="/appointment"
            element={<Appointment setForceRenderPage={setForceRenderPage} />}
          />
          <Route
            path="/profile"
            element={<Profile setForceRenderPage={setForceRenderPage} />}
          />
          <Route
            path="/doctor/profile"
            element={<DoctorProfile setForceRenderPage={setForceRenderPage} />}
          />
          <Route
            path="/apply-doctor"
            element={<ApplyDoctor setForceRenderPage={setForceRenderPage} />}
          />
          <Route
            path="/notifications"
            element={<Notifications setForceRenderPage={setForceRenderPage} />}
          />
        </Route>
        <Route element={<OnlyAdminRoutes />}>
          <Route
            path="/admin/doctors"
            element={<AdminDoctors setForceRenderPage={setForceRenderPage} />}
          />
          <Route
            path="/admin/users"
            element={<AdminUsers setForceRenderPage={setForceRenderPage} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
