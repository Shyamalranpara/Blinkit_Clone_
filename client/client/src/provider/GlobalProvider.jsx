import { createContext,useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
export const GlobalContext = createContext(null)

export const useGlobalContext = ()=> useContext(GlobalContext)


const GlobalProvider = ({children}) => {
    const dispatch = useDispatch();

    const fetchCartItem = async()=>{
        try{
    const response = await Axios({
      ...SummaryApi.getCartItem
    })
    const {data: responseData}=response
    
    if(responseData.success){
      dispatch(handleAddItemCart(responseData.data))
      console.log(responseData)
    }
        }catch(error){
          console.log(error)
        }
      }

      const updateCartItem = async(id,qty)=>{
        try {
            const response = await Axios({
              ...SummaryApi.updateCartItemQty,
              data : {
                _id : id,
                qty : qty
              }
            })
            const { data : responseData } = response
  
            if(responseData.success){
                // toast.success(responseData.message)
                fetchCartItem()
                return responseData
            }
        } catch (error) {
          AxiosToastError(error)
          return error
        }
      }

      const deleteCartItem = async(cartId)=>{
        try {
            const response = await Axios({
              ...SummaryApi.deleteCartItem,
              data : {
                _id : cartId
              }
            })
            const { data : responseData} = response
  
            if(responseData.success){
              toast.success(responseData.message)
              fetchCartItem()
            }
        } catch (error) {
           AxiosToastError(error)
        }
      }

      
      
useEffect(()=>{
    fetchCartItem();

},[dispatch])

function useFetchCartItem() {
  const dispatch = useDispatch();
  // ...
}

    return(
        <GlobalContext.Provider value={{
    fetchCartItem,
    updateCartItem
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider