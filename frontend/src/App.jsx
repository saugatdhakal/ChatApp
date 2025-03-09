import Navbar from "./Components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from '../store/useAuthStore.js';
import { useEffect } from "react";
import { Loader } from 'lucide-react';
import {Toaster} from "react-hot-toast";

function App() {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth();
    // fetch user data and set to authUser state
  },[authUser])
 
  return (
    <div>
      {isCheckingAuth && (
        <div className="fixed inset-0 flex items-center justify-center gap-1 bg-black/50 backdrop-blur-sm z-50">
          <Loader className="animate-spin w-8 h-8 text-blue-500" /> Loading ...
        </div>
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage/>:  <Navigate to="/" />} />
        <Route path="/login" element={!authUser ?<LoginPage/> :  <Navigate to="/" />} />
        <Route path="/setting" element={<SettingPage/>} />
        <Route path="/profile" element={authUser ?<ProfilePage/>: <Navigate to="/login" />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
