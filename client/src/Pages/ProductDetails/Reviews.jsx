import Button from '@mui/material/Button'
import React, { useContext, useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import { fetchDataFromApi, postData } from '../../Utlis/Api';
import { MyContext } from '../../App';




const reviews = (props) => {

    const context = useContext(MyContext);

    const [reviews, setReviews]= useState({
          image: '',
          userName :'',
          review: '',
          userId: '',
          productId: ''
    });

    const [reviewsData, setReviewsData]= useState([])

    const onchangeInput=(e)=>{
         setReviews(()=>({
            ...reviews,
            review:e.target.value
        }))
    }

    useEffect(()=>{
        setReviews(()=>({
            ...reviews,
            image: context?.userData?.avatar,
            userName: context?.userData?.name,
            userId: context?.userData?._id,
            productId:props?.productId
        }))
         getReviews();
    },[context?.userData,props])

    const addReview=(e)=>{
        e.preventDefault();

        if(reviews?.review!==""){
            postData("/api/user/addReview", reviews).then((res)=>{
            if(res?.error===false){
                context.alertBox("success",res?.message);
                setReviews(()=>({
            ...reviews,
            review:'',
        }))

        getReviews();

            }else{
              context.alertBox("error",res?.message);
            }
        })
        }
        else{
          context.alertBox("error","Please add review");
        }
      
    }

    const getReviews=()=>{
      fetchDataFromApi(`/api/user/getReviews?productId=${props?.productId}`).then((res)=>{
         if(res?.error=== false){
          setReviewsData(res?.reviews)
          props.setReviewsCount(res?.reviews.length)
         }
      })
    }

  return (
    <>
     <div className="w-full productReviewContainer">
                <h2 className="font-[600] text-[19px] text-black">
                  Customer question & answer
                </h2>
                {
                  reviewsData?.length!==0 &&
                  
                <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden !mt-4 pr-4">
                  {
                    reviewsData?.map((review,index)=>{
                      return(
                        <div className="review !mb-5 pt-4 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between" key={index}>
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src={review?.image?.avatar || '/user.png'}
                          alt=""
                          className="w-full"
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[16px]">{review?.userName}</h4>
                        <h5 className="text-[13px] !mb-0">{review?.createdAt?.split("T")[0]}</h5>
                        <p className="!mt-0 !mb-0">
                          {review?.review}
                        </p>
                      </div>
                    </div>
                  </div>
                      )
                    })
                  }
                  
                  
                </div>


                }

                <br />

                <div className="reviewForm bg-[#f1f1f1] p-4 rounded-md">
                  <h2 className="text-[18px] font-[600] text-black ">
                    Add a Review{" "}
                  </h2>
                 <form action="" className="w-full !mt-5" onSubmit={addReview}>
                   <TextField
                    id="outlined-multiline-flexible"
                    label="Write a Review..."
                    multiline
                    onChange={onchangeInput}
                    name='review'
                    value={reviews.review}
                    className="w-full"
                    rows={4}
                  />

                <div className="flex items-center !mt-5">
                  <Button className="!bg-orange-600 !text-white hover:!bg-gray-900 !rounded-2xl" type='Submit'>Submit Review</Button>
                </div>
                
                 </form>
                </div>
              </div> 
    </>
  )
}

export default reviews
