// import { Link, NavLink, useNavigate } from "react-router-dom";
// import udrcrafts_logo from "../../assets/udrcrafts_logo.jpg";
// import { CgLogIn } from "react-icons/cg";
// import { FaRegUser } from "react-icons/fa";
// import loginbg from "../../assets/Login.jpg";
// import logo from "../../assets/logo.png";
// import { useContext, useState } from "react";
// import Button from "@mui/material/Button";
// import OtpBox from "../../Components/OtpBox";
// import { MyContext } from "../../App";
// import { postData } from "../../../Utils/Api";
// import CircularProgress from "@mui/material/CircularProgress";


// const VerifyAccount = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [otp, setOtp] = useState("");
//   const handleOtpChange = (value) => {
//     setOtp(value);
//   };

//   const context = useContext(MyContext);
//   const history = useNavigate();

//   const verifyOTP = (e) => {
//     e.preventDefault();

//     if (otp !== "") {
//       setIsLoading(true);
//       const actionType = localStorage.getItem("actionType");

//       if (actionType !== "forgot-password") {
//         postData("/api/user/verifyEmail", {
//           email: localStorage.getItem("userEmail"),
//           otp: otp,
//         }).then((res) => {
//           if (res?.error === false) {
//             context.alertBox("success", res?.message);
//             localStorage.removeItem("userEmail");
//             setIsLoading(false);
//             history("/login");
//           } else {
//             context.alertBox("error", res?.message);
//             setIsLoading(false)
//           }
//         });
//       } else {
//         postData("/api/user/verify-forgot-password-otp", {
//           email: localStorage.getItem("userEmail"),
//           otp: otp,
//         }).then((res) => {
//           if (res?.error === false) {
//             context.alertBox("success", res?.message);

//             history("/change-password");
//           } else {
//             context.alertBox("error", res?.message);
//             setIsLoading(false)
//           }
//         });
//       }
//     } else {
//       context.alertBox("error", "Please enter OTP");
//     }
//   };
  

//   return (
//     <section className="w-full h-[auto] ">
//       <img src={loginbg} className="w-full fixed top-0 left-0 opacity-25" />
//       <header className="  w-full top-0 left-0 fixed px-4 py-3 flex items-center justify-between z-50 ">
//         <Link to="/">
//           <img
//             src={logo}
//             alt="logo-image"
//             className="w-[95px] h-[75px] object-cover rounded-full "
//           />
//         </Link>
//         <div className="flex items-center gap-4">
//           <NavLink
//             to="/login"
//             exact={true}
//             activeClassName="active bg-[#f1f1f1]"
//           >
//             <button className="!rounded-full !text-[rgba(0,0,0,0.0.8)] bg-gray-200 !px-5 flex gap-3 items-center hover:bg-[#f1f1f2] h-[20px]">
//               <CgLogIn className="text-[18px]" />
//               Login
//             </button>
//           </NavLink>
//           <NavLink to="/signup" exact={true} activeClassName="active">
//             <button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-3 items-center hover:bg-[#f1f1f2]">
//               <FaRegUser className="text-[15px] " />
//               Sign Up
//             </button>
//           </NavLink>
//         </div>
//       </header>

//       <div className="  loginBox card w-[600px] pb-80 h-[auto] mx-auto pt-20 z-50 relative">
//         <div className="text-center">
//           <img src="/verify.png" className="w-[100px] m-auto" />
//         </div>

//         <div>
//           <h1 className="text-center text-[35px] font-[800] text-black mt-4">
//             Welcome Back! <br /> Please Verify your Email
//           </h1>

//           <br />
//           <p className="text-center text-[15px]">
//             OTP send to{" "}
//             <span className="text-primary font-bold">
//               {localStorage.getItem("userEmail")}
//             </span>
//           </p>
//           <br />
//           <form onSubmit={verifyOTP}>
//             <div className="text-center flex items-center justify-center flex-col">
//               <OtpBox length={6} onChange={handleOtpChange} />
//             </div>
//             <br />
//             <div className="w-[300px] m-auto">
//               <Button
//                 type="submit"
//                 className="btn-blue w-full"
               
//               >
//                 {" "}
//                 {isLoading === true ? (
//                   <CircularProgress color="inherit" />
//                 ) : (
//                   "Verify OTP"
//                 )}
//               </Button>
//             </div>
//           </form>
//           <br />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VerifyAccount;
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import OtpBox from "../../Components/OtpBox";
import { MyContext } from "../../App";
import { postData } from "../../../Utils/Api";
import CircularProgress from "@mui/material/CircularProgress";

const VerifyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const handleOtpChange = (value) => setOtp(value);

  const context = useContext(MyContext);
  const history = useNavigate();

  // ---------------- VERIFY OTP ----------------
  const verifyOTP = (e) => {
    e.preventDefault();

    if (!otp) return context.alertBox("error", "Please enter OTP");

    setIsLoading(true);
    const actionType = localStorage.getItem("actionType");

    const url =
      actionType === "forgot-password"
        ? "/api/user/verify-forgot-password-otp"
        : "/api/user/verifyEmail";

    postData(url, { email: localStorage.getItem("userEmail"), otp })
      .then((res) => {
        setIsLoading(false);

        if (res?.error === false) {
          context.alertBox("success", res?.message);

          if (actionType === "forgot-password") {
            history("/change-password");
          } else {
            localStorage.removeItem("userEmail");
            history("/login");
          }
        } else {
          context.alertBox("error", res?.message || "Verification failed");
        }
      })
      .catch(() => {
        setIsLoading(false);
        context.alertBox("error", "Network error");
      });
  };

  // ---------------- RESEND OTP ----------------
  const handleResend = () => {
    const email = localStorage.getItem("userEmail");

    if (!email) return context.alertBox("error", "No email found to resend OTP");

    setIsLoading(true);

    postData("/api/user/resend-otp", { email })
      .then((res) => {
        setIsLoading(false);
        if (res?.error === false)
          context.alertBox("success", res?.message);
        else context.alertBox("error", res?.message || "Could not resend OTP");
      })
      .catch(() => {
        setIsLoading(false);
        context.alertBox("error", "Network error");
      });
  };

  return (
    <section className="w-full min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* ------------ HEADER ------------ */}
        <header className="w-full mb-6 flex items-center justify-between">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-16 h-16 rounded-full object-cover"
            />
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

        {/* ------------ MAIN CARD ------------ */}
        <main className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* LEFT SECTION */}
            <div className="hidden md:block bg-gradient-to-b from-indigo-600 to-indigo-400 p-8 text-white">
              <div className="flex flex-col h-full justify-center">
                <img src="/verify.png" alt="verify" className="w-24 h-24 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
                <p className="text-sm opacity-90">
                  Enter the 6-digit code sent to your email. Didn't receive it?
                  You can resend the code.
                </p>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                Verify your account
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                We sent a verification code to{" "}
                <span className="font-medium text-gray-800 break-words">
                  {localStorage.getItem("userEmail")}
                </span>
              </p>

              <form onSubmit={verifyOTP} className="mt-6">
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-md">
                    <div className="mb-4">
                      <OtpBox length={6} onChange={handleOtpChange} />
                    </div>

                    <Button
                      type="submit"
                      variant="contained"
                      className="!w-full !py-3 !text-base"
                    >
                      {isLoading ? (
                        <CircularProgress color="inherit" size={22} />
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>
                  </div>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-indigo-600 font-medium hover:underline"
                    >
                      Resend
                    </button>
                  </p>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    to="/login"
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Change account / Login instead
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default VerifyAccount;


