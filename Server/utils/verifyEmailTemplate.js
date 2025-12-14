// const VerificationEmail = (username, otp) => {
//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Email verification</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             background-color: #f4f4f4;
//             color: #333;
//         }
//         .container {
//             max-width: 600px;
//             margin: 20px auto;
//             background: #fff;
//             padding: 20px;
//             border-radius: 8px;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//         }
//         .header {
//             text-align: center;
//             border-bottom: 1px solid #eee;
//             padding-bottom: 10px;
//             margin-bottom: 20px;
//         }
//         .header h1 {
//             color: #4CAF50;
//         }
//         .content {
//             text-align: center;
//         }
//         .content p {
//             font-size: 16px;
//             line-height: 1.5;
//         }
//         .otp {
//             font-size: 20px;
//             font-weight: bold;
//             color: #4CAF50;
//             margin: 20px 0;
//         }
//         .footer {
//             text-align: center;
//             font-size: 14px;
//             color: #777;
//             margin-top: 20px;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <div class="header">
//             <h1>Verify Your Email Address</h1>
//         </div>
//         <div class="content">
//             <p>Thank you for registering with us. Please use the OTP below to verify your email address:</p>
//             <div class="otp">${otp}</div>
//             <p>If you didn't create an account, you can safely ignore this email.</p>
//         </div>
//         <div class="footer">
//             <p>&copy; 2025 smalcouture, All rights reserved.</p>
//         </div>
//     </div>
// </body>
// </html>`;
// };

// export default VerificationEmail;


const VerificationEmail = (username, otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8f9fb;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.07);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #000000, #4CAF50);
      padding: 25px 20px;
      text-align: center;
      color: #ffffff;
    }
    .header img {
      width: 80px;
      margin-bottom: 10px;
    }
    .header h1 {
      font-size: 24px;
      margin: 0;
      letter-spacing: 1px;
    }
    .content {
      padding: 25px 30px;
      text-align: center;
    }
    .content h2 {
      color: #222;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      color: #555;
      margin-bottom: 25px;
    }
    .otp-box {
      display: inline-block;
      background: #f0fff4;
      border: 1px dashed #4CAF50;
      border-radius: 8px;
      padding: 14px 28px;
      font-size: 22px;
      letter-spacing: 3px;
      color: #2e7d32;
      font-weight: bold;
      margin-bottom: 25px;
    }
    .verify-btn {
      display: inline-block;
      background: #4CAF50;
      color: #fff !important;
      padding: 12px 30px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.3s ease;
    }
    .verify-btn:hover {
      background: #43a047;
    }
    .product-section {
      margin-top: 35px;
      background-color: #fafafa;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
    }
    .product-section img {
      max-width: 180px;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #777;
      padding: 20px;
      border-top: 1px solid #eee;
      background-color: #f9f9f9;
    }
    .footer a {
      color: #4CAF50;
      text-decoration: none;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
     <img src="https://res.cloudinary.com/dot11b5tl/image/upload/v1761731269/logo_hg4t21.png" alt="logo" border="0" />
      <h1>Welcome to SMALCOUTURE</h1>
    </div>

    <div class="content">
      <h2>Hi ${username},</h2>
      <p>Thank you for joining <b>SMALCOUTURE</b>! To complete your registration, please verify your email address using the OTP below:</p>
      <div class="otp-box">${otp}</div>
      <p>This OTP will expire in <b>10 minutes</b>. Please do not share it with anyone.</p>
      <a href="https://smalcouture.com/verify-email" class="verify-btn">Verify My Email</a> 
      <div class="product-section">
        <p>While you’re here, check out our latest arrivals 👇</p>
        <a href="https://clothing-seven-gamma.vercel.app/">
          <img src="https://res.cloudinary.com/dot11b5tl/image/upload/v1761731472/suit_o6sszh.png" alt="Product Preview" />
        </a>
        <p><a href="https://clothing-seven-gamma.vercel.app/" style="color:#4CAF50;text-decoration:none;font-weight:bold;">View Product</a></p>
      </div>

      <p style="margin-top:30px;">If you didn’t sign up for an account, you can safely ignore this email.</p>
    </div>

    <div class="footer">
      <p>&copy; 2025 <a href="https://smalcouture.com">SMALCOUTURE</a>. All Rights Reserved.</p>
      <p>Follow us on 
        <a href="https://instagram.com/smalcouture">Instagram</a> | 
        <a href="https://facebook.com/smalcouture">Facebook</a>
      </p>
    </div>
  </div>
</body>
</html>`;
};

export default VerificationEmail;

