import React, { useContext, useState } from "react";
import UploadBox from "../../Components/UploadBox/Index";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { deleteImages, postData } from "../../../Utils/Api";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
    
  });

const history = useNavigate();

  const context = useContext(MyContext);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
    formFields.images = previewsArr;
  };

  const removeImg = (images, index) => {
    var imageArr = [];
    imageArr = previews;
    deleteImages(`/api/category/deleteImage?img=${images}`).then((res) => {
      imageArr.splice(index, 1);
      setPreviews([]);
      setTimeout(() => {
        setPreviews(imageArr);
        formFields.images = imageArr;
      }, 100);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox("error", "please enter category name ");
      setIsLoading(false);
      return false;
    }

    if (previews?.length === 0) {
      context.alertBox("error", "please enter category image ");
      setIsLoading(false);
      return false;
    }
    postData("/api/category/create", formFields).then((res) => {
      setIsLoading(false);
      context.setIsOpenFullScreenPanel({
        open: false,
      });
      history("/category/list")
    });
  };

  return (
    <>
      <section className="p-5 bg-gray-50 mt-3 ">
        <form className="form py-1 p-1 md:p-8 md:py-1 " onSubmit={handleSubmit}>
          <div className="scroll max-h-72vh] ">
            <div className="grid grid-cols-1 mb-3 ">
              <div className="col w-full  md:w-[25%]">
                <h3 className="text-[14px] font-[500] !mb-2">
                  Categegory Name
                </h3>
                <input
                  type="text"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
                  onChange={onChangeInput}
                  name="name"
                  value={formFields.name}
                />
              </div>
            </div>
            
            <h3 className="text-[14px] font-[500] !mb-2">Categegory Image</h3>
            <br />
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 ">
              {previews?.length !== 0 &&
                previews?.map((images, index) => {
                  return (
                    <div className="uploadBoxWrapper mr-3 relative" key={index}>
                      <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[50px] flex items-center justify-center z-50 cursor-pointer">
                        <IoClose
                          className="text-white text-[17px]"
                          onClick={() => removeImg(images, index)}
                        />
                      </span>

                      <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.4)] h-[150px] w-[180px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                        <LazyLoadImage
                          alt={"image"}
                          effect="blur"
                          wrapperProps={{
                            // If you need to, you can tweak the effect transition using the wrapper style.
                            style: { transitionDelay: "1s" },
                          }}
                          className="w-full h-full object-cover"
                          src={images}
                        />
                      </div>
                    </div>
                  );
                })}

              <UploadBox
                multiple={true}
                name="images"
                url="/api/category/uploadImages"
                setPreviews={setPreviewsFun}
              />
            </div>
          </div>

          <hr />
          <br />
          <Button
            type="submit"
            className="!bg-blue-600 !text-black btn-lg w-[250px] flex gap-4"
          >
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px]" />
                Publish and View
              </>
            )}
          </Button>
        </form>
      </section>
    </>
  );
};

export default AddCategory;


