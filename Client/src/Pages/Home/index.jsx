import React, { useContext, useEffect, useState } from "react";
import HomeSlider from "../../Components/HomeSlider/index.jsx";
import HomeCatSlider from "../../Components/HomeCatSlider/index.jsx";
import AdsBannerSlider from "../../Components/AdsBannerSlider/index.jsx";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { fetchDataFromApi } from "../../Utils/Api.js";
import { MyContext } from "../../App.jsx";
import ProductLoading from "../../Components/ProductLoading/Index.jsx";
import ProductSlider from "../../Components/ProductSlider/index.jsx";


const Home = () => {
  const [value, setValue] = React.useState(0);
  const [homeSlidesData, setHomeSlidesData] = useState([]);
  const [popularproductsData, setPopularProductsData] = useState([]);
  const [ProductData, setAllProductsData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      setAllProductsData(res?.data);
    });

    fetchDataFromApi("/api/homeSlides").then((res) => {
      setHomeSlidesData(res?.data);
    });
  }, []);

  useEffect(() => {
    if (context?.catData?.length > 0) {
      fetchDataFromApi(
        `/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`
      ).then((res) => {
        if (res?.error === false) {
          setPopularProductsData(res?.products);
        }
      });
    }
  }, [context?.catData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByCatId = (id) => {
    setPopularProductsData([])
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
      if (res?.error === false) {
        setPopularProductsData(res?.products);
      }
    });
  };

  return (
    <div>

      {context?.catData?.length !== 0 && (
        <HomeCatSlider data={context?.catData} />
      )}
      <div className="min-h-[2vh] lg:min-h-[65vh] relative">
      {homeSlidesData?.data?.length !== 0 && (
        <HomeSlider data={homeSlidesData} />
      )}
      </div>

    

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between lg:gap-4 gap-1">
            <div className="leftSec p-4 md:p-10 text-center md:text-left w-full md:w-auto mb-4 md:mb-0">
              <h2 className="text-[14px] sm:text-[12px] md:text-[22px] font-semibold leading-tight">
                Popular Products
              </h2>
              <p className="text-[13px] md:text-[14px] text-gray-600 mt-1 mb-0">
                SmalCouture Presents :
              </p>
            </div>

            <div className="rightSec w-full md:w-[57%]">
              <Box
                sx={{
                  maxWidth: { xs: 320, sm: 780 },
                  bgcolor: "background.paper",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  className="w-full"
                >
                  {context?.catData?.length !== 0 &&
                    context?.catData.map((cat, index) => {
                      return (
                        <Tab
                          key={cat?._id || index}
                          label={cat?.name}
                          className="!text-sm md:!text-base"
                          onClick={() => filterByCatId(cat?._id)}
                        />
                        // <Tab label={cat?.name} className="!text-sm md:!text-base" onClick={filterByCatId(cat?._id)} />
                      );
                    })}

                  {/* <Tab label="West Wear" className="!text-sm md:!text-base" />
        <Tab label="Co-Ords" className="!text-sm md:!text-base" /> */}
                </Tabs>
              </Box>
            </div>
          </div>
          
          {
            popularproductsData?.length===0 &&   <ProductLoading/>
          }

          {popularproductsData?.length !== 0 && (
            <ProductSlider items={5} data={popularproductsData} />
          )}
        </div>
      </section>

      <section className="py-16 bg-white  ">
        <div className="container">
          <AdsBannerSlider items={4} />
        </div>
      </section>
    </div>
  );
};

export default Home;




