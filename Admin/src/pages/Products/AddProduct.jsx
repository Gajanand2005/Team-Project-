import React, { useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadBox from "../../Components/UploadBox/Index";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import { deleteImages, fetchDataFromApi, postData } from "../../../Utils/Api";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const AddProduct = () => {
  const initialSizeChart = {
    S: { chest: '36–21', shoulder: '16.5–17', length: '26–27', sleeve: '7–8' },
    M: { chest: '38–40', shoulder: '17–17.5', length: '27–28', sleeve: '8–9' },
    L: { chest: '40–42', shoulder: '17.5–18', length: '28–29', sleeve: '9–10' },
    XL: { chest: '42–44', shoulder: '18–18.5', length: '29–30', sleeve: '10–11' },
    XXL: { chest: '44–46', shoulder: '18.5–19', length: '30–31', sleeve: '11–12' },
  };

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
  const [productSizeData, setProductSizeData] = useState([]);
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [sizes, setSizes] = useState(['S', 'M', 'L', 'XL', 'XXL']);
  const [fields, setFields] = useState(['chest', 'shoulder', 'length', 'sleeve']);
  const [newSize, setNewSize] = useState('');
  const [newField, setNewField] = useState('');
  const [sizeChart, setSizeChart] = useState(() => {
    const chart = {};
    ['S', 'M', 'L', 'XL', 'XXL'].forEach(size => {
      chart[size] = { ...initialSizeChart[size] };
    });
    return chart;
  });
  const [showSizeChartEditor, setShowSizeChartEditor] = useState(false);

  const history = useNavigate();
  const context = useContext(MyContext);

  // Fetch Size List
  useEffect(() => {
    fetchDataFromApi("/api/product/productSize/get").then((res) => {
      if (res?.error === false) {
        setProductSizeData(res?.data);
      }
    });
  }, []);

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId = event.target.value;
    formFields.category = event.target.value;
  };

  const selectDatByName = (name) => {
    formFields.catName = name;
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };

  const selectSubDatByName = (name) => {
    formFields.subCat = name;
  };

  const handleChangeProductThirdLavelCat = (event) => {
    setProductThirdLavelCat(event.target.value);
    formFields.thirdsubCatId = event.target.value;
  };

  const selectSubDatByThirdLavel = (name) => {
    formFields.thirdsubCat = name;
  };

  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
    formFields.isFeatured = event.target.value;
  };

  const handleChangeProductSize = (event) => {
    const {
      target: { value },
    } = event;
    setProductSize(typeof value === "string" ? value.split(",") : value);
    formFields.size = value;
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
    formFields.images = previewsArr;
  };

  const removeImg = (images, index) => {
    let imageArr = previews;
    deleteImages(`/api/product/deleteImage?img=${images}`).then((res) => {
      imageArr.splice(index, 1);
      setPreviews([...imageArr]);
      formFields.images = imageArr;
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

  const addSize = () => {
    if (newSize) {
      const newSizes = newSize.split(',').map(s => s.trim()).filter(s => s && !sizes.includes(s));
      if (newSizes.length > 0) {
        setSizes([...sizes, ...newSizes]);
        setSizeChart(prev => {
          const updated = { ...prev };
          newSizes.forEach(size => {
            updated[size] = fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
          });
          return updated;
        });
        setNewSize('');
      }
    }
  };

  const addField = () => {
    if (newField) {
      const newFields = newField.split(',').map(f => f.trim()).filter(f => f && !fields.includes(f));
      if (newFields.length > 0) {
        setFields([...fields, ...newFields]);
        setSizeChart(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(size => {
            newFields.forEach(field => {
              updated[size][field] = '';
            });
          });
          return updated;
        });
        setNewField('');
      }
    }
  };

  const removeSize = (sizeToRemove) => {
    if (sizes.length > 1) {
      setSizes(sizes.filter(s => s !== sizeToRemove));
      setSizeChart(prev => {
        const newChart = { ...prev };
        delete newChart[sizeToRemove];
        return newChart;
      });
    }
  };

  const removeField = (fieldToRemove) => {
    if (fields.length > 1) {
      setFields(fields.filter(f => f !== fieldToRemove));
      setSizeChart(prev => {
        const newChart = { ...prev };
        Object.keys(newChart).forEach(size => {
          delete newChart[size][fieldToRemove];
        });
        return newChart;
      });
    }
  };

  const addSizeChartToDescription = () => {
    const headers = ['Size', ...fields.map(f => `${f} (in)`)];
    const rows = sizes.map(size => [size, ...fields.map(field => sizeChart[size][field])]);

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

    if (formFields.name === "") {
      context.alertBox("error", "Please enter Product name");
      return;
    }
    // Removed validation for description to allow empty descriptions
    if (formFields.catId === "") {
      context.alertBox("error", "Please select product category");
      return;
    }
    if (formFields.price === "") {
      context.alertBox("error", "Please enter Product price");
      return;
    }
    if (formFields.oldPrice === "") {
      context.alertBox("error", "Please enter Product old price");
      return;
    }
    if (formFields.countInStock === "") {
      context.alertBox("error", "Please enter product stock");
      return;
    }
    if (formFields.brand === "") {
      context.alertBox("error", "Please enter Product brand");
      return;
    }
    if (formFields.discount === "") {
      context.alertBox("error", "Please enter Product discount");
      return;
    }
    if (previews.length === 0) {
      context.alertBox("error", "Please select product images");
      return;
    }

    setIsLoading(true);
    postData("/api/product/create", formFields).then((res) => {
      if (res?.error === false) {
        context.alertBox("success", res?.message);
        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({ open: false });
          history("/products");
        }, 1000);
      } else {
        setIsLoading(false);
        context.alertBox("error", res?.message);
      }
    });
  };

  return (
    <>
      <section className="p-4 md:p-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <form className="form bg-white p-4 md:p-6 rounded-lg shadow-sm" onSubmit={handleSubmit}>
            <div className="scroll max-h-[72vh] overflow-y-auto">
            <div className="grid grid-cols-1 mb-3">
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">Product Name</h3>
                <input
                  type="text"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.12)] rounded-md p-3 text-sm bg-[#fafafa]"
                  name="name"
                  value={formFields.name}
                  onChange={onChangeInput}
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="grid grid-cols-1 mb-3">
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">
                  Product Description
                </h3>
                <textarea
                  className="w-full h-[160px] border border-[rgba(0,0,0,0.2)] rounded-md p-3 text-sm bg-[#fafafa] font-mono"
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
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${fields.length + 2}, 1fr)`, gap: '8px' }} className="mb-3">
                      <div className="font-bold">Size</div>
                      {fields.map(f => <div key={f} className="font-bold flex items-center justify-between">{f} (in) <IoClose onClick={() => removeField(f)} className="cursor-pointer text-red-500 text-sm" /></div>)}
                      <div className="font-bold">Remove</div>
                    </div>
                    {sizes.map(size => (
                      <div key={size} style={{ display: 'grid', gridTemplateColumns: `repeat(${fields.length + 2}, 1fr)`, gap: '8px' }} className="mb-2">
                        <div className="font-semibold">{size}</div>
                        {fields.map(field => (
                          <input
                            key={field}
                            type="text"
                            value={sizeChart[size][field]}
                            onChange={(e) => handleSizeChartChange(size, field, e.target.value)}
                            className="border border-gray-300 rounded p-1 text-sm"
                          />
                        ))}
                        <Button onClick={() => removeSize(size)} className="!bg-red-500 !text-white !min-w-[30px] !h-[30px] !p-0">X</Button>
                      </div>
                    ))}
                    <h5 className="text-[14px] font-[500] mb-3 mt-4">Preview</h5>
                    <table style={{width:'100%', borderCollapse:'collapse', textAlign:'center', fontSize:'14px', border:'5px solid #333'}}>
                      <thead>
                        <tr style={{background:'#f8f8f8'}}>
                          <th style={{border:'5px solid #333', padding:'10px'}}>Size</th>
                          {fields.map(f => <th key={f} style={{border:'5px solid #333', padding:'10px'}}>{f} (in)</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {sizes.map(size => (
                          <tr key={size}>
                            <td style={{border:'5px solid #333', padding:'10px'}}>{size}</td>
                            {fields.map(field => <td key={field} style={{border:'5px solid #333', padding:'10px'}}>{sizeChart[size][field]}</td>)}
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
                    <div className="mt-4 flex gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="New Size(s) (e.g., XXXL, 2XL)"
                          value={newSize}
                          onChange={(e) => setNewSize(e.target.value)}
                          className="border border-gray-300 rounded p-1 text-sm mr-2"
                        />
                        <Button onClick={addSize} className="!bg-green-600 !text-white">Add Row</Button>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="New Measurement(s) (e.g., waist, hip, inseam)"
                          value={newField}
                          onChange={(e) => setNewField(e.target.value)}
                          className="border border-gray-300 rounded p-1 text-sm mr-2"
                        />
                        <Button onClick={addField} className="!bg-green-600 !text-white">Add Column</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CATEGORY SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-3 gap-4">
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">
                  Product Category
                </h3>
                {context?.catData.length !== 0 && (
                  <Select
                    className="w-full bg-[#fafafa]"
                    size="small"
                    value={productCat}
                    onChange={handleChangeProductCat}
                  >
                    {context?.catData.map((cat, index) => (
                      <MenuItem
                        key={cat?._id}
                        value={cat?._id}
                        onClick={() => selectDatByName(cat?.name)}
                      >
                        {cat?.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </div>

              {/* Sub Category */}
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">
                  Product Sub Category
                </h3>
                <Select
                  className="w-full bg-[#fafafa]"
                  size="small"
                  value={productSubCat}
                  onChange={handleChangeProductSubCat}
                >
                  {context?.catData.map(
                    (cat) =>
                      cat?.children?.length !== 0 &&
                      cat?.children.map((subCat) => (
                        <MenuItem
                          key={subCat._id}
                          value={subCat._id}
                          onClick={() => selectSubDatByName(subCat?.name)}
                        >
                          {subCat.name}
                        </MenuItem>
                      ))
                  )}
                </Select>
              </div>

              {/* Third Level */}
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">
                  Product Third Level Category
                </h3>
                <Select
                  className="w-full bg-[#fafafa]"
                  size="small"
                  value={productThirdLavelCat}
                  onChange={handleChangeProductThirdLavelCat}
                >
                  {context?.catData.map(
                    (cat) =>
                      cat?.children?.length !== 0 &&
                      cat?.children.map((subCat) =>
                        subCat?.children?.map((third) => (
                          <MenuItem
                            key={third._id}
                            value={third._id}
                            onClick={() =>
                              selectSubDatByThirdLavel(third?.name)
                            }
                          >
                            {third.name}
                          </MenuItem>
                        ))
                      )
                  )}
                </Select>
              </div>

              {/* Price */}
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">Product Price</h3>
                <input
                  type="number"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-md p-3 text-sm bg-[#fafafa]"
                  name="price"
                  value={formFields.price}
                  onChange={onChangeInput}
                />
              </div>

              {/* Old Price */}
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">
                  Product Old Price
                </h3>
                <input
                  type="number"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-md p-3 text-sm bg-[#fafafa]"
                  name="oldPrice"
                  value={formFields.oldPrice}
                  onChange={onChangeInput}
                />
              </div>

              {/* Featured */}
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">is Featured</h3>
                <Select
                  className="w-full bg-[#fafafa]"
                  size="small"
                  value={productFeatured}
                  onChange={handleChangeProductFeatured}
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </div>

              {/* Stock */}
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">Product Stock</h3>
                <input
                  type="number"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-md p-3 text-sm bg-[#fafafa]"
                  name="countInStock"
                  value={formFields.countInStock}
                  onChange={onChangeInput}
                />
              </div>

              {/* Brand */}
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">Product Brand</h3>
                <input
                  type="text"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-md p-3 text-sm bg-[#fafafa]"
                  name="brand"
                  value={formFields.brand}
                  onChange={onChangeInput}
                />
              </div>

              {/* Discount */}
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">
                  Product Discount
                </h3>
                <input
                  type="number"
                  className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-md p-3 text-sm bg-[#fafafa]"
                  name="discount"
                  value={formFields.discount}
                  onChange={onChangeInput}
                />
              </div>

              {/* Size */}
              <div className="col">
                <h3 className="text-[14px] font-[500] !mb-2">Product Size</h3>

                {productSizeData.length !== 0 && (
                  <Select
                    multiple
                    className="w-full bg-[#fafafa]"
                    size="small"
                    value={productSize}
                    onChange={handleChangeProductSize}
                  >
                    {productSizeData.map((item, index) => (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </div>
            </div>

            {/* IMAGES SECTION */}
            <div className="col w-full px-0 p-3">
              <h3 className="font-[600] text-[20px] mb-2">Media & Images</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {previews.length !== 0 &&
                  previews.map((images, index) => (
                    <div className="uploadBoxWrapper relative rounded-md overflow-hidden" key={index}>
                      <button type="button" className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center z-20" onClick={() => removeImg(images, index)}>
                        <IoClose className="text-[14px]" />
                      </button>

                      <div className="uploadBox border border-dashed border-[rgba(0,0,0,0.12)] rounded-md overflow-hidden h-[140px] w-full bg-gray-100">
                        <LazyLoadImage
                          className="w-full h-full object-cover"
                          src={images}
                          effect="blur"
                        />
                      </div>
                    </div>
                  ))}

                <div className="">
                  <UploadBox
                    multiple={true}
                    name="images"
                    url="/api/product/uploadImages"
                    setPreviews={setPreviewsFun}
                  />
                </div>
              </div>
            </div>
          </div>

            <hr />
            <div className="mt-4">
              <Button
                type="submit"
                className="!bg-blue-600 !text-white btn-lg w-full md:w-[250px] flex gap-4 justify-center"
              >
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
        </div>
      </section>
    </>
  );
};

export default AddProduct;


