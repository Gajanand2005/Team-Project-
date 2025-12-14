import React, { useContext, useState } from "react";
import { IoIosImages } from "react-icons/io";
import { uploadImage } from "../../../Utils/Api";
import CircularProgress from "@mui/material/CircularProgress";
import { MyContext } from "../../App";

const UploadBox = (props) => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  // If `showPreviewInside` prop is true, the component will render uploaded
  // previews inside the upload box. Default is false so the upload placeholder
  // remains visible and previews can be shown elsewhere (parent component).
  const showPreviewInside = props.showPreviewInside === true;

  const context = useContext(MyContext);

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      const files = e.target.files;

      if (files.length === 0) {
        return;
      }

      setUploading(true);

      const formdata = new FormData();

      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/webp" ||
            files[i].type === "image/gif" ||
            files[i].type === "image/png")
        ) {
          formdata.append("images", files[i]);
        } else {
          setUploading(false);
          context.alertBox("error", "Please select a valid image file (jpeg, jpg, webp, gif, png)");
          return;
        }
      }

      const res = await uploadImage(apiEndPoint, formdata);
      setUploading(false);

      if (res && res.images && res.images.length > 0) {
        props.setPreviews(res.images);
        setPreviews(res.images);
      } else {
        context.alertBox("error", "Failed to upload images");
      }
    } catch (error) {
      console.log(error);
      setUploading(false);
      context.alertBox("error", "An error occurred while uploading images");
    }
  };

  return (
    <>
      <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.4)] h-[150px] w-full sm:w-[180px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
        {uploading ? (
          <>
            <CircularProgress />
            <h4 className="text-center text-sm mt-2">Uploading....</h4>
          </>
          ) : showPreviewInside && previews.length > 0 ? (
            <div className="w-full h-full flex flex-wrap gap-1 overflow-hidden">
              {previews.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              ))}
            </div>
        ) : (
          <>
            <IoIosImages className="text-[40px] sm:text-[50px] opacity-50 pointer-events-none" />
            <h4 className="text-[12px] sm:text-[14px] pointer-events-none text-center px-2">Image Upload</h4>

            <input
              type="file"
              accept="image/*"
              multiple={props.multiple !== undefined ? props.multiple : false}
              className="absolute top-0 left-0 w-full h-full z-50 opacity-0 cursor-pointer"
              onChange={(e) => onChangeFile(e, props?.url)}
              name="images"
            />
          </>
        )}
      </div>
    </>
  );
};

export default UploadBox;


