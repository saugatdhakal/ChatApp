import { useAuthStore } from "../../store/useAuthStore"
const ProfilePage = () => {
  const {authUser, isUpdatingProfile, updateProfile} = useAuthStore();

  const handleImageUpload = async ()=>{

  }
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-case-300">
          <p>asdasdas</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;