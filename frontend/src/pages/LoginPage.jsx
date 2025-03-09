import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Eye, EyeOff, Loader2, Mail, MessageSquare, RectangleEllipsis } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthImagePattern } from "../Components/AuthImagePattern";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = formData.email.trim();
    const password = formData.password.trim();

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
      login(formData);
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
            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
            <p className="text-base-content/60">
              Sign in to your account
            </p>
          </div>
        </div>
        {/*Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            {isLoggingIn ? (
              <>
                <Loader2 className=" size-5 animate-spin" />
                loading...
              </>
            ) : (
              "Login"
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
      title="Welcome back!"
      subTitle="Sign in to your conversation and catch up with your messages"
      />

  </div>
  )
}

export default LoginPage