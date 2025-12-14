import Button from '@mui/material/Button'
import React, { useContext, useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import { fetchDataFromApi, postData } from '../../Utils/Api';
import { MyContext } from '../../App';

const Reviews = (props) => {

  const context = useContext(MyContext);

  const [reviewForm, setReviewForm] = useState({
    image: '',
    userName: '',
    review: '',
    userId: '',
    productId: ''
  });

  const [reviewsData, setReviewsData] = useState([]);

  const onchangeInput = (e) => {
    setReviewForm(prev => ({
      ...prev,
      review: e.target.value
    }));
  };

  useEffect(() => {
    setReviewForm(prev => ({
      ...prev,
      image: context?.userData?.avatar,
      userName: context?.userData?.name,
      userId: context?.userData?._id,
      productId: props?.productId
    }));

    getReviews();
  }, [context?.userData, props?.productId]);

  const addReview = (e) => {
    e.preventDefault();

    if (reviewForm?.review !== "") {
      postData("/api/user/addReview", reviewForm).then((res) => {
        if (res?.error === false) {

          context.alertBox("success", res?.message);

          setReviewForm(prev => ({
            ...prev,
            review: '',
          }));

          getReviews();

        } else {
          context.alertBox("error", res?.message);
        }
      });
    } else {
      context.alertBox("error", "Please add review");
    }
  };

  const getReviews = () => {
    if (!props?.productId) return;

    fetchDataFromApi(`/api/user/getReviews?productId=${props?.productId}`)
      .then((res) => {
        if (res?.error === false) {
          setReviewsData(res?.reviews || []);
          props.setReviewsCount(res?.reviews?.length || 0);
        }
      })
      .catch(() => {
        setReviewsData([]);
        props.setReviewsCount(0);
      });
  };

  return (
    <>
      <div className="w-full productReviewContainer">
        <h2 className="font-[600] text-[16px] lg:text-[19px] text-black">
          Customer question & answer
        </h2>

        {reviewsData?.length !== 0 && (
          <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-4 pr-4">
            {reviewsData?.map((review, index) => (
              <div
                className="review mb-5 pt-4 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between"
                key={index}
              >
                <div className="info w-[60%] flex items-center gap-3">
                  <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                    <img
                      src={review?.image || '/user.png'}
                      alt=""
                      className="w-full"
                    />
                  </div>

                  <div className="w-[80%]">
                    <h4 className="text-[16px]">{review?.userName}</h4>
                    <h5 className="text-[13px] mb-0">
                      {review?.createdAt?.split("T")[0]}
                    </h5>
                    <p className="mt-0 mb-0">{review?.review}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <br />

        <div className="reviewForm bg-[#f1f1f1] p-4 rounded-lg mt-5 w-full">

<h2 className="text-[17px] md:text-[19px] font-semibold text-black mb-3">
  Add a Review
</h2>

<form onSubmit={addReview} className="flex flex-col gap-5">

  {/* Text Area */}
  <TextField
    label="Write a Review..."
    multiline
    rows={4}
    onChange={onchangeInput}
    name="review"
    value={reviewForm.review}
    className="w-full"
    sx={{
      width: "100%",
      "& .MuiInputBase-root": {
        borderRadius: "10px",
        padding: "8px",
        fontSize: "15px",
      },
      "& .MuiInputLabel-root": {
        fontSize: "14px",
      },
    }}
  />

  {/* Button Section */}
  <div className="flex w-full justify-center md:justify-start">
    <Button
      type="submit"
      className="!bg-orange-600 !text-white !rounded-xl !px-6 !py-2 
                 hover:!bg-gray-900 text-[14px] md:text-[16px]"
    >
      Submit Review
    </Button>
  </div>

</form>
</div>


      </div>
    </>
  );
};

export default Reviews;


