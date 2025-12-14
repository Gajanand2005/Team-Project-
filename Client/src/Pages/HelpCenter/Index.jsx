import React from 'react'
import { SiWhatsapp } from "react-icons/si";

const HelpCenter = () => {
  return (
    <>
    <div className='container w-[full] flex items-center justify-center flex-col my-10 px-4 !mt-10 !mb-10'>
            <h1>Help Center</h1>
      <p>If you have any questions, feel free to reach out to our support team.</p>
        <a
            href="https://wa.link/tgdh51"
            className=" bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiWhatsapp size={28} />
          </a>
    </div>
    </>
  )
}

export default HelpCenter


