import React from 'react'
import { SiWhatsapp } from "react-icons/si";
const Whataap = () => {
  return (
    <>
       <a
      href="https://wa.link/almeul"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SiWhatsapp size={28} />
    </a>
    </>
  )
}

export default Whataap
