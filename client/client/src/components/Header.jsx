import React, { useEffect, useState } from 'react'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { store } from '../store/store';
import { GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import UserMenu from './UserMenu';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import  {handleAddItemCart}  from '../store/cartProduct'
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from '../components/DisplayCartItem';

const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const navigate = useNavigate()
  const isSearchPage = location.pathname === "/search"
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const {totalPrice,totalQty}=useGlobalContext()
  const [openCartSection,setOpenCartSection]=useState(false)

  const user = useSelector((state) => state.user)
  console.log("user form store", store)

  const cartItem = useSelector(state => state.cartItem.cart)
  // console.log("Cart Items:", cartItem);
  // console.log("Cart Items (JSON):", JSON.stringify(cartItem, null, 2));
  console.table(cartItem);

  const redirectToLoginPage = () => {
    navigate("/login")
  }

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  const handleClickAway = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login")
      return
    }

    navigate("/user")
  }
  // console.log("location",location)

  // console.log("ismobile",isMobile)

  // console.log("isSearchPage",isSearchPage)

//      useEffect(()=>{
//          const qty = cartItem.reduce((preve,curr)=>{
//          return preve + curr.quantity
//       },0)
//       setTotalQty(qty)
        
//        const tPrice = cartItem.reduce((preve,curr)=>{
//           return preve + (curr.productId.price * curr.quantity)
//       },0)
//       setTotalPrice(tPrice)

