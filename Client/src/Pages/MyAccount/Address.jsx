import React, { useEffect, useState } from "react";
import AccountSidebar from "../../Components/AccountSidebar/index.jsx";
import Radio from "@mui/material/Radio";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { deleteData, editData, fetchDataFromApi, postData } from "../../Utils/Api";
import { FaRegTrashAlt } from "react-icons/fa";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import AddressBox from "./AddressBox.jsx";

const label = { inputProps: { "aria-label": "Radio demo" } };

const Address = () => {
  const history = useNavigate();

  const [address, setAddress] = useState([]);
  const [status, setStatus] = useState(false);
  const [phone, setPhone] = useState("");
  const [isOpenModel, setisOpenModel] = useState(false);
  const context = useContext(MyContext);
  const [selectedValue, setSelectedValue] = useState("");
  const [addressType, setAddressType] = useState("");
  const [mode, setMode] = useState("add");
  const [addressId, setAddressId]= useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      history("/login");
    }
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    userId: context?.userData?._id,
    addressType: "",
    landmark: "",
  });

  // const handleChangeStatus = (event) => {
  //   setStatus(event.target.value);
  //   setFormFields((prev) => ({
  //     ...prev,
  //     status: event.target.value,
  //   }));
  // };



  // const removeAddress = (id) => {
  //   deleteData(`/api/address/${id}`).then((res) => {

  //       fetchDataFromApi(`/api/address/get?${context?.userData?._id}`).then(
  //         (res) => {
  //           setAddress(res.data);
  //         }
  //       );
  //     });
  // };

  useEffect(() => {
    setAddress(context.addressData);
  }, [context.addressData]);

  const removeAddress = async (id) => {
    try {
      const res = await deleteData(`/api/address/${id}`);
      if (res?.success) {
        // 1️⃣ UI se turant hata do
        setAddress((prev) => prev.filter((item) => item._id !== id));

        // 2️⃣ Optional: background me fresh data le aao
        fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`
        ).then((res) => {
          setAddress(res.data);
        });

        context.alertBox("success", "Address removed successfully");
      } else {
        context.alertBox("error", res?.message || "Failed to remove address");
      }
    } catch (error) {
      console.log(error);
      context.alertBox("error", "Something went wrong while removing address");
    }
  };

  return (
    <>
      <section className="py-10 w-full">
        <div className="container flex flex-col lg:flex-row gap-5">
          <div className="col1 w-full lg:w-[20%]">
            <AccountSidebar />
          </div>

          <div className="col2 w-full lg:w-[50%]">
            <div className="card bg-white p-5 shadow-md rounded-md !mb-5">
              <div className="flex items-center pb-3">
                <h2 className="text-[20px] font-[600] pb-0">Address</h2>
              </div>
              <hr />

              <div
                className="flex !mb-4 items-center justify-center p-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] cursor-pointer hover:bg-[#e1f1ff]"
                onClick={() =>context?.toggleAddressPanel(true)}
              >
                <span className="text-[14px] font-[500]">Add Address </span>
              </div>
              <div className="flex  flex-col">
                {address?.length > 0 &&
                  address.map((address, index) => (
                    <AddressBox
                      removeAddress={removeAddress}
                      address={address}
                      key={index}
                      handleChange={handleChange}
                     
                     
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
                
    </>
  );
};

export default Address;


