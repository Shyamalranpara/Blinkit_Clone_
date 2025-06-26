
export const baseURL = "http://localhost:1010"

const SummaryApi = {
    register:{
        url:'/api/user/register',
        method:'post'
    },
     login:{
        url:'/api/user/login',
        method:'post'
    },
    forgot_password:{
        url:'/api/user/forgot-password',
        method:'put'
    },
    forgot_password_otp_verification:{
        url:'/api/user/verify-forgot-password-otp',
        method:'put'
    },
    resetPassword:{
        url:'/api/user/reset-password',
        method:'put'
    },
    refreshToken:{
        url:'/api/user/refresh-token',
        method:'post'
    },
    userDetails:{
         url:'/api/user/user-details',
        method:'get'
    },
    logout:{
        url:'/api/user/logout',
        method:'get'
    },
    uploadAvatar:{
        url:'/api/user/upload-avatar',
        method:'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    },
    updateUserDetails:{
        url:'/api/user/update-user',
        method:'put'
    },
    addCategory:{
        url:'/api/category/add-category',
        method:'post'
    },
     uploadImage : {
        url : '/api/file/upload',
        method : 'post'
    },
    getCategory:{
        url:'/api/category/get',
        method:'get'
    },
    updateCategory:{
        url:'/api/category/update',
        method:'put'
    },
    deleteCategory:{
        url:'/api/category/delete',
        method:'delete'
    },
    createSubCategory: {
        url: '/api/subCategory/create',
        method: 'post',
    },
    getSubCategory:{
        url: '/api/subCategory/get',
        method: 'post'
    },
    updateSubCategory: {
        url: '/api/subCategory/update',
        method: 'put'
    },
    deleteSubCategory: {
        url: '/api/subCategory/delete',
        method: 'delete'
    },
    createProduct: {
        url: '/api/product/create',
        method: 'post',
    },
    getProduct: {
        url: '/api/product/get',
        method: 'post'
    },
    getProductByCategory: {
        url: '/api/product/get-product-by-category',
        method: 'post'
    },
    getAllProducts: {
        url: '/api/product/get-all',
        method: 'get'
    },
    deleteProduct: {
        url: '/api/product/delete',
        method: 'delete'
    },
    getProductByCategoryAndSubCategory: {
        url: '/api/product/get-product-by-category-and-sub-category',
        method: 'post'
    },
    getProductDetails:{
        url:'/api/product/get-product-details',
        method:'post'
    },
    updateProductDetails:{
        url:'api/product/update-product-details',
        method:'put'
    },
    deleteProduct:{
        url:'api/product/delete-product',
        method:'delete'
    },
    searchProduct:{
        url:'api/product/search-product',
        method:'post'
    },
    addToCart:{
        url:'api/cart/create',
        method:'post'
    },
    getCartItem:{
        url:'api/cart/get',
        method:'get'
    },
    updateCartItemQty:{
        url:'api/cart/update-qty',
        method:'put'
    },
    deleteCartItem:{
        url:'api/cart/delete-cart-item',
        method:'delete'
    },
    

    

}
export default SummaryApi