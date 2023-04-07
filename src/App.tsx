import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { AuthRoute } from "./components/AuthRoute";
import { SignUpPage } from "./pages/SignUpPage";

export const App: React.FC = () => {

  return (
    <Routes>
      <Route path="/" element={
        <AuthRoute>
          <HomePage />
        </AuthRoute>
      } />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<SignUpPage />} />
    </Routes>
  );
}
