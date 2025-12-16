import React from 'react'

const Delivery = () => {
  return (
    <>
     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-20 overflow-hidden">
            {/* simple animated truck */}
            <svg viewBox="0 0 200 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <g className="truck-body" style={{transformOrigin: '50% 50%'}}>
                <rect x="6" y="34" width="120" height="46" rx="6" fill="#ff3c6a" />
                <rect x="114" y="46" width="64" height="34" rx="6" fill="#ff7aa0" />
                <rect x="20" y="44" width="30" height="20" rx="3" fill="#fff" opacity="0.9" />
                <circle cx="50" cy="86" r="10" fill="#333" />
                <circle cx="150" cy="86" r="10" fill="#333" />
              </g>
            </svg>
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-gray-800">🚚 Shipping &amp; Delivery Policy</h1>
          <p className="mt-3 text-center text-gray-600 max-w-2xl">
            Thank you for visiting and shopping at <strong>S-mal Couture</strong>. The following terms and conditions constitute our Shipping Policy.
          </p>
        </div>

        <div className="mt-8 space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-pink-600">1. Shipment Processing Time</h2>
            <p className="mt-2">All orders are processed within <strong>1–3 business days</strong>. Orders are not shipped or delivered on weekends or public holidays.</p>
            <p className="mt-2">If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.</p>
            <p className="mt-2"><strong>Note:</strong> <em>Processing Time</em> is the time it takes to prepare and package your order, while <em>Shipping Time</em> is the time the carrier takes to deliver it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pink-600">2. Domestic Shipping</h2>
            <p className="mt-2">We offer standard and expedited shipping within India. Delivery times vary by location:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Standard: 3–7 business days</li>
              <li>Expedited: 1–3 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pink-600">3. International Shipping</h2>
            <p className="mt-2">International shipping costs and delivery times vary by destination. Customs, duties, and taxes may apply and are the responsibility of the recipient.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pink-600">4. Order Tracking</h2>
            <p className="mt-2">Once your order ships, you will receive a tracking number via email. Use it to track your package on the carrier's website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-pink-600">5. Lost or Damaged Packages</h2>
            <p className="mt-2">Please complete this within 24 hours. The video should be a continuous 360-degree recording with no cuts, from start to end, and must clearly show the damage in the same video.</p>
          </section>
        </div>

        
      </div>

      <style jsx>{`
        .animate-fadeIn{ animation: fadeIn 700ms ease both }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) }}
        /* subtle truck drive animation */
        .truck-body { animation: drive 3s linear infinite }
        @keyframes drive { 0% { transform: translateX(-40px) } 100% { transform: translateX(40px) }}
      `}</style>
    </div> 
    </>
  )
}

export default Delivery


