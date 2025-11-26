import React, { useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadBox from "../../Components/UploadBox/Index";
import { IoIosImages } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import { deleteImages, editData, fetchDataFromApi, postData } from "../../Utlis/Api";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const EditProduct = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    category: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCat: "",
    thirdsubCat: "",
    thirdsubCatId: "",
    countInStock: "",
    isFeatured: false,
    discount: "",
    size: [],
  });

  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productFeatured, setProductFeatured] = useState("");
  const [productSize, setProductSize] = useState([]);
   const [productSizeData, setProductSizeData] = useState([])
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
  const [previews, setPreviews] = useState([]);
    const [isLoading, setIsLoading] = useState();
  const history = useNavigate();

  const context = useContext(MyContext);

 

 useEffect(()=>{

   fetchDataFromApi("/api/product/productSize/get").then((res)=>{
      if(res?.error===false){
        setProductSizeData(res?.data);
      }
     })

  if(context?.isOpenFullScreenPanel?.id){
    fetchDataFromApi(`/api/product/${ context?.isOpenFullScreenPanel?.id}`).then((res)=>{
    setFormFields({ 
  name: res?.product?.name, 
  description: res?.product?.description, 
  images: res?.product?.images, 
  brand: res?.product?.brand, 
  price: res?.product?.price, 
  oldPrice: res?.product?.oldPrice, 
  category: res?.product?.category, 
  catName: res?.product?.catName, 
  catId: res?.product?.catId, 
  subCatId: res?.product?.subCatId, 
  subCat: res?.product?.subCat, 
  thirdsubCat: res?.product?.thirdsubCat, 
  thirdsubCatId: res?.product?.thirdsubCatId, 
  countInStock: res?.product?.countInStock, 
  isFeatured: res?.product?.isFeatured, 
  discount: res?.product?.discount, 
  size: res?.product?.size, 
})

  setProductCat(res?.product?.catId);
setProductSubCat(res?.product?.subCatId);
setProductThirdLavelCat(res?.product?.thirdsubCatId);
setProductFeatured(res?.product?.isFeatured)
setProductSize(res?.product?.size)

setPreviews(res?.product?.images)
    })
  }
 }, [context?.isOpenFullScreenPanel?.id])
 

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId = event.target.value;
     formFields.category = event.target.value;
  };
  const selectDatByName =(name)=> {
   
  formFields.catName = name;
  }

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };

 const selectSubDatByName =(name)=> {
   
  formFields.subCat = name;
  }

