import React, { useState, useEffect } from 'react'
import { fetchDataFromApi } from '../../Utils/Api'
import CircularProgress from '@mui/material/CircularProgress'

const Size = () => {
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const res = await fetchDataFromApi('/api/product/productSize/get')
        if (res.success) {
          setSizes(res.data)
        }
      } catch (error) {
        console.error('Error fetching sizes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSizes()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <CircularProgress color="inherit" />
      </div>
    )
  }

  return (
    <section className="bg-white py-5">
      <div className="container">
        <div className="size-guide">
          <h1 className="text-[24px] font-[600] mb-5 text-center">Size Guide</h1>

          {/* Size Chart Image */}
          <div className="flex justify-center mb-8">
            <img
              src="/sizechart.webp"
              alt="Size Chart"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Available Sizes */}
          <div className="mt-8">
            <h2 className="text-[20px] font-[600] mb-4 text-center">Available Sizes</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {sizes.map((size) => (
                <div
                  key={size._id}
                  className="size-item bg-gray-100 hover:bg-orange-100 border border-gray-300 hover:border-orange-300 rounded-lg px-6 py-3 text-center font-medium text-gray-800 hover:text-orange-600 transition-colors cursor-pointer min-w-[60px]"
                >
                  {size.name}
                </div>
              ))}
            </div>
          </div>

          {/* Size Guide Information */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-[18px] font-[600] mb-3">How to Measure</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Chest/Bust:</h4>
                <p className="text-gray-600">Measure around the fullest part of your chest/bust, keeping the tape horizontal.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Waist:</h4>
                <p className="text-gray-600">Measure around your natural waistline, keeping the tape comfortably loose.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Hips:</h4>
                <p className="text-gray-600">Measure around the fullest part of your hips, about 8 inches below your waist.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Length:</h4>
                <p className="text-gray-600">Measure from the highest point of your shoulder to the desired hemline.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Size


