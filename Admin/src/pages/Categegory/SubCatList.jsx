import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { MyContext } from "../../App";
import { FaAngleDown } from "react-icons/fa6";


const SubCatList = () => {
  const [isOpen, setIsOpen] = useState(0);
  const context = useContext(MyContext);

  const expend = (index) => {
    if (isOpen === index) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(index);
    }
  };



  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 py-4 mt-3 gap-4">
        <h2 className="text-lg sm:text-xl font-semibold">Sub Category List</h2>
        <Button
          className="!bg-blue-600 !text-white !w-full sm:!w-auto !px-6 !py-2"
          onClick={() =>
            context.setIsOpenFullScreenPanel({
              open: true,
              model: "Add New Sub Category",
            })
          }
        >
          + Add Sub Category
        </Button>
      </div>
      <div className="card my-4 pt-5 pb-5 px-5 shadow-md sm:rounded-lg bg-white">
        {context?.catData?.length !== 0 && (
          <ul className="w-full">
            {context?.catData?.map((firstLavelCat, index) => {
              return (
                <li className="w-full mb-1" key={index}>
                  <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                    <span className="font-[500] flex items-center gap-4 text-[14px]">
                      {firstLavelCat?.name}
                    </span>
                    <Button
                      className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto"
                      onClick={() => expend(index)}
                    >
                      <FaAngleDown />
                    </Button>
                  </div>

                  {isOpen === index && (
                    <>
                      {Array.isArray(firstLavelCat?.children) && firstLavelCat.children.length > 0 && (
                        <ul className="w-full">
                          {firstLavelCat?.children?.map((subCat, index_) => {
                            return (
                              <li className="w-full py-1" key={index_}>
                                <div className="w-full flex items-center gap-3 p-2">
                                  <span className="text-[14px] font-[500]">{subCat?.name}</span>
                                  <div className="ml-auto flex items-center gap-2">
                                    <Button
                                      className="!min-w-[35px] !w-[35px] !h-[30px] !rounded-full !text-black !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)]"
                                      onClick={() =>
                                        context.setIsOpenFullScreenPanel({
                                          open: true,
                                          model: "Edit Category",
                                          id: subCat?._id
                                        })
                                      }
                                    >
                                      Edit
                                    </Button>
                                  </div>
                                </div>

                              {
                                Array.isArray(subCat?.children) && subCat?.children?.length > 0 &&
                                <ul className="pl-4">
                                  {
                                    subCat?.children?.map(
                                      (thirdLevel, index_)=>{
                                        return(
                                          <li key={index_} className="w-full hover:bg-[#f1f1f1] py-1">
                                            <div className="w-full flex items-center gap-3 p-2">
                                              <span className="text-[14px]">{thirdLevel?.name}</span>
                                              <div className="ml-auto flex items-center gap-2">
                                                <Button
                                                  className="!min-w-[35px] !w-[35px] !h-[30px] !rounded-full !text-black !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)]"
                                                  onClick={() =>
                                                    context.setIsOpenFullScreenPanel({
                                                      open: true,
                                                      model: "Edit Category",
                                                      id: thirdLevel?._id
                                                    })
                                                  }
                                                >
                                                  Edit
                                                </Button>
                                              </div>
                                            </div>
                                          </li>
                                        )
                                      }
                                    )
                                  }
                                </ul>
                              }

                              </li>


                            );
                          })}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};
export default SubCatList;


