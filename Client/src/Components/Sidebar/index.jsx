import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../Sidebar/style.css";
import { Collapse } from "react-collapse";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { MyContext } from "../../App";
import { useLocation } from "react-router-dom";
import { postData } from "../../Utils/Api";

export const Sidebar = (props) => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter]= useState(true);
   const [isOpenAvailFilter, setIsOpenAvailFilter]= useState(true);
   const [isOpenSizeFilter, setIsOpenSizeFilter]= useState(true);

  const[filters,setFilters]=useState({
    catId: [],
    subCatId: [],
    thirdsubCatId: [],
    availability: [],
    size: [],
    minPrice:"",
    maxPrice:"",
    page:1,
    limit:25
  })


const [price,setPrice]=useState([0,5000])

const availOptions = ["Available", "In Stock", "Not Available"];
const sizeOptions = ["XS", "S", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

const context = useContext(MyContext)

const location = useLocation();

const  handleCheckboxChange =(field,value)=>{

context?.setSearchData([]);

const currentValues = filters[field] || []
const updatedValues = currentValues?.includes(value) ?
currentValues.filter((item)=> item !== value):[...currentValues,value];

setFilters((prev)=>({
  ...prev,
  [field]:updatedValues
}))

if (field === "catId") {
  setFilters(prev => ({
    ...prev,
    catId: updatedValues,
    subCatId: [],
    thirdsubCatId: [],
    page: 1
  }));
  return;
}

}


const filterData =()=>{
  props.setIsLoading(true);

  // Check if URL has search query
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  if(searchQuery && context?.searchData?.products?.length > 0){
    props.setProductData(context?.searchData); 
    props.setIsLoading(false);
    props.setTotalPages(context?.searchData?.totalPages)
    window.scrollTo(0,0) 
  } else if(context?.searchData?.products?.length > 0){
    props.setProductData(context?.searchData); 
    props.setIsLoading(false);
    props.setTotalPages(context?.searchData?.totalPages)
    window.scrollTo(0,0) 
  } else {
    postData(`/api/product/filters`,filters).then((res)=>{
      props.setProductData(res);  
      props.setIsLoading(false);
      props.setTotalPages(res?.totalPages)
      window.scrollTo(0,0)
    })
  }
}


// const filterData = () => {
//   props.setIsLoading(true);

//   // If mode is search → call search API
//   if (context?.searchText && context?.searchText !== "") {
//     postData(`/api/product/search/get`, {
//       query: context?.searchText,
//       page: props.page,
//       limit: 25
//     }).then((res) => {
//       props.setProductData(res);
//       props.setIsLoading(false);
//       props.setTotalPages(res?.totalPages);
//       window.scrollTo(0, 0);
//     });
//     return;
//   }

//   // Otherwise → normal filter API
//   postData(`/api/product/filters`, filters).then((res) => {
//     props.setProductData(res);
//     props.setIsLoading(false);
//     props.setTotalPages(res?.totalPages);
//     window.scrollTo(0, 0);
//   });
// };



useEffect(() => {

const url = window.location.href;
const queryParameters = new URLSearchParams(location.search);
if(url.includes ("catId")){
  const categoryId = queryParameters.get("catId");
  const catArr=[];
  catArr.push(categoryId);
  filters.catId=catArr;
  filters.subCatId =[];
  filters.thirdsubCatId=[];
}


if(url.includes ("subCatId")){
  const subcategoryId = queryParameters.get("subCatId");
  const subcatArr=[];
  subcatArr.push(subcategoryId);
  filters.subCatId=subcatArr;
  filters.catId =[];
  filters.thirdsubCatId=[];
}


if(url.includes ("thirdsubCatId")){
  const thirdsubcategoryId = queryParameters.get("thirdsubCatId");
  const thirdsubcatArr=[];
  thirdsubcatArr.push(thirdsubcategoryId);
  filters.thirdsubCatId=thirdsubcatArr;
  filters.catId =[];
  filters.subCatId=[];
}
filters.page = 1

filters.page= 1;

setTimeout(() => {
  filterData()
}, 200);


context?.setSearchData([])
}, [location])


useEffect(() => {
  filters.page = props.page;
 filterData();
}, [filters,props.page])


useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        minPrice: price[0],
        maxPrice: price[1],
      }));


    }, 700);

    return () => clearTimeout(timer);
  }, [price]);



  return (
    <aside className="sidebar py-5 !sticky !top-[120px] !z-[50] ">
      <div className="box mt-3">
        <h3 className="mb-3 w-full text-[16px] font-[600] flex items-center pr-5 ">
          Shop by Categories
          <Button className=" !text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto" onClick={()=>setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
            {
              isOpenCategoryFilter===true ? <FaAngleUp /> :   <FaAngleDown />
            }
          
            
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll px-4 relative -left-[13px] ">

            {
              context?.catData?.length !==0 && context?.catData?.map((item,index)=>{
                  return(
                     <FormControlLabel
                   key={index}
                   value={item?._id}
              control={<Checkbox/>}
              checked={filters?.catId?.includes(item?._id)}
              label={item?.name}
              className="w-full"
              onChange={()=>handleCheckboxChange('catId', item?._id)}
            />
                  )
              })
            }
           
          </div>
        </Collapse>
      </div>

  

    
         <div className="box mt-4">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5 pb-3">
          Filter By Price
        </h3>
        <RangeSlider
         className="mt-3" 
         value={price}
         onInput={setPrice}
         min={100}
         max={5000}
         step={5}
         />
        <div className="flex justify-between pt-4 pb-2 priceRange">
          <span>
            From: <strong className="text-dark">Rs. {price[0]}</strong>
          </span>
          <span>
            To: <strong className="text-dark">Rs. {price[1]}</strong>
          </span>
        </div>
      </div>

    

    </aside>
  );
};

export default Sidebar;


