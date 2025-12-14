import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { FaCloudUploadAlt } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { Collapse } from "react-collapse";
import {
  editData,
  fetchDataFromApi,
  postData,
  uploadImage,
} from "../../../Utils/Api";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Radio from "@mui/material/Radio";

const label = { inputProps: { "aria-label": "Checkbox demo" } };


const Profile = () => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [isChangePasswordFormShow, setisChangePasswordFormShow] =
    useState(false);

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    // editData(`/api/address/selectAddress/${event.target.value}`).then((res) => {
    //   if (res?.error !== true) {
    //     console.log("Address selected");
    //   } else {
    //     console.log("Error selecting address");
    //   }
    // });
  };

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
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      history("/login");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.userData?._id) {
      fetchDataFromApi(`/api/address/get?${context?.userData?._id}`).then(
        (res) => {
          setAddress(res.data);
          context?.setAddress(res.data);
        }
      );
    }

    {
      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name || "",
        email: context?.userData?.email || "",
        mobile: context?.userData?.mobile
          ? String(context?.userData?.mobile)
          : "",
      });
      const ph = `"${context?.userData?.mobile}"`;
      setPhone(ph);
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

  useEffect(() => {
    const userAvtar = [];
    if (
      context?.userData?.avatar !== "" &&
      context?.userData?.avatar !== undefined
    ) {
      userAvtar.push(context?.userData?.avatar);
      setPreviews(userAvtar);
    }
  });

  let img_arr = [];
  let uniqueArray = [];
  let selectedImages = [];

  const formdata = new FormData();
  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);

      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/webp" ||
            files[i].type === "image/gif" ||
            files[i].type === "image/png")
        ) {
          const file = files[i];
          selectedImages.push(file);
          formdata.append(`avatar`, file);
          uploadImage("/api/user/user-avatar", formdata).then((res) => {
            setUploading(false);
            let avatar = [];
            avatar.push(res?.data?.avatar);
            setPreviews(avatar);
          });
        } else {
          setUploading(false);
          return false;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="card my-5 w-[65%] shadow-md sm:rounded-lg bg-white px-5 pb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">User Profile</h2>

          <Button
            className="!ml-auto"
            onClick={() =>
              setisChangePasswordFormShow(!isChangePasswordFormShow)
            }
          >
            Change Password
          </Button>
        </div>

        <br />

        <div className="w-[90px] md:w-[110px] h-[90px] md:h-[110px] rounded-full overflow-hidden !mb-3 relative group flex items-center justify-center bg-gray-200">
          {uploading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              {previews?.length !== 0 ? (
                previews?.map((img, index) => {
                  return (
                    <img
                      src={img}
                      key={index}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  );
                })
              ) : (
                <img
                  src={"/user.png"}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </>
          )}

          <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100 ">
            <FaCloudUploadAlt className="text-[#fff] text-[20px] md:text-[25px]" />
            <input
              type="file"
              className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
              name="avatar"
            />
          </div>
        </div>

        <form className="form !mt-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5">
            <div className="w-[50%]">
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
                name="name"
                value={formFields.name}
                disabled={isLoading}
                onChange={onchangeInput}
              />
            </div>

            <div className="w-[50%]">
              <input
                type="email"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
                name="email"
                value={formFields.email}
                disabled={isLoading}
                onChange={onchangeInput}
              />
            </div>
          </div>

          <div className="flex items-center !mt-4 gap-5">
            <div className="w-[50%]">
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

          <div
            className="flex items-center justify-center p-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] cursor-pointer hover:bg-[#e1f1ff]"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Address",
              })
            }
          >
            <span className ="text-[14px] font-[500]">Add Address </span>
          </div>
          <div className="flex gap-2 flex-col mt-4 ">
            {address?.address_line1}
            {address?.length > 0 &&
              address.map((address, index) => {
                return (
                  <div
                    key={index}
                    className="addressBox w-full flex items-center justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer border border-dashed border-[rgba(0,0,0,0.2)] "
                    onClick={() =>
                      handleChange({
                        target: { value: address?._id },
                      })
                    }
                  >
                    <Radio
                      name="address"
                      value={address?._id}
                      onChange={handleChange}
                      checked={
                        selectedValue ===
                       ( address?._id )
                        
                      }
                    />
                    <span className="text-[12px]">
                      {address?.address_line1 + " "+
                          address?.country + " "+
                          address?.city + " "+
                          address?.state + " "+
                          address?.pincode}
                    </span>
                  </div>
                );
              })}
          </div>
          <br />

          <div className="flex items-center gap-4">
            <Button
              className="btn-blue btn-lg !text-white hover:!bg-black w-full"
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
        <div className="card bg-white  w-[65%] p-5 shadow-md rounded-md">
          <div className="flex items-center pb-3">
            <h2 className="text-[18px] font-[600] pb-0">Change Password</h2>
          </div>
          <hr />

          <form className="!mt-8" onSubmit={handleSubmitChangePassword}>
            <div className="flex items-center gap-5">
              <div className="w-[50%]">
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

              <div className="w-[50%]">
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
            </div>

            <div className="flex items-center !mt-4 gap-5">
              <div className="w-[50%]">
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
                className="btn-blue btn-lg !text-white hover:!bg-black w-[100%]"
                type="submit"
                disabled={!valideValue2}
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
    </>
  );
};

export default Profile;


