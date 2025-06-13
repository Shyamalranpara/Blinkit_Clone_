const express = require("express");
const route = express.Router();
const {createProductController, getProductController,getProductByCategory, deleteProductController, getAllProductsController,getProductByCategoryAndSubCategory} = require("../controllers/productController");
const auth = require("../middleware/auth");

route.post('/create', auth, createProductController);
route.post('/get', getProductController);
route.post('/get-product-by-category', getProductByCategory);
route.get('/get-all', getAllProductsController);
route.delete('/delete', auth, deleteProductController);
route.post('/get-product-by-category-and-sub-category', getProductByCategoryAndSubCategory);
module.exports = route;