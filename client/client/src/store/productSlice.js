import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    allCategory : [],
    loadingCategory : false,
    allSubCategory : [],
    product : []
}

const productSlice = createSlice({
      name : 'product',
    initialState : initialValue,
    reducers : {
        setAllCategory : (state,action)=>{
            // console.log("all Category redux store",action.payload)
            state.allCategory = [...action.payload]
        },
        setLoadingCategory : (state,action)=>{
            state.loadingCategory = action.payload
        },
        setAllSubCategory : (state,action)=>{
             console.log("all sub category redux store",action.payload)
            state.allSubCategory = [...action.payload]
        },
        
    }
})

export const  { setAllCategory,setAllSubCategory,setLoadingCategory} = productSlice.actions

export default productSlice.reducer