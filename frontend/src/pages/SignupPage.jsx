import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import {
  MessageSquare,
  User,
  Mail,
  RectangleEllipsis,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import {AuthImagePattern} from '../Components/AuthImagePattern';
import toast from "react-hot-toast";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();

    if(!fullName) return toast.error("Full name is required");
    if(!email) return toast.error("Email is required");
    if(!password) return toast.error("password is required");
    if(!emailRegex.test(email)) return toast.test("Invalid email format");
    if(password.length < 6) return toast.error("Password must be at least 6 character");

    return true; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValidated = validateForm();
    if(isFormValidated === true){
      signup(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left sides */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12  rounded-xl bg-primary/10 w- flex items-center justify-between group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary w-full" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get Started With your free account
              </p>
            </div>
          </div>
          {/*Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div className="form-control">
              <label htmlFor="FullName" className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 z-1 left-0 pl-3  flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  id="FullName"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Saugat dhakal"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                  }}
                />
              </div>
            </div>
            {/* Mail Input*/}
            <div className="form-control">
              <label htmlFor="Email" className="label">
                <span className="label-text font-medium">EMAIL</span>
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 z-1 left-0 pl-3  flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  id="Email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Saugatdhakal@gmail.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
              </div>
            </div>
            {/* Password */}
            <div className="form-control">
              <label htmlFor="Password" className="label">
                <span className="label-text font-medium">PASSWORD</span>
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-5 z-1 left-0 pl-3  flex items-center pointer-events-none">
                  <RectangleEllipsis className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="Password"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 pr-2 z-1 right-0"
                >
                  {showPassword ? (
                    <Eye className="size-5 text-base-content/40 cursor-pointer" />
                  ) : (
                    <EyeOff className="size-5 text-base-content/40 cursor-pointer" />
                  )}
                </button>
              </div>
            </div>
            {/* Signup Button */}
            <button type="submit" className="btn btn-primary w-full">
              {isSigningUp ? (
                <>
                  <Loader2 className=" size-5 animate-spin" />
                  loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right Sides */}
   
      <AuthImagePattern
        title="Join Our Community"
        subTitle="Connect with friends, share moments, and stay in touch with your loved ones"
        />

    </div>
  );
};

export default SignupPage;
