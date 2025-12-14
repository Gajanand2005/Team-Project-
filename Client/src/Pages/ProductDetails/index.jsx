import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductZoom from "../../Components/ProductZoom/index.jsx";
import Reviews from "../../Pages/ProductDetails/Reviews.jsx";
import ProductSlider from "../../Components/ProductSlider/index.jsx";
import ProductDetailsComponent from "../../Components/ProductDetails/index.jsx";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../Utils/Api";
import CircularProgress from "@mui/material/CircularProgress";

const ProductDetails = () => {

  const [activeTab, setActiveTab] = useState(0);
  const [productData, setProductData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [relatedProductData, setRelatedProductData]=useState([]);
  const { id } = useParams();

  useEffect(() => {
    if(id){
      fetchDataFromApi(`/api/user/getReviews?productId=${id}`).then((res) => {
        if (res?.error === false) {
          setReviewsCount(res?.reviews?.length || 0);
        }
      }).catch((err) => {
        console.error("Error fetching reviews:", err);
        setReviewsCount(0);
      });
    }
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setProductData(res?.product);

        fetchDataFromApi(`/api/product/getAllProductsByCatId/${res?.product?.catId}`).then((res)=>{
          if(res?.error===false){
            const filteredData = res?.products?.filter((item)=> item._id !== id);
            setRelatedProductData(filteredData)
          }
        })

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } else {
        setError(res?.message || "Product not found");
        setIsLoading(false);
      }
    });


  }, [id]);

  return (
    <>
      <div className="py-5">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition"
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition"
            >
              Fashion
            </Link>
            <Link underline="hover" color="inherit" className="link transition">
              Cropped Satin Bomber jacket
            </Link>
          </Breadcrumbs>
        </div>
      </div>

      <section className="bg-white py-5">
        {isLoading === true ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <CircularProgress color="inherit" />
          </div>
        ) : error ? (
          <div className="container flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <h2 className="text-[24px] font-[600] text-red-600 mb-4">Product Not Found</h2>
              <p className="text-[16px] text-gray-600">{error}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="container flex flex-col lg:flex-row gap-3 lg:gap-9 items-start lg:items-center ">
              <div className="productZoomContainer w-full lg:w-[40%] ">
                <ProductZoom images={productData?.images} />
              </div>

              <div className="productContent w-full lg:w-[60%] pr-10 ">
                <ProductDetailsComponent item={productData} />
              </div>
            </div>

            <div className="container !mt-8">
              <div className="flex items-center gap-8 !mb-5">
                <span
                  className={`link text-[17px] cursor-pointer font-[600] ${
                    activeTab === 0 && "text-orange-600"
                  }`}
                  onClick={() => setActiveTab(0)}
                >
                  Description
                </span>

                <span
                  className={`link text-[17px] cursor-pointer font-[600] ${
                    activeTab === 1 && "text-orange-600"
                  }`}
                  onClick={() => setActiveTab(1)}
                >
                  Reviews ({reviewsCount})
                </span>
              </div>
              {activeTab == 0 && (
                <div className="shadow-md w-full py-3 sm:py-5 px-3 sm:px-6 md:px-8 rounded-md">
                  <div className="text-sm sm:text-base leading-relaxed">
                    {productData?.description}
                  </div>
                  {productData?.sizeChart && (
                    <div className="mt-4 sm:mt-6">
                      <h3 className="text-[16px] sm:text-[18px] font-[600] mb-2 sm:mb-3">Size Chart</h3>
                      <div className="overflow-x-auto -mx-3 sm:mx-0">
                        <pre className="whitespace-pre font-mono text-[10px] sm:text-xs md:text-sm bg-gray-50 p-2 sm:p-4 rounded border min-w-max sm:min-w-0">
                          {productData.sizeChart}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}


              {activeTab === 1 && (
                <div className="shadow-none lg:shadow-md w-full sm:w-[80%] py-0 lg:py-5 px-0 lg:px-8 rounded-md">
                  {productData?.length !== 0 && (
                    <Reviews
                      productId={productData?._id}
                      setReviewsCount={setReviewsCount}
                    />
                  )}
                </div>
              )}
            </div>
            {
              relatedProductData?.length!==0 &&
              <div className="container !mt-5 ">
              <h2 className="text-[20px] font-[600] !mb-0">Related Products</h2>
              <ProductSlider items={5} data={relatedProductData} />
            </div>
            }


          </>
        )}
      </section>
    </>
  );
};

export default ProductDetails;


