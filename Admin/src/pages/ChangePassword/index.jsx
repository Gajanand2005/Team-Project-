import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser, FaRegEye, FaEyeSlash } from "react-icons/fa";
import loginbg from "../../assets/Login.jpg";
import logo from "../../assets/logo.png";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useContext } from "react";
import { MyContext } from "../../App.jsx";
import { postData } from "../../../Utils/Api.js";

const ChangePassword = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordShow2, setIsPasswordShow2] = useState(false);
  const [isPasswordShow3, setIsPasswordShow3] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    email: localStorage.getItem("userEmail"),
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const valideValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.oldPassword === "") {
      context.alertBox("error", "Please enter old password");
      setIsLoading(false);
      return false;
    }

    if (formFields.newPassword === "") {
      context.alertBox("error", "Please enter new password");
      setIsLoading(false);
      return false;
    }

    if (formFields.confirmPassword === "") {
      context.alertBox("error", "Please enter confirm password");
      setIsLoading(false);
      return false;
    }

    if (formFields.confirmPassword !== formFields.newPassword) {
      context.alertBox("error", "New password and confirm password do not match");
      setIsLoading(false);
      return false;
    }

    postData(`/api/user/reset-password`, formFields).then((res) => {
      setIsLoading(false);
      if (res?.error === false) {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");
        context.alertBox("success", res?.message);
        history("/login");
      } else {
        context.alertBox("error", res?.message);
      }
    });
  };

  return (
    <section className="w-full min-h-screen bg-gray-50 flex items-start md:items-center justify-center py-12 px-4">
      <div className="w-full max-w-xl mx-auto">
        <header className="w-full mb-6 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="logo-image" className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover" />
          </Link>
          <div className="flex items-center gap-3">
            <NavLink to="/login" className="hidden sm:inline">
              <button className="rounded-full text-[rgba(0,0,0,0.8)] bg-gray-200 px-3 py-2 flex gap-2 items-center hover:bg-gray-300 text-sm">
                <CgLogIn className="text-lg" /> <span>Login</span>
              </button>
            </NavLink>
            <NavLink to="/signup" className="hidden sm:inline">
              <button className="rounded-full text-[rgba(0,0,0,0.8)] px-3 py-2 flex gap-2 items-center hover:bg-gray-100 text-sm">
                <FaRegUser className="text-base" /> <span>Sign Up</span>
              </button>
            </NavLink>
          </div>
        </header>

        <main className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="text-center">
            <img src={logo} className="mx-auto h-20 w-32 md:h-28 md:w-36 object-cover rounded-full" />
            <h1 className="mt-4 text-2xl md:text-3xl font-bold text-gray-800">Change your password</h1>
            <p className="mt-2 text-sm text-gray-600">Secure your account by choosing a strong, unique password.</p>
          </div>

          <form className="w-full mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Old Password</label>
              <div className="relative">
                <input
                  type={isPasswordShow3 ? "text" : "password"}
                  className="w-full h-12 md:h-14 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 px-4 text-base"
                  name="oldPassword"
                  onChange={onchangeInput}
                  value={formFields.oldPassword}
                  disabled={isLoading}
                />
                <button type="button" onClick={() => setIsPasswordShow3(!isPasswordShow3)} className="absolute right-2 top-2 md:top-3 p-2 text-gray-600 rounded-md hover:bg-gray-100">
                  {isPasswordShow3 ? <FaEyeSlash className="text-lg" /> : <FaRegEye className="text-lg" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={isPasswordShow ? "text" : "password"}
                  className="w-full h-12 md:h-14 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 px-4 text-base"
                  name="newPassword"
                  onChange={onchangeInput}
                  value={formFields.newPassword}
                  disabled={isLoading}
                />
                <button type="button" onClick={() => setIsPasswordShow(!isPasswordShow)} className="absolute right-2 top-2 md:top-3 p-2 text-gray-600 rounded-md hover:bg-gray-100">
                  {isPasswordShow ? <FaEyeSlash className="text-lg" /> : <FaRegEye className="text-lg" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={isPasswordShow2 ? "text" : "password"}
                  className="w-full h-12 md:h-14 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 px-4 text-base"
                  name="confirmPassword"
                  onChange={onchangeInput}
                  value={formFields.confirmPassword}
                  disabled={isLoading}
                />
                <button type="button" onClick={() => setIsPasswordShow2(!isPasswordShow2)} className="absolute right-2 top-2 md:top-3 p-2 text-gray-600 rounded-md hover:bg-gray-100">
                  {isPasswordShow2 ? <FaEyeSlash className="text-lg" /> : <FaRegEye className="text-lg" />}
                </button>
              </div>
            </div>

            <div>
              <Button variant="contained" className="w-full py-3 text-base md:text-lg" type="submit" disabled={!valideValue || isLoading}>
                {isLoading ? <CircularProgress color="inherit" size={22} /> : "Change Password"}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </section>
  );
};

export default ChangePassword;


