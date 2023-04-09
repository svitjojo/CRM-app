import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AuthRoute } from './components/AuthRoute';
import { SignUpPage } from './pages/SignUpPage';
import { SideBar } from './components/SideBar';
import { EditingUser } from './pages/EditingUser';
import { MessagePage } from './pages/MessagePage';
import { CalendarPage } from './pages/CalendarPage';
import { AccountPage } from './pages/AccountPage';
import { TripsPage } from './pages/TripsPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/Header';

export const App: React.FC = () => {
  return (
    <SideBar>
      <ToastContainer />
      <Header />
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
        <Route path="/account" element={<AccountPage />} />
        <Route path="/trips" element={<TripsPage />} />
      </Routes>
    </SideBar>
  );
};
