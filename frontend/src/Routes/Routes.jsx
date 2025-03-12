import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from '../pages/HomePage';
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import SettingPage from "../pages/SettingPage";
import ProfilePage from "../pages/ProfilePage";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader } from 'lucide-react';

const ProtectedRoute = ({ element }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center gap-1 bg-black/50 backdrop-blur-sm z-50">
        <Loader className="animate-spin w-8 h-8 text-blue-500" /> Loading ...
      </div>
    );
  }

  return authUser ? element : <Navigate to="/login" />;
};

const AuthRoutes = () => {
  const { authUser } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
      <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
      <Route path="/setting" element={<ProtectedRoute element={<SettingPage />} />} />
      <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} /> {/* Handles unknown routes */}
    </Routes>
  );
};

export default AuthRoutes;
