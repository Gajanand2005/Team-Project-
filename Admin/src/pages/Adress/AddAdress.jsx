import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { editData, fetchDataFromApi, postData } from "../../../Utils/Api";
import { MyContext } from "../../App";

const AddAdress = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = React.useState(false);

  const context = useContext(MyContext);

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "",
    userId: context?.userdata?._id,
    selected: false,
  });

  useEffect(() => {
    setFormFields((prevState) => ({
      ...prevState,
      userId: formFields.userId,
    }));

    formFields.userId = context?.userData?._id;
  }, [context?.userdata]);

   


  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields((prev) => ({
      ...prev,
      status: event.target.value,
    }));
  };

  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

    postData(`/api/address/add`, formFields).then((res) => {
      if (res?.error !== true) {
        setIsLoading(false);
        context.alertBox("success", res?.message);

        context?.setIsOpenFullScreenPanel({
          open: false,
        });

         fetchDataFromApi(`/api/address/get?${context?.userData?._id}`).then(
                (res) => {
                  context?.setAddress(res.data);
                }
              );
           
       

      } else {
        context.alertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <section className="p-5 bg-gray-50 mt-3 ">
        <form className="form py-3 p-8 " onSubmit={handleSubmit}>
          <div className="scroll max-h-72vh] ">
            <div className="grid grid-cols-2 mb-3 gap-4 ">
              <div className="col w-[100%]">
                <h3 className="text-[14px] font-[500] !mb-2">Address Line 1</h3>
                <input
                  type="text"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
                  name="address_line1"
                  onChange={onchangeInput}
                  value={formFields.address_line1}
                />
              </div>

              <div className="col w-[100%]">
                <h3 className="text-[14px] font-[500] !mb-2">City</h3>
                <input
                  type="text"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
                  name="city"
                  onChange={onchangeInput}
                  value={formFields.city}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 mb-3 gap-4 ">
              <div className="col w-[100%]">
                <h3 className="text-[14px] font-[500] !mb-2">State</h3>
                <input
                  type="text"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
                  name="state"
                  onChange={onchangeInput}
                  value={formFields.state}
                />
              </div>

              <div className="col w-[100%]">
                <h3 className="text-[14px] font-[500] !mb-2">Pincode</h3>
                <input
                  type="text"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
                  name="pincode"
                  onChange={onchangeInput}
                  value={formFields.pincode}
                />
              </div>
              <div className="col w-[100%]">
                <h3 className="text-[14px] font-[500] !mb-2">country</h3>
                <input
                  type="text"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
                  name="country"
                  onChange={onchangeInput}
                  value={formFields.country}
                />
              </div>

              <div className="col w-[100%]">
                <h3 className="text-[14px] font-[500] !mb-2">Mobile NO</h3>
                <PhoneInput
                  defaultCountry="in"
                  value={formFields?.mobile}
                  disabled={isLoading}
                  onChange={(phone) => {
                    setPhone(phone);
                    {
                      setFormFields((prev) => ({
                        ...prev,
                        mobile: phone,
                      }));
                    }
                  }}
                />
              </div>

              <div className="col w-[100%]">
                <h3 className="text-[14px] font-[500] !mb-2">Status</h3>
                <Select
                  value={status}
                  onChange={handleChangeStatus}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                  className="w-full"
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </div>
            </div>
            <br />
          </div>

          <br />
          <br />
          <Button
            type="submit"
            className="btn-blue btn-lg w-[250px] flex gap-4"
          >
            <FaCloudUploadAlt className="text-[25px]" />
            Publish and View
          </Button>
        </form>
      </section>
    </>
  );
};

export default AddAdress;


