import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import { useContext } from "react";
import { MyContext } from "../../App";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../Utlis/Api";
import { FaRegTrashAlt } from "react-icons/fa";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const AddAddress = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addressType, setAddressType] = useState("");

  const [address, setAddress] = useState([]);
  const [isOpenModel, setisOpenModel] = useState(false);
  const context = useContext(MyContext);

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

  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeAddressType = (event) => {
    setAddressType(event.target.value);
    setFormFields(() => ({
      ...formFields,
      addressType: event.target.value,
    }));
  };

useEffect(()=>{
if(context?.addressMode === "edit"){
  fetchAddress(context?.addressId)
}
},[context?.addressMode])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.address_line1 === "") {
      context.alertBox("error", "Address Line 1 is required");
      return false;
    }

    if (formFields.city === "") {
      context.alertBox("error", "City is required");

      return false;
    }

    if (formFields.state === "") {
      context.alertBox("error", "State is required");

      return false;
    }

    if (formFields.pincode === "") {
      context.alertBox("error", "Pincode is required");
      return false;
    }

    if (formFields.country === "") {
      context.alertBox("error", "Country is required");

      return false;
    }

    if (phone === "") {
      context.alertBox("error", "Mobile No is required");
      return false;
    }

    if (formFields.landmark === "") {
      context.alertBox("error", "select Landmark ");
      return false;
    }

    if (formFields.addressType === "") {
      context.alertBox("error", "select addressType");
      return false;
    }

    if (context?.addressMode === "add") {
      postData(`/api/address/add`, formFields).then((res) => {
        if (res?.error !== true) {
          setIsLoading(false);
          context.alertBox("success", res?.message);

          context.toggleAddressPanel(false);
          context.getAddressData();
          setFormFields({
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
          setAddressType("");
          setPhone("");
        } else {
          context.alertBox("error", res?.message);
          setIsLoading(false);
        }
      });
    }

    if (context?.addressMode === "edit") {
      editData(`/api/address/${context?.addressId}`, formFields).then((res) => {
        if (res?.success) {
          context.alertBox("success", res?.message);
          setIsLoading(false);
          setisOpenModel(false);
          context.getAddressData();
          setFormFields({
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
          setAddressType("");
          setPhone("");
        } else {
          context.alertBox("error", res?.message);
          setIsLoading(false);
        }
      });
    }
  };

  const fetchAddress = (id) => {
   
   
    setIsLoading(true);
    fetchDataFromApi(`/api/address/${id}`).then((res) => {
      setFormFields({
        address_line1: res?.address?.address_line1,
        city: res?.address?.city,
        state: res?.address?.state,
        pincode: res?.address?.pincode,
        country: res?.address?.country,
        mobile: res?.address?.mobile,
        userId: res?.address?.userId,
        addressType: res?.address?.addressType,
        landmark: res?.address?.landmark,
      });
      setPhone(res?.address?.mobile);
      setAddressType(res?.address?.addressType);
      setIsLoading(false);
    });
  };

  return (
    <>
      <form className="p-8 py-3 pb-8 " onSubmit={handleSubmit}>
        <div className="flex items-center gap-5 pt-2 pb-5">
          <div className="col w-[100%]">
            <TextField
              className="w-full"
              label="address Line 1"
              variant="outlined"
              size="small"
              name="address_line1"
              onChange={onchangeInput}
              value={formFields.address_line1}
            />
          </div>
        </div>

        <div className="flex items-center gap-5 pt-2 pb-5">
          <div className="col w-[50%]">
            <TextField
              className="w-full"
              label="City"
              variant="outlined"
              size="small"
              name="city"
              onChange={onchangeInput}
              value={formFields.city}
            />
          </div>

          <div className="col w-[50%]">
            <TextField
              className="w-full"
              label="State"
              variant="outlined"
              size="small"
              name="state"
              onChange={onchangeInput}
              value={formFields.state}
            />
          </div>
        </div>

        <div className="flex items-center gap-5 pt-2 pb-5">
          <div className="col w-[50%]">
            <TextField
              className="w-full"
              label="Pincode"
              variant="outlined"
              size="small"
              name="pincode"
              onChange={onchangeInput}
              value={formFields.pincode}
            />
          </div>

          <div className="col w-[50%]">
            <TextField
              className="w-full"
              label="Country"
              variant="outlined"
              size="small"
              name="country"
              onChange={onchangeInput}
              value={formFields.country}
            />
          </div>
        </div>

        <div className="flex items-center gap-5 pt-2 pb-5">
          <div className="col w-[50%]">
            <PhoneInput
              defaultCountry="in"
              value={formFields?.mobile}
              disabled={isLoading}
              onChange={(phone) => {
                setPhone(phone);
                setFormFields((prev) => ({
                  ...prev,
                  mobile: phone,
                }));
              }}
            />
          </div>

          <div className="col w-[50%]">
            <TextField
              className="w-full"
              label="Landmark"
              variant="outlined"
              size="small"
              name="landmark"
              onChange={onchangeInput}
              value={formFields.landmark}
            />
          </div>
        </div>

        <div className="col w-[50%]">
          <h6 className="text-[12px]">Address type</h6>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleChangeAddressType}
            value={addressType}
          >
            <FormControlLabel value="Home" control={<Radio />} label="Home" />
            <FormControlLabel
              value="Office"
              control={<Radio />}
              label="Office"
            />
          </RadioGroup>
        </div>

        <div className="flex  items-center gap-5 ">
          <Button
            className="!bg-orange-600 flex !text-white w-full items-center text-[19px] hover:!bg-black gap-2"
            type="submit"
          >
            Save{" "}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddAddress;
