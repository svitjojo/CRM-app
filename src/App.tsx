import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AuthRoute } from './components/AuthRoute';
import { SignUpPage } from './pages/SignUpPage';
import { EditingUser } from './pages/EditingUserPage';
import { MessagePage } from './pages/MessagePage';
import { CalendarPage } from './pages/CalendarPage';
import { TripsPage } from './pages/TripsPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <HomePage />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<SignUpPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/editing" element={<EditingUser />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/trips" element={<TripsPage />} />
      </Routes>
    </>
  );
};
