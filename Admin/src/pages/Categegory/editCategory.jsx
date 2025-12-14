import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, CircularProgress, MenuItem, Select } from "@mui/material";
import { IoClose } from "react-icons/io5";
import UploadBox from "../../Components/UploadBox/Index";
import { MyContext } from "../../App";
import {
  deleteImages,
  editData,
  fetchDataFromApi,
} from "../../../Utils/Api";

const flattenCategories = (categories = []) => {
  const list = [];

  const traverse = (items) => {
    items.forEach((item) => {
      list.push({ _id: item?._id, name: item?.name });
      if (Array.isArray(item?.children) && item.children.length) {
        traverse(item.children);
      }
    });
  };

  traverse(categories);
  return list;
};

const EditCategory = () => {
  const context = useContext(MyContext);
  const categoryId = context?.isOpenFullScreenPanel?.id ?? null;

  const [formFields, setFormFields] = useState({
    name: "",
    parentId: "",
  });
  const [images, setImages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRemovingImg, setIsRemovingImg] = useState(false);

  const categoryOptions = useMemo(() => {
    const flattened = flattenCategories(context?.catData || []);
    return flattened.filter((item) => item?._id !== categoryId);
  }, [context?.catData, categoryId]);

  useEffect(() => {
    if (!categoryId) {
      return;
    }

    let ignore = false;
    const loadCategory = async () => {
      setIsFetching(true);
      const res = await fetchDataFromApi(`/api/category/${categoryId}`);
      setIsFetching(false);

      if (ignore) return;

      if (res?.error === true) {
        context?.alertBox?.(
          "error",
          res?.message || "Failed to load category details"
        );
        return;
      }

      const category = res?.category || res?.data || res;
      setFormFields({
        name: category?.name || "",
        parentId: category?.parentId || "",
      });
      setImages(Array.isArray(category?.images) ? category.images : []);
    };

    loadCategory();

    return () => {
      ignore = true;
    };
  }, [categoryId, context]);

  const selectedParent = useMemo(() => {
    return categoryOptions.find((item) => item?._id === formFields.parentId);
  }, [categoryOptions, formFields.parentId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadComplete = (uploadedImages = []) => {
    if (!Array.isArray(uploadedImages) || uploadedImages.length === 0) {
      return;
    }

    setImages((prev) => {
      const merged = [...prev, ...uploadedImages.filter(Boolean)];
      return Array.from(new Set(merged));
    });
  };

  const handleRemoveImage = async (imageUrl) => {
    if (!imageUrl) return;
    setIsRemovingImg(true);
    try {
      const res = await deleteImages(
        `/api/category/deleteImage?img=${encodeURIComponent(imageUrl)}`
      );

      if (res?.error === true) {
        context?.alertBox?.("error", res?.message || "Failed to delete image");
      } else {
        setImages((prev) => prev.filter((img) => img !== imageUrl));
        context?.alertBox?.("success", "Image removed successfully");
      }
    } catch (error) {
      context?.alertBox?.("error", "Failed to delete image");
    } finally {
      setIsRemovingImg(false);
    }
  };

  const refreshCategories = async () => {
    const res = await fetchDataFromApi("/api/category");
    if (res?.error !== true) {
      context?.setCatData?.(res?.data);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!categoryId) {
      context?.alertBox?.("error", "Category information missing");
      return;
    }

    if (!formFields.name.trim()) {
      context?.alertBox?.("error", "Please enter category name");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        name: formFields.name.trim(),
        images,
        parentId: formFields.parentId || null,
        parentCatName: selectedParent?.name || null,
      };

      const res = await editData(`/api/category/${categoryId}`, payload);

      if (res?.error === true) {
        context?.alertBox?.("error", res?.message || "Failed to update category");
      } else {
        context?.alertBox?.("success", res?.message || "Category updated");
        await refreshCategories();
        context?.setIsOpenFullScreenPanel?.({ open: false });
      }
    } catch (error) {
      context?.alertBox?.("error", "Failed to update category");
    } finally {
      setIsSaving(false);
    }
  };

  if (!categoryId) {
    return (
      <section className="p-8">
        <h2 className="text-lg font-semibold text-center">
          Select a category to edit.
        </h2>
      </section>
    );
  }

  return (
    <section className="p-5 bg-gray-50 h-full overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="form py-1 p-1 md:p-8 md:py-1 "
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Edit Category</h3>
          {isFetching && <CircularProgress size={24} />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col w-full  md:w-[25%]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formFields.name}
              onChange={handleChange}
              className="w-full h-[44px] border border-gray-300 rounded-md px-3 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter category name"
              disabled={isFetching}
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent Category
            </label>
            <Select
              fullWidth
              name="parentId"
              value={formFields.parentId || ""}
              onChange={handleChange}
              displayEmpty
              disabled={isFetching}
            >
              <MenuItem value="">
                <em>No parent</em>
              </MenuItem>
              {categoryOptions.map((item) => (
                <MenuItem key={item?._id} value={item?._id}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category Images
          </label>

          <div className="flex flex-wrap gap-4">
            {images.map((img) => (
              <div
                key={img}
                className="relative w-[150px] h-[120px] rounded-md overflow-hidden border border-dashed border-gray-300 bg-gray-100"
              >
                <img
                  src={img}
                  alt="Category"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center shadow"
                  onClick={() => handleRemoveImage(img)}
                  disabled={isRemovingImg}
                >
                  <IoClose />
                </button>
              </div>
            ))}

            <UploadBox
              multiple
              name="images"
              url="/api/category/uploadImages"
              setPreviews={handleUploadComplete}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="outlined"
            onClick={() => context?.setIsOpenFullScreenPanel?.({ open: false })}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="!bg-blue-600 !text-white"
            disabled={isSaving || isFetching}
          >
            {isSaving ? <CircularProgress size={22} color="inherit" /> : "Save"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditCategory;


