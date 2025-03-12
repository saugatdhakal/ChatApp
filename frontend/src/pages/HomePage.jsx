import { useAuthStore } from "../../store/useAuthStore";


const HomePage = () => {
  const { authUser } = useAuthStore();
  return (
    <div className="pt-20 text-white">
      {authUser.fullName}
      <p>sfds</p>
    </div>
  );
};

export default HomePage;
