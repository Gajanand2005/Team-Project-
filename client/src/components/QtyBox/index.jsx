import Button from "@mui/material/Button";
import React, { useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";


const QtyBox = () => {

  const [qtyVal, setQtyVal] = useState(1);

  const plusQty=()=>{
    setQtyVal(qtyVal+1)
  }

  const minusQty=()=>{
    if(qtyVal===1){
      setQtyVal(1)
    }else{

      setQtyVal(qtyVal-1)
    }
  }

  return (
    <>
      <div className="qtyBox flex items-center relative">
        <input
          type="number"
          className="w-full  h-[38px] p-2 pl-5 text-[15px] focus:outline-none border-1 border-[rgba(0,0,0,0.2)] rounded-md"
          value={qtyVal}
        />
        <div className="flex items-center flex-col justify-between h-[40px] absolute top-0 !right-[0] z-50  border-[#000]">
          <Button className="!min-w-[40px] !w-[20px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]" onClick={plusQty}>
            <VscTriangleUp className="!text-[12px] opacity-55"  />
          </Button>
          <Button className="!min-w-[40px] !w-[20px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]" onClick={minusQty}>
            <VscTriangleDown className="!text-[12px] opacity-55" />
          </Button>
        </div>



      </div>
    </>
  );
};

export default QtyBox;
