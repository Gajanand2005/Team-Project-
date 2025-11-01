import React, { useState } from "react";
import { LuCarTaxiFront } from "react-icons/lu";
import { TbHeartHandshake } from "react-icons/tb";
import QtyBox from "../../components/QtyBox";
import Button from "@mui/material/Button";

const ProductDetailsComponent = () => {
  const [productActionIndex, setProductActionIndex] = useState(null);
  return (
    <>
      <h1 className="text-[24px] font-[600] !mb-2">Chikankari Woven Kurta</h1>
      <div className="flex items-center gap-3 text-[13px]">
        <span className="text-gray-400">
          Brand :{" "}
          <span className="font-[500] text-black opacity-75">
           E-commersce
          </span>
        </span>
      </div>
      <div className="flex items-center gap-4 py-1 !mt-4">
        <span className="oldPrice line-through text-gray-500 text-[20px] font-[500]">
          $58.00
        </span>
        <span className="oldPrice text-orange-600 font-bold text-[20px]">
          $12.00
        </span>

        <span className="text-[15px]">
          Available In Stock:{" "}
          <span className="text-green-600 text-[15px] font-[600]">
            147 Items
          </span>
        </span>
      </div>

      <p className="!mt-2 pr-10 !mb-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
        repellendus sit ad aspernatur officiis, recusandae est libero dolorum,
        esse vel earum laudantium ducimus, obcaecati quisquam odio quasi non
        placeat numquam.
      </p>
      <div className="flex items-center gap-1">
        <span className="text-[16px]">Size :</span>
        <div className="flex items-center gap-1 actions]">
          <Button
            className={`${
              productActionIndex === 0 ? "!bg-orange-600 !text-white " : ""
            }`}
            onClick={() => setProductActionIndex(0)}
          >
            XS
          </Button>
          <Button
            className={`${
              productActionIndex === 1 ? "!bg-orange-600 !text-white" : ""
            }`}
            onClick={() => setProductActionIndex(1)}
          >
            S
          </Button>
          <Button
            className={`${
              productActionIndex === 2 ? "!bg-orange-600 !text-white" : ""
            }`}
            onClick={() => setProductActionIndex(2)}
          >
            M
          </Button>
          <Button
            className={`${
              productActionIndex === 3 ? "!bg-orange-600 !text-white" : ""
            }`}
            onClick={() => setProductActionIndex(3)}
          >
            L
          </Button>
          <Button
            className={`${
              productActionIndex === 4 ? "!bg-orange-600 !text-white" : ""
            }`}
            onClick={() => setProductActionIndex(4)}
          >
            XL
          </Button>
          <Button
            className={`${
              productActionIndex === 5 ? "!bg-orange-600 !text-white" : ""
            }`}
            onClick={() => setProductActionIndex(5)}
          >
            2XL
          </Button>
          <Button
            className={`${
              productActionIndex === 6 ? "!bg-orange-600 !text-white" : ""
            }`}
            onClick={() => setProductActionIndex(6)}
          >
            3XL
          </Button>
          <Button
            className={`${
              productActionIndex === 7 ? "!bg-orange-600 !text-white" : ""
            }`}
            onClick={() => setProductActionIndex(7)}
          >
            4XL
          </Button>
          <Button
            className={`${
              productActionIndex === 8 ? "!bg-orange-600 !text-white" : ""
            }`}
            onClick={() => setProductActionIndex(8)}
          >
            5XL
          </Button>
        </div>
      </div>
      <p className="text-[14px] !mt-4 mb-2">Dilvery Time 5-12 Days</p>
      <div className="flex items-center !mt-4 gap-4">
        <div className="qtyBoxWrapper w-[69px]">
          <QtyBox />
        </div>
        <Button className="!bg-orange-600 hover:!bg-black !text-white flex gap-2">
          <LuCarTaxiFront className="!text-[22px] " />
          Add to Cart
        </Button>
      </div>

      <div className="flex items-center gap-4 !mt-6">
        <span className="flex items-center gap-3 text-[15px] link cursor-pointer font-[600] ">
          <TbHeartHandshake className="text-[19px]" />
          Add to Wishlist
        </span>
      </div>
    </>
  );
};

export default ProductDetailsComponent;
