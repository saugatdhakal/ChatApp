import Navbar from "./Components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from '../store/useAuthStore.js';
import { useEffect } from "react";
import { LoaderCircle } from 'lucide-react';


function App() {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth();
    // fetch user data and set to authUser state
  },[authUser])
 
  return (
    <div>
      {isCheckingAuth && !isCheckingAuth && (
        <div className="">
          <LoaderCircle className="animate-spin" />
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
    </div>
  );
}

export default App;
