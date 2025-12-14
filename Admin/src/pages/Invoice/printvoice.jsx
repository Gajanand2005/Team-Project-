import React, { useRef } from 'react';
import { RiPrinterFill } from "react-icons/ri";
import { Button } from '@mui/material';
import Invoice from './invoice';

const PrintVoice = ({ order }) => {
  const componentRef = useRef();

  const handlePrint = () => {
    const printContent = componentRef.current;
    const WindowPrt = window.open("", "", "width=900,height=700");

    WindowPrt.document.write(`
      <html>
        <head>
          <title>Invoice</title>

          <style>
            body {
              font-family: 'Poppins', sans-serif;
              padding: 30px;
              background: #f2f2f2;
            }

            .invoice-container {
              background: white;
              max-width: 850px;
              margin: auto;
              padding: 30px 40px;
              border-radius: 12px;
              border: 1px solid #e0e0e0;
              box-shadow: 0px 4px 20px rgba(0,0,0,0.12);
            }

            /* Header */
            .header {
              text-align: center;
              margin-bottom: 25px;
            }

            .header h1 {
              font-size: 32px;
              font-weight: 700;
              color: #333;
              letter-spacing: 1px;
              margin-bottom: 5px;
            }

            .header p {
              font-size: 14px;
              color: #777;
            }

            /* Table */
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              font-size: 14px;
            }

            table th {
              background: #4A90E2;
              color: white;
              padding: 12px;
              border: none;
              text-align: left;
            }

            table td {
              border-bottom: 1px solid #ddd;
              padding: 10px;
            }

            tr:nth-child(even) {
              background: #f7faff;
            }

            tr:hover {
              background: #eef5ff;
            }

            /* Totals */
            .total-box {
              margin-top: 25px;
              text-align: right;
              font-size: 18px;
              font-weight: 600;
              color: #333;
            }

            /* Footer */
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 13px;
              color: #777;
              border-top: 1px solid #ddd;
              padding-top: 10px;
            }
          </style>
        </head>

        <body>
          <div class="invoice-container">
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);

    WindowPrt.document.close();
    WindowPrt.focus();

    setTimeout(() => {
      WindowPrt.print();
    }, 600);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <Invoice order={order} />
        </div>
      </div>

      <Button onClick={handlePrint} >
        <RiPrinterFill className='text-[20px] text-orange-600'size='30'  />
      </Button>
    </div>
  );
};

export default PrintVoice;


