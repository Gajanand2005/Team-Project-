import React, { useContext, useState } from "react";
import UploadBox from "../../Components/UploadBox/Index";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../../Utils/Api";
import { useNavigate } from "react-router-dom";

const AddSubCategory = () => {
  const [productSubCat, setProductSubCat] = useState("");
  const [productSubCat2, setProductSubCat2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });
  

  const [formFields2, setFormFields2] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });
      const history=useNavigate();

  const context = useContext(MyContext);

  // ------------------ Sub Category ------------------
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeProductSubCat = (event) => {
    const selectedId = event.target.value;
    setProductSubCat(selectedId);

    const selectedCat = context.catData.find((item) => item._id === selectedId);
    if (selectedCat) {
      setFormFields((prev) => ({
        ...prev,
        parentId: selectedId,
        parentCatName: selectedCat.name,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox("error", "please enter category name ");
      setIsLoading(false);
      return;
    }

    if (!formFields.parentId) {
      context.alertBox("error", "please select parent category  ");
      setIsLoading(false);
      return;
    }

    postData("/api/category/create", formFields).then((res) => {
      setIsLoading(false);
      context.setIsOpenFullScreenPanel({
        open: false,
      });
    });
  };

  // ------------------ Third Level Category ------------------
  const onChangeInput2 = (e) => {
    const { name, value } = e.target;
    setFormFields2((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeProductSubCat2 = (event) => {
    const selectedId = event.target.value;
    setProductSubCat2(selectedId);

    // find parent sub-category from context
    let selectedSubCat = null;
    context.catData.forEach((mainCat) => {
      mainCat?.children?.forEach((child) => {
        if (child._id === selectedId) {
          selectedSubCat = child;
        }
      });
    });

    if (selectedSubCat) {
      setFormFields2((prev) => ({
        ...prev,
        parentId: selectedId,
        parentCatName: selectedSubCat.name,
      }));
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    setIsLoading2(true);

    if (formFields2.name === "") {
      context.alertBox("error", "please enter category name ");
      setIsLoading2(false);
      return;
    }

    if (!formFields2.parentId) {
      context.alertBox("error", "please select parent category  ");
      setIsLoading2(false);
      return;
    }

    postData("/api/category/create", formFields2).then((res) => {
      setIsLoading2(false);
      if (context.setIsOpenFullScreenPanel) {
        context.setIsOpenFullScreenPanel({
          open: false,
        });
      }
      history("/subCategory/list")
    });
  };

  return (
    <>
      <section className="p-4 md:p-6 bg-gray-50 mt-3">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* ------------------ Add Sub Category ------------------ */}
          <form className="form bg-white p-4 md:p-6 rounded-lg shadow-sm" onSubmit={handleSubmit}>
            <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
              Add Sub Category
            </h4>
            <div className="scroll max-h-[72vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2">Product Sub Category</h3>
                  <Select
                    id="productCatDrop"
                    className="w-full bg-[#fafafa]"
                    size="small"
                    value={productSubCat}
                    label="Category"
                    onChange={handleChangeProductSubCat}
                  >
                    {context?.catData?.length !== 0 &&
                      context?.catData?.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </div>

                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2">Sub Category Name</h3>
                  <input
                    type="text"
                    className="w-full h-[44px] border border-[rgba(0,0,0,0.12)] focus:outline-none focus:border-[rgba(0,0,0,0.3)] rounded-md px-3 text-sm bg-[#fafafa]"
                    name="name"
                    onChange={onChangeInput}
                    value={formFields.name}
                  />
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100 mt-4">
              <Button type="submit" className="btn-blue btn-lg w-full md:w-[250px] flex gap-4 justify-center">
                {isLoading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <>
                    <FaCloudUploadAlt className="text-[20px]" />
                    Publish and View
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* ------------------ Add Third Level Category ------------------ */}
          <form className="form bg-white p-4 md:p-6 rounded-lg shadow-sm" onSubmit={handleSubmit2}>
            <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Add Third Level Category</h4>
            <div className="scroll max-h-[72vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2">Product Sub Category</h3>
                  <Select
                    id="productCatDrop2"
                    className="w-full bg-[#fafafa]"
                    size="small"
                    value={productSubCat2}
                    label="Category"
                    onChange={handleChangeProductSubCat2}
                  >
                    {context?.catData?.length !== 0 &&
                      context?.catData?.map((item, index) =>
                        item?.children?.length !== 0
                          ? item?.children.map((item2, index2) => (
                              <MenuItem key={index2} value={item2._id}>
                                {item2.name}
                              </MenuItem>
                            ))
                          : null
                      )}
                  </Select>
                </div>

                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2">Third Level Category Name</h3>
                  <input
                    type="text"
                    className="w-full h-[44px] border border-[rgba(0,0,0,0.12)] focus:outline-none focus:border-[rgba(0,0,0,0.3)] rounded-md px-3 text-sm bg-[#fafafa]"
                    name="name"
                    onChange={onChangeInput2}
                    value={formFields2.name}
                  />
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100 mt-4">
              <Button type="submit" className="btn-blue btn-lg w-full md:w-[250px] flex gap-4 justify-center">
                {isLoading2 ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <>
                    <FaCloudUploadAlt className="text-[20px]" />
                    Publish and View
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddSubCategory;


