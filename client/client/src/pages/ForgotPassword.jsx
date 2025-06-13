import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router';

const ForgotPassword = () => {

  const [data, setData] = useState({
    email: "",
  })


  const navigate = useNavigate()
  const handleChange = (e) => {

    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev, [name]: value
      }
    })

  }

  const { email, password, } = data;
  console.log("data", data)

  const validValue = Object.values(data).every(el => el)

  const handleSubmit = async(e)=>{
    e.preventDefault()


   try{
     const res = await Axios({
      ...SummaryApi.forgot_password,
      data:data
    })
    if(res.data.error){
      toast.error(res.data.message)
    }
    if(res.data.success){
      toast.success(res.data.message)
       navigate("/verification-otp",{
        state:{
            data
        }
      })
    }
      setData({
        email:"",
      })
     
    console.log("res",res)

   }catch(error){
    AxiosToastError(error)
   }

  }
  return (
    <section className='w-full container mx-auto px-2'>

      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>

         <p className='font-semibold text-lg'>Forgot Password </p>

        <form onSubmit={handleSubmit} className='grid gap-4 py-4'>

        
           <div className='grid gap-1 '>

            <label htmlFor="email">Email :</label>

            <input
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
              placeholder='Enter your email'
              type="email"
              id='email'
              autoFocus
              name='email'
              value={email}
              onChange={handleChange}
            />

          </div>


              <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}   text-white py-2 rounded font-semibold my-3 tracking-wide `}>Send Otp</button>
       
        </form>

              <p>
                    Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
                </p>
      </div>

    </section>
  )
}

export default ForgotPassword
