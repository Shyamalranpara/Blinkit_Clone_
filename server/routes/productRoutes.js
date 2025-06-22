const express = require("express");
const route = express.Router();
const { createProductController,
    getProductController, getProductByCategory,
    deleteProductController,
    getAllProductsController,
    getProductByCategoryAndSubCategory,
    getProductDetails,
    updateProductDetails,
    deleteProductDetails,
    searchProduct,} = require("../controllers/productController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

route.post('/create', auth, createProductController);
route.post('/get', getProductController);
route.post('/get-product-by-category', getProductByCategory);
route.get('/get-all', getAllProductsController);
route.delete('/delete', auth, deleteProductController);
route.post('/get-product-by-category-and-sub-category', getProductByCategoryAndSubCategory);
route.post('/get-product-details', getProductDetails);
route.put('/update-product-details',auth,admin,updateProductDetails)
route.delete('/delete-product',auth,admin,deleteProductDetails)
route.post('/search-product',searchProduct)

module.exports = route;