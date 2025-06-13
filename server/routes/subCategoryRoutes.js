const express = require("express");
const route = express.Router();
const {AddSubCategoryController,getSubCategoryController,updateSubCategoryController,deleteSubCategoryController} = require("../controllers/subCategoryController.js");
const auth = require("../middleware/auth");

route.post('/create',auth,AddSubCategoryController);
route.post('/get',getSubCategoryController);
route.put('/update',auth,updateSubCategoryController);
route.delete('/delete',auth,deleteSubCategoryController)
module.exports = route;