//  },[cartItem])

  // cartItem.forEach(item => console.log(item));

  return (
    <header className='h-26 lg:h-20 lg:shadow-md sticky top-0 z-40 flex items-center flex-col justify-center gap-1 bg-white '>

      {
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center px-2 justify-between'>
            {/* logo  */}
            <div className='h-full'>
              <Link to={"/"} className='h-full flex justify-center items-center'>

                <svg xmlns="http://www.w3.org/2000/svg" className='hidden lg:block' width={120} height={60} fill="none" viewBox="0 0 114 30"><path fill="#F8CB46" d="M14.334 7.186c1.928 0 3.65.48 5.164 1.441 1.528.947 2.726 2.293 3.594 4.036.84 1.675 1.26 3.645 1.26 5.91 0 2.196-.42 4.159-1.26 5.888-.84 1.73-2.024 3.082-3.553 4.056-1.542.989-3.277 1.483-5.205 1.483a9.288 9.288 0 0 1-7.146-3.294v2.78H0V0h7.188v10.46a8.97 8.97 0 0 1 3.18-2.41 9.287 9.287 0 0 1 3.966-.864Zm-2.148 16.863c1.02 0 1.928-.233 2.726-.7a4.951 4.951 0 0 0 1.88-1.956c.454-.823.682-1.764.682-2.82 0-1.03-.227-1.963-.682-2.8a4.951 4.951 0 0 0-1.88-1.957c-.798-.467-1.707-.7-2.726-.7-.964 0-1.824.233-2.582.7-.757.453-1.35 1.091-1.776 1.915-.427.837-.64 1.784-.64 2.841 0 1.057.213 2.005.64 2.842a4.835 4.835 0 0 0 1.776 1.935c.758.467 1.618.7 2.582.7ZM25.336 29.485V0h7.187v29.485h-7.187ZM34.56 29.485V7.68h7.147v21.805h-7.146ZM57.232 7.186c1.528 0 2.905.357 4.13 1.07 1.226.7 2.19 1.69 2.892 2.966.675 1.29 1.012 2.752 1.012 4.385v13.878H58.41V17.214c0-.797-.158-1.504-.475-2.121a3.37 3.37 0 0 0-1.301-1.462c-.55-.343-1.198-.515-1.942-.515-.702 0-1.35.172-1.941.515a3.555 3.555 0 0 0-1.384 1.359c-.344.549-.516 1.194-.516 1.935l-.042 12.56h-7.146V7.68h7.146v2.492c.675-.934 1.577-1.661 2.706-2.183 1.13-.535 2.368-.803 3.718-.803ZM81.06 17.213l8.117 12.272H81.06l-4.75-7.721-2.19 2.533v5.188h-7.188V0h7.188v16.287l6.898-8.607h8.118l-8.076 9.534ZM34.557.002h7.17v5.59h-7.17V.002Z" /><path fill="#54B226" d="M90.318 29.42V7.615h7.146V29.42h-7.146ZM112.575 23.263 114 27.855c-.647.618-1.466 1.119-2.458 1.503-.978.384-1.935.577-2.871.577-1.349 0-2.554-.295-3.614-.886a6.4 6.4 0 0 1-2.479-2.512c-.592-1.043-.888-2.244-.888-3.603v-9.616h-2.871V7.615h2.871V.002h6.857v7.613h4.524v5.703h-4.524v8.298c0 .7.186 1.27.558 1.71.372.438.847.658 1.425.658.413 0 .799-.062 1.157-.185.358-.124.654-.302.888-.536ZM90.26.002h7.17v5.59h-7.17V.002Z" /></svg>

                <svg xmlns="http://www.w3.org/2000/svg" className='lg:hidden' width={100} height={60} fill="none" viewBox="0 0 114 30"><path fill="#F8CB46" d="M14.334 7.186c1.928 0 3.65.48 5.164 1.441 1.528.947 2.726 2.293 3.594 4.036.84 1.675 1.26 3.645 1.26 5.91 0 2.196-.42 4.159-1.26 5.888-.84 1.73-2.024 3.082-3.553 4.056-1.542.989-3.277 1.483-5.205 1.483a9.288 9.288 0 0 1-7.146-3.294v2.78H0V0h7.188v10.46a8.97 8.97 0 0 1 3.18-2.41 9.287 9.287 0 0 1 3.966-.864Zm-2.148 16.863c1.02 0 1.928-.233 2.726-.7a4.951 4.951 0 0 0 1.88-1.956c.454-.823.682-1.764.682-2.82 0-1.03-.227-1.963-.682-2.8a4.951 4.951 0 0 0-1.88-1.957c-.798-.467-1.707-.7-2.726-.7-.964 0-1.824.233-2.582.7-.757.453-1.35 1.091-1.776 1.915-.427.837-.64 1.784-.64 2.841 0 1.057.213 2.005.64 2.842a4.835 4.835 0 0 0 1.776 1.935c.758.467 1.618.7 2.582.7ZM25.336 29.485V0h7.187v29.485h-7.187ZM34.56 29.485V7.68h7.147v21.805h-7.146ZM57.232 7.186c1.528 0 2.905.357 4.13 1.07 1.226.7 2.19 1.69 2.892 2.966.675 1.29 1.012 2.752 1.012 4.385v13.878H58.41V17.214c0-.797-.158-1.504-.475-2.121a3.37 3.37 0 0 0-1.301-1.462c-.55-.343-1.198-.515-1.942-.515-.702 0-1.35.172-1.941.515a3.555 3.555 0 0 0-1.384 1.359c-.344.549-.516 1.194-.516 1.935l-.042 12.56h-7.146V7.68h7.146v2.492c.675-.934 1.577-1.661 2.706-2.183 1.13-.535 2.368-.803 3.718-.803ZM81.06 17.213l8.117 12.272H81.06l-4.75-7.721-2.19 2.533v5.188h-7.188V0h7.188v16.287l6.898-8.607h8.118l-8.076 9.534ZM34.557.002h7.17v5.59h-7.17V.002Z" /><path fill="#54B226" d="M90.318 29.42V7.615h7.146V29.42h-7.146ZM112.575 23.263 114 27.855c-.647.618-1.466 1.119-2.458 1.503-.978.384-1.935.577-2.871.577-1.349 0-2.554-.295-3.614-.886a6.4 6.4 0 0 1-2.479-2.512c-.592-1.043-.888-2.244-.888-3.603v-9.616h-2.871V7.615h2.871V.002h6.857v7.613h4.524v5.703h-4.524v8.298c0 .7.186 1.27.558 1.71.372.438.847.658 1.425.658.413 0 .799-.062 1.157-.185.358-.124.654-.302.888-.536ZM90.26.002h7.17v5.59h-7.17V.002Z" /></svg>

              </Link>
            </div>

            {/* search section  */}
            <div className='hidden lg:block'>
              <Search />
            </div>

            {/* login and my cart */}
            <div className=''>
              {/* user icon display in only mobile version  */}
              <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                <FaRegCircleUser size={26} />
              </button>

              {/* only desktop  */}
              <div className='hidden lg:flex items-center gap-10'>
                {
                  user?._id ? (
                    <ClickAwayListener onClickAway={handleClickAway}>
                      <Box sx={{ position: 'relative' }}>
                        <div onClick={() => setOpenUserMenu(prev => !prev)} className='flex select-none items-center gap-1 cursor-pointer'>
                          <p>Account</p>
                          {
                            openUserMenu ? (
                              <GoTriangleUp size={25} />
                            ) : (
                              <GoTriangleDown size={25} />
                            )
                          }
                        </div>
                        {openUserMenu && (
                          <Box sx={{
                            position: 'absolute',
                            top: 48,
                            right: 0,
                            zIndex: 1,
                            minWidth: '208px'
                          }}>
                            <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                              <UserMenu close={handleCloseUserMenu} />
                            </div>
                          </Box>
                        )}
                      </Box>
                    </ClickAwayListener>
                  ) : (

                    <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
                  )
                }
                <button onClick={()=>setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white'>
                  {/* add to cart icon  */}
                  <div className='animate-bounce'>
                    <BsCart4 size={26} />
                  </div>

                  <div className='font-semibold text-sm'>
                  {
                                                    cartItem[0] ? (
                                                        <div>
                                                            <p>{totalQty} Items</p>
                                                            <p>{DisplayPriceInRupees(totalPrice)}</p>

                                                        </div>
                                                    ) : (
                                                        <p>My Cart</p>
                                                    )
                                                }
                  </div>

                </button>
              </div>
            </div>
          </div>
        )
      }


      <div className='container mx-auto px-2 py-2 lg:hidden'>
        <Search />
      </div>

      {
        openCartSection && (
          <DisplayCartItem close={()=>setOpenCartSection(false)}/>
        )
      }
    </header>
  )
}

export default Header
