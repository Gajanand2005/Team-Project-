import React, {forwardRef } from 'react'

const Invoice = forwardRef((props, ref) => {
  return (
    <div ref={ref} style={{ padding: "20px", fontFamily: "Arial", width: "300px" }}>
      <h2 style={{ textAlign: "center" }}>INVOICE</h2>

      <p><b>Order ID:</b> ORD12345</p>
      <p><b>Customer:</b> Rahul Sharma</p>
      <p><b>Mobile:</b> 9876543210</p>
      <p><b>Total Amount:</b> ₹1299</p>

      <h3>Products</h3>
      <p>T-shirt — 1 × ₹499</p>
      <p>Shoes — 1 × ₹800</p>

      <p style={{ marginTop: "20px" }}>Thank You!</p>
    </div>
  );
});

export default Invoice
