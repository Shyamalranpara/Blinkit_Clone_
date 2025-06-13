const CategoryModel = require('../models/categorySchema')
const SubCategoryModel = require('../models/subCategorySchema')
const ProductModel = require('../models/productSchema')
async function AddCategoryController(req,res){
    try{
        const { name, image } = req.body;

        if (!name || !image) {
            return  res.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false});
        }

        const addCategory = new CategoryModel({
            name,
            image
        })

         const saveCategory = await addCategory.save()

           if(!saveCategory){
            return res.status(500).json({
                message : "Not Created",
                error : true,
                success : false
            })
        }

         return res.json({
            message : "Add Category",
            data : saveCategory,
            success : true,
            error : false
        })
      
    }catch(error){
         return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
       }) 
    }
}

async function getCategoryController(req,res){
     try {
        
        const data = await CategoryModel.find().sort({ createdAt : -1 })

        return res.json({
            data : data,
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.messsage || error,
            error : true,
            success : false
        })
    }
}

async function updateCategoryController(req,res){
    try{
        const {_id, name, image}=req.body;
         const update = await CategoryModel.updateOne({
            _id: _id
         },{
            name,
            image
         })

         return res.json({
            message : "Category Updated",
            data : update,
            error : false,
            success : true
         })
    }catch(error){
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

async function  deleteCategoryController(req,res){
    try{
        const { _id } = req.body;

         const checkSubCategory = await SubCategoryModel.find({
            category : {
                "$in" : [ _id ]
            }
        }).countDocuments()

         const checkProduct = await ProductModel.find({
            category : {
                "$in" : [ _id ]
            }
        }).countDocuments()

        if(checkSubCategory >  0 || checkProduct > 0 ){
            return response.status(400).json({
                message : "Category is already use can't delete",
                error : true,
                success : false
            })
        }

        const deleteCategory = await CategoryModel.deleteOne({ _id : _id})

        return res.json({
            message : "Delete category successfully",
            data : deleteCategory,
            error : false,
            success : true
        });
    }catch(error){
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = {AddCategoryController,getCategoryController,updateCategoryController,deleteCategoryController};