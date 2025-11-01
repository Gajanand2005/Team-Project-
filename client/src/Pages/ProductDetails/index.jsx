import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductZoom from "../../components/ProductZoom";
import Button from "@mui/material/Button";

import { MyContext } from '../../App';
import TextField from "@mui/material/TextField";
import ProductSlider from "../../components/ProductSlider";
import ProductDetailsComponent from "../../components/ProductDetails";

const ProductDetails = () => {
  
  const [activeTab, setActiveTab] = useState(0);

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
        <div className="container flex gap-9">
          <div className="productZoomContainer w-[40%] ">
            <ProductZoom />
          </div>

          <div className="productContent w-[60%] pr-10 ">
            <ProductDetailsComponent/>
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
              Product Info
            </span>
            <span
              className={`link text-[17px] cursor-pointer font-[600] ${
                activeTab === 2 && "text-orange-600"
              }`}
              onClick={() => setActiveTab(2)}
            >
              Reviews (2)
            </span>
          </div>
          {activeTab == 0 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <p>
                Symbol of lightness and delicacy, the hummingbird evokes
                curiosity and joy. Studio Design' PolyFaune collection features
                classic products with colorful patterns, inspired by the
                traditional japanese origamis. To wear with a chino or jeans.
                The sublimation textile printing process provides an exceptional
                color rendering and a color, guaranteed overtime.
              </p>
              <h4 className="font-[600]">
                The standard Lorem Ipsum passage, used since the 1500
              </h4>
              <p>
                Fashion has been creating well-designed collections since 2010.
                The brand offers feminine designs delivering stylish separates
                and statement dresses which has since evolved into a full
                ready-to-wear collection in which every item is a vital part of
                a woman's wardrobe. The result? Cool, easy, chic looks with
                youthful elegance.
              </p>
              <h4 className="font-[600]">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text.
              </h4>
              <p>
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>
          )}

          {activeTab === 1 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-black ">
                  <thead class="text-xs text-black uppercase  ">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Stand Up
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Folded (w/o wheels)
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Folded (w/ wheels)
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Door Pass through
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b  dark:border-gray-700 border-gray-200 font-[600]">
                      <td class="px-6 py-4">
                        35″L x 24″W x 37-45″H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">32.5″L x 18.5″W x 16.5″H</td>
                      <td class="px-6 py-4">32.5″L x 24″W x 18.5″H</td>
                      <td class="px-6 py-4">24</td>
                    </tr>

                    <tr class="bg-white border-b  dark:border-gray-700 border-gray-200 font-[600]">
                      <td class="px-6 py-4">
                        35″L x 24″W x 37-45″H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">32.5″L x 18.5″W x 16.5″H</td>
                      <td class="px-6 py-4">32.5″L x 24″W x 18.5″H</td>
                      <td class="px-6 py-4">24</td>
                    </tr>

                    <tr class="bg-white border-b  dark:border-gray-700 border-gray-200 font-[600]">
                      <td class="px-6 py-4">
                        35″L x 24″W x 37-45″H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">32.5″L x 18.5″W x 16.5″H</td>
                      <td class="px-6 py-4">32.5″L x 24″W x 18.5″H</td>
                      <td class="px-6 py-4">24</td>
                    </tr>

                    <tr class="bg-white border-b  dark:border-gray-700 border-gray-200 font-[600]">
                      <td class="px-6 py-4">
                        35″L x 24″W x 37-45″H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">32.5″L x 18.5″W x 16.5″H</td>
                      <td class="px-6 py-4">32.5″L x 24″W x 18.5″H</td>
                      <td class="px-6 py-4">24</td>
                    </tr>

                    <tr class="bg-white border-b  dark:border-gray-700 border-gray-200 font-[600]">
                      <td class="px-6 py-4">
                        35″L x 24″W x 37-45″H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">32.5″L x 18.5″W x 16.5″H</td>
                      <td class="px-6 py-4">32.5″L x 24″W x 18.5″H</td>
                      <td class="px-6 py-4">24</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="shadow-md w-[80%] py-5 px-8 rounded-md">
              <div className="w-full productReviewContainer">
                <h2 className="font-[600] text-[19px] text-black">
                  Customer question & answer
                </h2>

                <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden !mt-4 pr-4">
                  <div className="review !mb-5 pt-4 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://imgs.search.brave.com/lnaRE9IMdyEfcSDzaCWjRy_6wyO2v42KeMtOeEEiNWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni81MDQ3LzUwNDc0/MjcucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs"
                          alt=""
                          className="w-full"
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[16px]">Gagan</h4>
                        <h5 className="text-[13px] !mb-0">2025-12-06</h5>
                        <p className="!mt-0 !mb-0">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Error ea, maiores eligendi veniam deserunt
                          corporis modi harum perspiciatis animi minus. Soluta
                          repellendus nobis cumque quia, ut atque labore
                          distinctio asperiores.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="review !mb-5 pt-4 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://imgs.search.brave.com/lnaRE9IMdyEfcSDzaCWjRy_6wyO2v42KeMtOeEEiNWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni81MDQ3LzUwNDc0/MjcucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs"
                          alt=""
                          className="w-full"
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[16px]">Gagan</h4>
                        <h5 className="text-[13px] !mb-0">2025-12-06</h5>
                        <p className="!mt-0 !mb-0">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Error ea, maiores eligendi veniam deserunt
                          corporis modi harum perspiciatis animi minus. Soluta
                          repellendus nobis cumque quia, ut atque labore
                          distinctio asperiores.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <br />

                <div className="reviewForm bg-[#f1f1f1] p-4 rounded-md">
                  <h2 className="text-[18px] font-[600] text-black ">
                    Add a Review{" "}
                  </h2>
                 <form action="" className="w-full !mt-5">
                   <TextField
                    id="outlined-multiline-flexible"
                    label="Write a Review..."
                    multiline
                    className="w-full"
                    rows={4}
                  />

                <div className="flex items-center !mt-5">
                  <Button className="!bg-orange-600 !text-white hover:!bg-gray-900 !rounded-2xl">Submit Review</Button>
                </div>
                
                 </form>
                </div>
              </div>
            </div>
          )}
        </div>

      <div className="container !mt-5 ">
        <h2 className="text-[20px] font-[600] !mb-0">Related Products</h2>
         <ProductSlider items={5} />
      </div>

      </section>
    </>
  );
};

export default ProductDetails;
