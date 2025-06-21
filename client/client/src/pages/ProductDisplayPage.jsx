import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Divider from '../components/Divider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'

const ProductDisplayPage = () => {
  const params = useParams()
  // console.log(params);
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data, setData] = useState({
    name: "",
    image: []
  })
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0)
  const imageContainer = useRef()
  const fetchProductDetails = async () => {
    // setLoading(true)
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
        setImage(response.data.image[0])
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // console.log("params:", params)
    // console.log("productId:", productId)
    fetchProductDetails()
  }, [params])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }

  console.log("data:", data)

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
      <div>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
          <img
            src={data.image[image]}
            className='w-full h-full object-scale-down'
          />
        </div>

        <div className='flex items-center justify-center gap-3 my-2'>
          {
            data.image.map((img, index) => {
              return (
                <div key={img + index + "point"} className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-300"}`}></div>
              )
            })
          }
        </div>

        <div className='grid relative'>
          {/* img  */}
          <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
            {
              data.image.map((img, index) => {
                return (
                  <div className='w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md' key={img + index}>
                    <img
                      src={img}
                      alt='min-product'
                      onClick={() => setImage(index)}
                      className='w-full h-full object-scale-down'
                    />
                  </div>
                )
              })
            }
          </div>
          {/* icon  */}
          <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute  items-center'>
            <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
              <FaAngleLeft />
            </button>
            <button onClick={handleScrollRight} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
              <FaAngleRight />
            </button>
          </div>
        </div>

      </div>



      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
        <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
        <p className=''>{data.unit}</p>
        <Divider />
        <p className=''>Price</p>
        <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
          <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}</p>
        </div>

        {
                data.stock === 0 ? (
                  <p className='text-lg text-red-500 my-2'>Out of Stock</p>
                ) 
                : (
                  // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
                  <div className='my-4'>
                    <button className=' bg-green-600 hover:bg-green-700 text-white my-4 px-4 py-1 text-white rounded'>Add</button>
                  </div>
                )
              }

        <h2 className='font-semibold'>Why Shop from blinkit?</h2>

        {/* for delivery  */}
        <div className='flex  items-center gap-4 my-4'>
          <img
            src={image1}
            alt='superfast delivery'
            className='w-20 h-20'
          />
          <div className='text-sm'>
            <div className='font-semibold'>Superfast Delivery</div>
            <p>Get your orer delivered to your doorstep at the earliest from dark stores near you.</p>
          </div>
        </div>

        {/* for price  */}
        <div className='flex  items-center gap-4 my-4'>
          <img
            src={image2}
            alt='Best prices offers'
            className='w-20 h-20'
          />
          <div className='text-sm'>
            <div className='font-semibold'>Best Prices & Offers</div>
            <p>Best price destination with offers directly from the nanufacturers.</p>
          </div>
        </div>

            {/* for Assortment  */}
        <div className='flex  items-center gap-4 my-4'>
          <img
            src={image3}
            alt='Wide Assortment'
            className='w-20 h-20'
          />
          <div className='text-sm'>
            <div className='font-semibold'>Wide Assortment</div>
            <p>Choose from 5000+ products across food personal care, household & other categories.</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ProductDisplayPage