const uploadimageCloudinary = require("../utils/uploadimageCloudinary");

async function uploadImageController(req,res){
    try{
        const file = req.file;
        // console.log(file)

        const uploadImage = await uploadimageCloudinary(file) 
        return res.json({
            message: "Image Uploaded Successfully",
            data: uploadImage,
            success: true,
            error: false
        });
    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
module.exports = { uploadImageController };