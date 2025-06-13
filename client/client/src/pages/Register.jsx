import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router';

const Register = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const[showPassword,setShowPassword]=useState(false)

  const[showConfirmPassword,setShowConfirmPassword]=useState(false)

  const navigate = useNavigate()
  const handleChange = (e) => {

    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev, [name]: value
      }
    })

  }

  const { name, email, password, confirmPassword } = data;
  console.log("data", data)

  const validValue = Object.values(data).every(el => el)

  const handleSubmit = async(e)=>{
    e.preventDefault()

    if(password !== confirmPassword){
      toast.error(
        "password and confirmpassword must be same"
      )
      return
    }

   try{
     const res = await Axios({
      ...SummaryApi.register,
      data:data
    })
    if(res.data.error){
      toast.error(res.data.message)
    }
    if(res.data.success){
      toast.success(res.data.message)
      setData({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
      })
      navigate("/login")
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

        <form onSubmit={handleSubmit} className='grid gap-4 mt-6'>

          <div className='grid gap-1 '>

            <label htmlFor="name">Name :</label>

            <input
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
              placeholder='Enter your name'
              type="text"
              id='name'
              autoFocus
              name='name'
              value={name}
              onChange={handleChange}
            />

          </div>

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
          
          </div>

           <div className='grid gap-1 '>

            <label htmlFor="confirmPassword">Confirm Password :</label>
          
          <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
              className='w-full outline-none'
              placeholder='Enter your confirm Password'
              type={showConfirmPassword ? "text":"password"}
              id='confirmPassword'
              autoFocus
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleChange}
            />

            <div onClick={()=>setShowConfirmPassword(preve =>!preve)} className='cursor-pointer'>
              {
                showConfirmPassword ? (<FaRegEye />):(<FaEyeSlash />)
              }
            </div>

          </div>
          
          </div>

              <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}   text-white py-2 rounded font-semibold my-3 tracking-wide `}>Register</button>
       
        </form>

              <p>
                    Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
                </p>
      </div>

    </section>
  )
}

export default Register
