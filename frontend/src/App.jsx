import Navbar from "./Components/Navbar";
import { useAuthStore } from "../store/useAuthStore.js";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AuthRoutes from "./Routes/Routes.jsx";

function App() {
  const { authUser, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
    // fetch user data and set to authUser state
  }, [authUser]);

  return (
    <div>
      <Navbar />
      <AuthRoutes/>
      <Toaster />
    </div>
  );
}

export default App;