const handleChangeProductThirdLavelCat =(event)=> {
  setProductThirdLavelCat(event.target.value);
    formFields.thirdsubCatId = event.target.value;
}
 const selectSubDatByThirdLavel =(name)=> {
  formFields.thirdsubCat = name;
  }



  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
    formFields.isFeatured=event.target.value
  };

  const handleChangeProductSize = (event) => {
    const {target:{value}} = event;
    setProductSize(
      typeof value === "string" ? value.split(","):value
    );
    formFields.size= value;
  };

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
    // setPreviews(previewsArr);
    // formFields.images = previewsArr;


    const imgArr = previews;
    for(let i=0; i<previewsArr.length;i++){
      imgArr.push(previewsArr[i])
    }
    setPreviews([]);
    setTimeout(() => {
      setPreviews(imgArr)
      formFields.images= imgArr;
    }, 10);
  };

  const removeImg = (images, index) => {
    var imageArr = [];
    imageArr = previews;
    deleteImages(`/api/product/deleteImage?img=${images}`).then((res) => {
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

  if(formFields.name == ""){
    context.alertBox("error","Please enter Product name");
    return false;
  }

  
  if(formFields.description == ""){
    context.alertBox("error","Please enter Product description");
    return false;
  }

   if(formFields.catId == ""){
    context.alertBox("error","Please select product category");
    return false;
  }

    if(formFields.price == ""){
    context.alertBox("error","Please enter Product price");
    return false;
  }

  if(formFields.oldPrice == ""){
    context.alertBox("error","Please enter Product oldPrice");
    return false;
  }

    if(formFields.countInStock == ""){
    context.alertBox("error","Please enter  product stock");
    return false;
  }
  
    
  if(formFields.brand == ""){
    context.alertBox("error","Please enter Product brand");
    return false;
  }


 

  if(formFields.discount == ""){
    context.alertBox("error","Please enter Product discount");
    return false;
  }

      
  if(previews?.length === 0){
    context.alertBox("error","Please select product images ");
    return false;
  }


  setIsLoading(true);
  editData(`/api/product/updateProduct/${context?.isOpenFullScreenPanel?.id}`, formFields).then((res) => {
    if (res?.error === false) {
      context.alertBox("success", res?.data?.message);

      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        history("/products");
      }, 1000);
    }else{
      setIsLoading(false)
      context.alertBox("error",res?.data?.message);
    }
  });
};


  return (
    <>
      <section className="p-5 bg-gray-50 ">
        <form className="form py-3 p-8 " onSubmit={handleSubmit}>
          <div className="scroll max-h-72vh] overflow-y-scroll">
            <div className="grid grid-cols-1 mb-3">
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">Product Name</h3>
                <input
                  type="text"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
                  name="name"
                  value={formFields.name}
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 mb-3 ">
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">
                  Product Description
                </h3>
                <textarea
                  type="text"
                  className="w-full h-[140px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
                  name="description"
                  value={formFields.description}
                  onChange={onChangeInput}
                />
              </div>
            </div>
            {/* // Product Category Logic */}
            <div className="grid grid-cols-4 mb-3 gap-4">
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">
                  Product Category
                </h3>

                {context?.catData.length !== 0 && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    className="w-full bg-[#fafafa]"
                    size="small"
                    value={productCat}
                    label="Category"
                    onChange={handleChangeProductCat}
                  >
                    {context?.catData.map((cat, index) => {
                      return <MenuItem value={cat?._id} key={index} onClick={()=>selectDatByName(cat?.name)}  >{cat?.name}</MenuItem>;
                    })}
                  </Select>
                )}
              </div>
              {/* Sub Category Logic */}
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">
                  Product Sub Category
                </h3>
                {context?.catData.length !== 0 && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    className="w-full bg-[#fafafa]"
                    size="small"
                    value={productSubCat}
                    label="Category"
                    onChange={handleChangeProductSubCat}
                  >
                    {context?.catData.map(
                      (cat, index) =>
                        cat?.children.length !== 0 &&
                        cat?.children.map((subCat, subIndex) => (
                          <MenuItem key={subCat._id} value={subCat._id}   onClick={()=>selectSubDatByName(cat?.name)}  >
                            {subCat.name}
                          </MenuItem>
                        ))
                    )}
                  </Select>
                )}
              </div>


               {/* Third Level Category Logic
 */}

              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">
                  Product Third Level Category
                </h3>
                {context?.catData.length !== 0 && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    className="w-full bg-[#fafafa]"
                    size="small"
                    value={productThirdLavelCat}
                    label="Category"
                    onChange={handleChangeProductThirdLavelCat}
                  >
                    {context?.catData.map(
                      (cat, index) =>
                        cat?.children.length !== 0 &&
                        cat?.children.map((subCat, subIndex) => (
                          subCat?.children?.length!==0  &&  subCat?.children?.map((thirdLavelCat,index)=>{
                            return  <MenuItem key={thirdLavelCat._id} value={thirdLavelCat._id} onClick={()=>selectSubDatByThirdLavel(thirdLavelCat.name)}    >
                            {thirdLavelCat.name}
                          </MenuItem>
                          })
                         
                        ))
                    )}
                  </Select>
                )}
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">Product Price</h3>
                <input
                  type="number"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] bg-[#fafafa]"
                  name="price"
                  value={formFields.price}
                  onChange={onChangeInput}
                />
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">
                  Product Old Price
                </h3>
                <input
                  type="number"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] bg-[#fafafa]"
                  name="oldPrice"
                  value={formFields.oldPrice}
                  onChange={onChangeInput}
                />
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">Is Featured</h3>
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  className="w-full bg-[#fafafa]"
                  size="small"
                  value={productFeatured}
                  label="Category"
                  onChange={handleChangeProductFeatured}
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">Product Stock</h3>
                <input
                  type="number"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] bg-[#fafafa]"
                  name="countInStock"
                  value={formFields.countInStock}
                  onChange={onChangeInput}
                />
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">Product Brand</h3>
                <input
                  type="text"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] bg-[#fafafa]"
                  name="brand"
                  value={formFields.brand}
                  onChange={onChangeInput}
                />
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">
                  Product Discount
                </h3>
                <input
                  type="number"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] bg-[#fafafa]"
                  name="discount"
                  value={formFields.discount}
                  onChange={onChangeInput}
                />
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">Product Size </h3>
                {
                  productSizeData ?.length!==0 &&   <Select
                multiple
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  className="w-full bg-[#fafafa]"
                  size="small"
                  value={productSize}
                  label="Category"
                  onChange={handleChangeProductSize}
                >
                  {
                    productSizeData?.map((item, index)=>{
                      return<MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                    })
                  }
                  
                  
                
                </Select>
                }
               
              </div>
            </div>
            <div className="col w-full px-0 p-5">
              <h3 className="font-[600] text-[22px] mb-2">Media & Images</h3>

              <div className="grid grid-cols-7 gap-20 ">
              {previews?.length !== 0 &&
                previews?.map((images, index) => {
                  return (
                    <div className="uploadBoxWrapper relative" key={index}>
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
                url="/api/product/uploadImages"
                setPreviews={setPreviewsFun}
              />
            </div>
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

export default EditProduct;
