import { Button } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TooltipMUI from "@mui/material/Tooltip";
import { PiExportBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { deleteData, fetchDataFromApi } from "../../../Utils/Api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "Image", label: "IMAGE", minWidth: 80 },
  { id: "Name", label: "NAME", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];

const CategoryList = () => {
  const context = useContext(MyContext);


  const deleteCat=(id)=>{
    deleteData(`/api/category/${id}`).then((res)=>{
      fetchDataFromApi("/api/category").then((res) => {
      context?.setCatData(res?.data);
    });
    })
  }

  useEffect(()=>{
     fetchDataFromApi("/api/category").then((res) => {
      context?.setCatData(res?.data);
    });
   
  },[context?.setIsOpenFullScreenPanel])

  return (
    <>
      <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Category List</h2>
          <div className="col w-[15%] ml-auto flex items-center gap-2">
            {/* <TooltipMUI title="Export" placement="top">
              <Button className="!w-[35px] !h-[35px] btn btn-sm flex items-center !rounded-full !text-black !hover:bg-black-300 hover:scale-105">
                <PiExportBold />
              </Button>
            </TooltipMUI> */}
            <TooltipMUI title="Add New Category" placement="top">
              <Button
                className="!w-[35px] !h-[35px] btn btn-sm flex items-center !rounded-full !text-black hover:bg-black-300 hover:scale-105"
                onClick={() =>
                  context.setIsOpenFullScreenPanel({
                    open: true,
                    model: "Add New Category",
                  })
                }
              >
                <span className="text-[18px]">
                  <FaPlus />
                </span>
              </Button>
            </TooltipMUI>
          </div>
        </div>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{ fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {context?.catData?.length !== 0 &&
                  context?.catData?.map((item, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={item._id}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4 w-[100px]">
                            <div className="img w-[80px] rounded-md overflow-hidden group">
                              <LazyLoadImage
                                alt={"image"}
                                effect="blur"
                                className="w-full group-hover:scale-105 transition-all"
                                src={item.images[0]}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TooltipMUI title="Edit Category" placement="top">
                              <Button
                                className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]"
                                onClick={() =>
                                  context.setIsOpenFullScreenPanel({
                                    open: true,
                                    model: "Edit Category",
                                    id:item?._id
                                  })
                                }
                              >
                                <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                              </Button>
                            </TooltipMUI>

                            <TooltipMUI title="Remove Category" placement="top">
                              <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]" onClick={()=>deleteCat(item?._id)}>
                                <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[25px]" />
                              </Button>
                            </TooltipMUI>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
};

export default CategoryList;


