import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/setting" element={<SettingPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />

      </Routes>
    </div>
  );
}

export default App;
