import { Button, Checkbox } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import TooltipMUI from "@mui/material/Tooltip";
import { FaEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { MyContext } from "../../App";
import { deleteData, editData, fetchDataFromApi, postData } from "../../../Utils/Api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AddSize = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState("");

  const context = useContext(MyContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetchDataFromApi("/api/product/productSize/get").then((res) => {
      if (res?.error === false) {
        setData(res?.data);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (name === "") {
      context.alertBox("error", "Please enter product size");
      setIsLoading(false);
      return false;
    }

    if (editId === "") {
      postData(`/api/product/productSize/create`, {
        name: name,
      }).then((res) => {
        if (res?.error === false) {
          context.alertBox("success", res?.message);
          setTimeout(() => {
            setIsLoading(false);
            getData();
            setName("");
          }, 300);
        } else {
          context.alertBox("error", res?.message || "Failed to create product size");
          setIsLoading(false);
        }
      }).catch((error) => {
        context.alertBox("error", "Something went wrong while creating product size");
        setIsLoading(false);
      });
    } else {
      editData(`/api/product/productSize/${editId}`, {
        name: name,
      }).then((res) => {
        if (res?.error === false) {
          context.alertBox("success", res?.message);
          setTimeout(() => {
            setIsLoading(false);
            getData();
            setName("");
            setEditId("");
          }, 300);
        } else {
          context.alertBox("error", res?.message || "Failed to update product size");
          setIsLoading(false);
        }
      }).catch((error) => {
        context.alertBox("error", "Something went wrong while updating product size");
        setIsLoading(false);
      });
    }
  };

  const deleteItem = (id) => {
    deleteData(`/api/product/productSize/${id}`).then((res) => {
      if (res?.error === false) {
        getData();
        context.alertBox("success", res?.message || "Item deleted");
      } else {
        context.alertBox("error", res?.message || "Failed to delete item");
      }
    }).catch((error) => {
      context.alertBox("error", "Something went wrong while deleting item");
    });
  };

  const editItem = (id) => {
    fetchDataFromApi(`/api/product/productSize/${id}`).then((res) => {
     setName(res?.data?.name);
      setEditId(res?.data?._id);

    });
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 md:px-4 py-0 mt-3">
        <h2 className="text-[16px] md:text-[18px] font-[600]">Add Product Size</h2>
      </div>
      <div className="card my-4 pt-5 pb-5 shadow-md rounded-lg bg-white w-full md:w-[65%] px-4 md:px-0">
        <form action="" className="form py-3 p-4 md:p-6" onSubmit={handleSubmit}>
          <div className="col mb-4">
            <h3 className="text-[12px] md:text-[14px] font-[500] mb-2 text-black">
              PRODUCT SIZE
            </h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
            />
          </div>

          <Button className="!w-full !bg-blue-600 !text-white !py-2 flex gap-2 justify-center" type="submit">
            {isLoading === true ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[20px]" />
                <span className="hidden sm:inline">Publish and View</span>
                <span className="sm:hidden">Publish</span>
              </>
            )}
          </Button>
        </form>
      </div>
      {data?.length !== 0 && (
        <div className="card my-4 pt-5 pb-5 shadow-md rounded-lg bg-white w-full md:w-[65%] px-4 md:px-0">
          <div className="relative overflow-x-auto mt-5 pb-5">
            <table className="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-200 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-2 md:px-6 pr-0 py-3 w-[10%]">
                    <div className="w-[40px] md:w-[60px]">
                      <Checkbox {...label} size="small" />
                    </div>
                  </th>
                  <th scope="col" className="px-2 md:px-0 py-3 whitespace-nowrap">
                    PRODUCT SIZE
                  </th>
                  <th scope="col" className="px-2 md:px-6 py-3 whitespace-nowrap">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id} className="odd:bg-white border-b dark:border-gray-700">
                    <td className="px-2 md:px-6 pr-0 py-3">
                      <div className="w-[40px] md:w-[60px]">
                        <Checkbox {...label} size="small" />
                      </div>
                    </td>
                    <td className="px-2 md:px-0 py-2 text-xs md:text-sm">{item.name}</td>
                    <td className="px-2 md:px-6 py-2">
                      <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit Product" placement="top">
                          <Button
                            className="!w-[32px] !h-[32px] md:!w-[35px] md:!h-[35px] !min-w-[32px] md:!min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]"
                            onClick={() => editItem(item._id)}
                          >
                            <FaEdit className="text-[rgba(0,0,0,0.7)] text-[16px] md:text-[20px]" />
                          </Button>
                        </TooltipMUI>

                        <TooltipMUI title="Remove Product" placement="top">
                          <Button
                            className="!w-[32px] !h-[32px] md:!w-[35px] md:!h-[35px] !min-w-[32px] md:!min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]"
                            onClick={() => deleteItem(item._id)}
                          >
                            <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[20px] md:text-[25px]" />
                          </Button>
                        </TooltipMUI>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AddSize;


