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

function App() {
  const { loading } = useSelector((state) => state.alerts);
  const { auth } = useSelector((state) => state.auth);
  console.log(auth);
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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
