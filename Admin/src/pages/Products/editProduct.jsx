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
import { deleteImages, editData, fetchDataFromApi, postData } from "../../../Utils/Api";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const EditProduct = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    sizeChart: "",
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
    const [isLoading, setIsLoading] = useState(false);
  const [sizeChart, setSizeChart] = useState({
    S: { chest: '36–21', shoulder: '16.5–17', length: '26–27', sleeve: '7–8' },
    M: { chest: '38–40', shoulder: '17–17.5', length: '27–28', sleeve: '8–9' },
    L: { chest: '40–42', shoulder: '17.5–18', length: '28–29', sleeve: '9–10' },
    XL: { chest: '42–44', shoulder: '18–18.5', length: '29–30', sleeve: '10–11' },
    XXL: { chest: '44–46', shoulder: '18.5–19', length: '30–31', sleeve: '11–12' },
  });
  const [showSizeChartEditor, setShowSizeChartEditor] = useState(false);
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
    sizeChart: res?.product?.sizeChart,
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
    const value = event.target.value;
    setProductCat(value);
    setFormFields(prev => ({ ...prev, catId: value, category: value }));
  };

  const selectDatByName = (name) => {
    setFormFields(prev => ({ ...prev, catName: name }));
  };

  const handleChangeProductSubCat = (event) => {
    const value = event.target.value;
    setProductSubCat(value);
    setFormFields(prev => ({ ...prev, subCatId: value }));
  };

  const selectSubDatByName = (name) => {
    setFormFields(prev => ({ ...prev, subCat: name }));
  };

  const handleChangeProductThirdLavelCat = (event) => {
    const value = event.target.value;
    setProductThirdLavelCat(value);
    setFormFields(prev => ({ ...prev, thirdsubCatId: value }));
  };

  const selectSubDatByThirdLavel = (name) => {
    setFormFields(prev => ({ ...prev, thirdsubCat: name }));
  };



  const handleChangeProductFeatured = (event) => {
    const value = event.target.value;
    setProductFeatured(value);
    setFormFields(prev => ({ ...prev, isFeatured: value }));
  };

  const handleChangeProductSize = (event) => {
    const { target: { value } } = event;
    const newVal = typeof value === "string" ? value.split(",") : value;
    setProductSize(newVal);
    setFormFields(prev => ({ ...prev, size: newVal }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const setPreviewsFun = (previewsArr) => {
    const newPreviews = [...(previews || []), ...previewsArr];
    setPreviews(newPreviews);
    setFormFields(prev => ({ ...prev, images: newPreviews }));
  };

  const removeImg = (images, index) => {
    deleteImages(`/api/product/deleteImage?img=${encodeURIComponent(images)}`)
      .then(() => {
        const newArr = (previews || []).filter((_, i) => i !== index);
        setPreviews(newArr);
        setFormFields(prev => ({ ...prev, images: newArr }));
      })
      .catch(() => {
        const newArr = (previews || []).filter((_, i) => i !== index);
        setPreviews(newArr);
        setFormFields(prev => ({ ...prev, images: newArr }));
      });
  };

  const handleSizeChartChange = (size, field, value) => {
    setSizeChart(prev => ({
      ...prev,
      [size]: {
        ...prev[size],
        [field]: value
      }
    }));
  };

  const addSizeChartToDescription = () => {
    const headers = ['Size', 'Chest (in)', 'Shoulder (in)', 'Length (in)', 'Sleeve (in)'];
    const rows = Object.keys(sizeChart).map(size => [size, sizeChart[size].chest, sizeChart[size].shoulder, sizeChart[size].length, sizeChart[size].sleeve]);

    const colWidths = headers.map((header, i) => Math.max(header.length, ...rows.map(row => row[i].length)));

    const createRow = (cells) => '| ' + cells.map((cell, i) => cell.padEnd(colWidths[i])).join(' | ') + ' |';
    const separator = '+' + colWidths.map(w => '-'.repeat(w + 2)).join('+') + '+';

    const tableText = [
      separator,
      createRow(headers),
      separator,
      ...rows.map(row => createRow(row)),
      separator
    ].join('\n');

    setFormFields(prev => ({
      ...prev,
      sizeChart: tableText
    }));
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
    <section className="p-4 md:p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <form className="form bg-white p-4 md:p-6 rounded-lg shadow-sm" onSubmit={handleSubmit}>
          <div className="scroll max-h-[72vh] overflow-y-auto">
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
                  className="w-full h-[140px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa] font-mono"
                  name="description"
                  value={formFields.description}
                  onChange={onChangeInput}
                />
                {formFields.sizeChart && (
                  <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
                    <h4 className="text-[16px] font-[500] mb-2">Size Chart:</h4>
                    <pre className="whitespace-pre-wrap font-mono text-sm">{formFields.sizeChart}</pre>
                  </div>
                )}
                <Button
                  onClick={() => setShowSizeChartEditor(!showSizeChartEditor)}
                  className="!mt-2 !bg-gray-500 !text-white"
                >
                  {showSizeChartEditor ? 'Hide Size Chart Editor' : 'Show Size Chart Editor'}
                </Button>
                {showSizeChartEditor && (
                  <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white">
                    <h4 className="text-[16px] font-[500] mb-3">Edit Size Chart</h4>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      <div className="font-bold">Size</div>
                      <div className="font-bold">Chest (in)</div>
                      <div className="font-bold">Shoulder (in)</div>
                      <div className="font-bold">Length (in)</div>
                      <div className="font-bold">Sleeve (in)</div>
                    </div>
                    {Object.keys(sizeChart).map(size => (
                      <div key={size} className="grid grid-cols-5 gap-2 mb-2">
                        <div className="font-semibold">{size}</div>
                        <input
                          type="text"
                          value={sizeChart[size].chest}
                          onChange={(e) => handleSizeChartChange(size, 'chest', e.target.value)}
                          className="border border-gray-300 rounded p-1 text-sm"
                        />
                        <input
                          type="text"
                          value={sizeChart[size].shoulder}
                          onChange={(e) => handleSizeChartChange(size, 'shoulder', e.target.value)}
                          className="border border-gray-300 rounded p-1 text-sm"
                        />
                        <input
                          type="text"
                          value={sizeChart[size].length}
                          onChange={(e) => handleSizeChartChange(size, 'length', e.target.value)}
                          className="border border-gray-300 rounded p-1 text-sm"
                        />
                        <input
                          type="text"
                          value={sizeChart[size].sleeve}
                          onChange={(e) => handleSizeChartChange(size, 'sleeve', e.target.value)}
                          className="border border-gray-300 rounded p-1 text-sm"
                        />
                      </div>
                    ))}
                    <h5 className="text-[14px] font-[500] mb-3 mt-4">Preview</h5>
                    <table style={{width:'100%', borderCollapse:'collapse', textAlign:'center', fontSize:'14px', border:'5px solid #333'}}>
                      <thead>
                        <tr style={{background:'#f8f8f8'}}>
                          <th style={{border:'5px solid #333', padding:'10px'}}>Size</th>
                          <th style={{border:'5px solid #333', padding:'10px'}}>Chest (in)</th>
                          <th style={{border:'5px solid #333', padding:'10px'}}>Shoulder (in)</th>
                          <th style={{border:'5px solid #333', padding:'10px'}}>Length (in)</th>
                          <th style={{border:'5px solid #333', padding:'10px'}}>Sleeve (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(sizeChart).map(size => (
                          <tr key={size}>
                            <td style={{border:'5px solid #333', padding:'10px'}}>{size}</td>
                            <td style={{border:'5px solid #333', padding:'10px'}}>{sizeChart[size].chest}</td>
                            <td style={{border:'5px solid #333', padding:'10px'}}>{sizeChart[size].shoulder}</td>
                            <td style={{border:'5px solid #333', padding:'10px'}}>{sizeChart[size].length}</td>
                            <td style={{border:'5px solid #333', padding:'10px'}}>{sizeChart[size].sleeve}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Button
                      onClick={addSizeChartToDescription}
                      className="!mt-3 !bg-blue-600 !text-white"
                    >
                      Add Size Chart to Description
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {/* // Product Category Logic */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-3 gap-4">
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
            <div className="col w-full px-0 p-3">
              <h3 className="font-[600] text-[20px] mb-2">Media & Images</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {previews?.length !== 0 &&
                previews?.map((images, index) => {
                  return (
                    <div className="uploadBoxWrapper relative rounded-md overflow-hidden" key={index}>
                      <button type="button" className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center z-20" onClick={() => removeImg(images, index)}>
                        <IoClose className="text-[14px]" />
                      </button>

                      <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.12)] h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                        <LazyLoadImage
                          alt={"image"}
                          effect="blur"
                          className="w-full h-full object-cover"
                          src={images}
                        />
                      </div>
                    </div>
                  );
                })}

              <UploadBox
                setPreviews={setPreviewsFun}
                url="/api/product/uploadImages"
                multiple={true}
              />
            </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 pt-6 border-t">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              className="!flex !gap-2"
            >
              {isLoading ? <CircularProgress size={20} color="inherit" /> : "Update Product"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => context.setIsOpenFullScreenPanel({ open: false })}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProduct;


