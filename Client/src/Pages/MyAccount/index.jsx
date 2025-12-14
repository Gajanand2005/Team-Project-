import React, { useContext, useEffect, useState } from "react";
import { editData, postData } from "../../Utils/Api.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountSidebar from "../../Components/AccountSidebar/index.jsx";
import { Collapse } from "react-collapse";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const MyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [phone, setPhone] = useState("");
  const [isChangePasswordFormShow, setisChangePasswordFormShow] =
    useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const context = useContext(MyContext);
const history =useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      history("/login");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.userData?._id) {
      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name || "",
        email: context?.userData?.email || "",
        mobile: context?.userData?.mobile
          ? String(context?.userData?.mobile)
          : "",
      });
      setChangePassword((prev) => ({
        ...prev,
        email: context?.userData?.email || "",
      }));
    }
  }, [context?.userData]);

  const onchangeInput = (e) => {
    const { name, value } = e.target;

    if (["name", "email", "mobile"].includes(name)) {
      setFormFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (["oldPassword", "newPassword", "confirmPassword"].includes(name)) {
      setChangePassword((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const valideValue = Object.values(formFields).every((el) => el);
  const valideValue2 = Object.values(changePassword).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!valideValue) {
      context.alertBox("error", "Please fill all profile fields");
      return;
    }

    setIsLoading(true);

    editData(`/api/user/${userId}`, formFields)
      .then((res) => {
        setIsLoading(false);
        if (res?.error !== true) {
          context.alertBox("success", res?.data?.message);
          context.setUserData(res?.data?.user);
          context.setIsLogin(true);
        } else {
          context.alertBox("error", res?.data?.message);
        }
      })
      .catch(() => {
        setIsLoading(false);
        context.alertBox("error", "Update failed. Please try again.");
      });
  };

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();

    if (changePassword.newPassword !== changePassword.confirmPassword) {
      context.alertBox("error", "Password and Confirm Password do not match");
      return;
    }

    setIsLoading2(true);

    postData(`/api/user/reset-password`, changePassword)
      .then((res) => {
        setIsLoading2(false);
        if (res?.error !== true) {
          context.alertBox("success", res?.message);
          setChangePassword({
            email: formFields.email,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          context.alertBox("error", res?.message);
        }
      })
      .catch(() => {
        setIsLoading2(false);
        context.alertBox("error", "Password change failed. Try again.");
      });
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="col1 w-full lg:w-[20%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-full lg:w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md !mb-5">
            <div className="flex items-center pb-3">
              <h2 className="text-[20px] font-[600] pb-0">My Profile</h2>
              <Button
                className="!ml-auto"
                onClick={() =>
                  setisChangePasswordFormShow(!isChangePasswordFormShow)
                }
              >
                Change Password
              </Button>
            </div>
            <hr />

            <form className="!mt-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
                <div className="col">
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="name"
                    value={formFields.name}
                    disabled={isLoading}
                    onChange={onchangeInput}
                  />
                </div>

                <div className="w-[col]">
                  <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="email"
                    value={formFields.email}
                    disabled={isLoading}
                    onChange={onchangeInput}
                  />
                </div>

                <div className="col">
                  <PhoneInput
                    defaultCountry="in"
                    value={formFields?.mobile}
                    disabled={isLoading}
                    onChange={(phone) => {
                      setPhone(phone);
                      setFormFields({
                        mobile: phone,
                      });
                    }}
                  />
               
                </div>
              </div>

              

              <br />

              <div className="flex items-center gap-4">
                <Button
                  className="!bg-orange-600 !text-white hover:!bg-black w-[150px] btn"
                  type="submit"
                  disabled={!valideValue}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </form>
          </div>

          <Collapse isOpened={isChangePasswordFormShow}>
            <div className="card bg-white p-5 shadow-md rounded-md">
              <div className="flex items-center pb-3">
                <h2 className="text-[20px] font-[600] pb-0">Change Password</h2>
              </div>
              <hr />

              <form className="!mt-8" onSubmit={handleSubmitChangePassword}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {
                    context?.userData?.signUpWithGoogle===false &&
                     <div className="col">
                    <TextField
                      type="password"
                      label="Old Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="oldPassword"
                      value={changePassword.oldPassword}
                      disabled={isLoading2}
                      onChange={onchangeInput}
                    />
                  </div>
                  }
                 

                  <div className="col">
                    <TextField
                      type="password"
                      label="New Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="newPassword"
                      value={changePassword.newPassword}
                      disabled={isLoading2}
                      onChange={onchangeInput}
                    />
                  </div>
                    <div className="col">
                    <TextField
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="confirmPassword"
                      value={changePassword.confirmPassword}
                      disabled={isLoading2}
                      onChange={onchangeInput}
                    />
                  </div>
                </div>

               

                <br />

                <div className="flex items-center gap-4">
                  <Button
                    className="!bg-orange-600 !text-white hover:!bg-black w-[200px] btn"
                    type="submit"
                    
                  >
                    {isLoading2 ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Collapse>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;


