import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AuthRoute } from './components/AuthRoute';
import { SignUpPage } from './pages/SignUpPage';
import { SideBar } from './components/SideBar';

export const App: React.FC = () => {
  return (
    <SideBar>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <HomePage />
            </AuthRoute>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<SignUpPage />} />
      </Routes>
    </SideBar>
  );
}
