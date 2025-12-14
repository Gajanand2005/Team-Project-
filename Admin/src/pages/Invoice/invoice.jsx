import React, { forwardRef } from 'react';

const Invoice = forwardRef(({ order }, ref) => {
  return (
    <div ref={ref} style={{ padding: "20px", fontFamily: "Arial", width: "300px" }}>
      <h2 style={{ textAlign: "center" }}>INVOICE</h2>

      <p><b>Order ID:</b> {order?._id}</p>
      <p><b>Customer:</b> {order?.userId?.name}</p>
      <p><b>Mobile:</b> {order?.userId?.mobile}</p>
      <p><b>Total Amount:</b> ₹{order?.totalAmt}</p>
      <p><b>Address:</b> {order?.delivery_address?.address_line1} {order?.delivery_address?.landmark}, {order?.delivery_address?.city}, {order?.delivery_address?.state} - {order?.delivery_address?.pincode}, {order?.delivery_address?.country}</p>
      <p><b>Order Date:</b> {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}</p>

      <h3>Products</h3>
      {order?.products?.map((item, index) => (
        <p key={item?._id || index}>{item?.productId?.name || item?.name} — {item?.quantity} × ₹{item?.price}</p>
      ))}

      <p style={{ marginTop: "20px" }}>Thank You!</p>
    </div>
  );
});

export default Invoice;


