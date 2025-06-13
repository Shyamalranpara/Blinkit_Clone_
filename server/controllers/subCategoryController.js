const SubCategoryModel = require('../models/subCategorySchema');

async function AddSubCategoryController(req, res) {
    try {
        const { name, image, category } = req.body;

        if (!name || !image || !category[0]) {
            return res.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false
            });
        }

        const payload = {
            name,
            image,
            category
        };

        // Save subcategory
        const createSubCategory = new SubCategoryModel(payload);
        const save = await createSubCategory.save();

        // ✅ Populate the category field before sending response
        const populatedSubCategory = await SubCategoryModel.findById(save._id).populate("category");

        return res.json({
            message: "Sub Category Created",
            data: populatedSubCategory,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

async function getSubCategoryController(req,res){
    try{
        const data = await SubCategoryModel.find().sort({createdAt : -1}).populate('category')
         return res.json({
            message : "Sub Category data",
            data : data,
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

async function updateSubCategoryController(req,res){
     try {
        const { _id, name, image,category } = req.body 

        const checkSub = await SubCategoryModel.findById(_id)

        if(!checkSub){
            return res.status(400).json({
                message : "Check your _id",
                error : true,
                success : false
            })
        }

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id,{
            name,
            image,
            category
        })

        return res.json({
            message : 'Updated Successfully',
            data : updateSubCategory,
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false 
        })
    }

}

async function deleteSubCategoryController(req,res){
      try {
        const { _id } = req.body 
        console.log("Id",_id)
        const deleteSub = await SubCategoryModel.findByIdAndDelete(_id)

        return res.json({
            message : "Delete successfully",
            data : deleteSub,
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = { AddSubCategoryController,getSubCategoryController,updateSubCategoryController,deleteSubCategoryController };
