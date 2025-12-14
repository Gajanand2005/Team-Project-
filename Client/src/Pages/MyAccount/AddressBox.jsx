import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CiMenuKebab } from "react-icons/ci";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";

const AddressBox = (props) => {
  const { address, handleChange } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const context = useContext(MyContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;

  const removeAddress=(id)=>{
    setAnchorEl(null);
    props.removeAddress(id)
  }

  const editAddress =(id)=>{
     setAnchorEl(null);
    context?.setOpenAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
    // context.editAddress(id)
  }

  return (
    <>
      <div
        className="addressBox w-full flex items-center justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer border border-dashed border-[rgba(0,0,0,0.2)] relative group "
        onClick={() =>
          handleChange({
            target: { value: address?._id },
          })
        }
      >
        <div className=" relative w-full p-2 rounded-md cursor-pointer ">
          <span className="inline-block p-1 bg-[#797878] rounded-md text-white capitalize">
            {props?.address?.addressType}
          </span>

          <h4 className="capitalize !mt-1 text-[15px] font-[600] flex items-center gap-4">
            <span>{context?.userData?.name}</span>
            <span className="">{props?.address?.mobile}</span>
          </h4>
          <span className="text-[15px] block w-100 !mt-1 capitalize">
            {props?.address?.address_line1 +
              " " +
              props?.address?.country +
              " " +
              props?.address?.city +
              " " +
              props?.address?.state +
              " " +
              props?.address?.pincode}
          </span>

          <div className="absolute top-[20px] right-[20px]">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <CiMenuKebab />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                },
                list: {
                  "aria-labelledby": "long-button",
                },
              }}
            >
              <MenuItem onClick={()=>editAddress(props?.address?._id)}>Edit</MenuItem>
              <MenuItem onClick={()=>removeAddress(props?.address?._id)} >Delete</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressBox;


