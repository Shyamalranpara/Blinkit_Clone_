const express = require("express");
const route = express.Router();
const {AddCategoryController,getCategoryController,updateCategoryController,deleteCategoryController}= require("../controllers/categoryController")
const auth = require("../middleware/auth");

route.post('/add-category',auth,AddCategoryController);
route.get('/get',getCategoryController);
route.put('/update',auth,updateCategoryController);
route.delete('/delete',auth,deleteCategoryController)
module.exports = route;
