import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const[showPassword,setShowPassword]=useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {

    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev, [name]: value
      }
    })

  }

  const { email, password } = data;
  console.log("data", data)

  const validValue = Object.values(data).every(el => el)

  const handleSubmit = async(e)=>{
    e.preventDefault()


   try{
     const res = await Axios({
      ...SummaryApi.login,
      data:data
    })
    if(res.data.error){
      toast.error(res.data.message)
    }
    if(res.data.success){
      toast.success(res.data.message)
        localStorage.setItem('accesstoken',res.data.data.accessToken)
        localStorage.setItem('refreshToken',res.data.data.refreshToken.token)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))
      setData({
        email:"",
        password:"",
      })
      navigate("/")
    }
    console.log("res",res)

   }catch(error){
    AxiosToastError(error)
   }

  }
  return (
    <section className='w-full container mx-auto px-2'>

      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>

        <p>Welcome to Blinkit</p>

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

           <div className='grid gap-1 '>

            <label htmlFor="password">Password :</label>
          
          <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
              className='w-full outline-none'
              placeholder='Enter your password'
              type={showPassword ? "text":"password"}
              id='password'
              autoFocus
              name='password'
              value={password}
              onChange={handleChange}
            />

            <div onClick={()=>setShowPassword(preve =>!preve)} className='cursor-pointer'>
              {
                showPassword ? (<FaRegEye />):(<FaEyeSlash />)
              }
            </div>

          </div>
            <Link to={"/forgot-password"} className='block ml-auto hover:text-primary-200'>Forgot password ?</Link>
          </div>

              <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}   text-white py-2 rounded font-semibold my-3 tracking-wide `}>Login</button>
       
        </form>

              <p>
                     Don't have account? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link>
                </p>
      </div>

    </section>
  )
}

export default Login
