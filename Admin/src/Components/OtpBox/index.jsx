import React, { useState } from "react";

const OtpBox = ({ length, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };
  return (
    <>
      <div
        style={{ display: "flex", gap: "5px", justifyContent: "center" }}
        className="otpBox"
      >
        {otp.map((data, index) => (
          <input
            type="text"
            key={index}
            id={`otp-input-${index}`}
            maxLength="1"
            value={otp[index]}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              width: "45px",
              height: "45px",
              textAlign: "center",
              fontSize: "17px",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default OtpBox;


