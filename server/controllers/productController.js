const ProductModel = require('../models/productSchema');

async function createProductController(req,res) {
    try{
        const { 
            name ,
            image ,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
        } = req.body   

        console.log("Creating product with data:", {
            name, image, category, subCategory, unit, stock, price, discount, description
        })

        if(!name || !image?.length || !category?.length || !subCategory?.length || !unit || !price || !description ){
            return res.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }

        const product = new ProductModel({
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description: description,  
            more_details
        });

        const savedProduct = await product.save();
        console.log("Product saved successfully:", savedProduct._id)

        const populatedProduct = await ProductModel.findById(savedProduct._id)
          .populate("category")
          .populate("subCategory");

        return res.json({
            message : "Product Created Successfully",
            data : populatedProduct,
            error : false,
            success : true
        });

    } catch(error) {
        console.error("Error creating product:", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

async function getProductController(req,res) {
     try {
        
        let { page, limit, search } = req.body 

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

       const query = search && search.trim() !== "" ? {
  $text: {
    $search: search.trim()
  }
} : {}


        const skip = (page - 1) * limit

        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return res.json({
            message : "Product data",
            error : false,
            success : true,
            totalCount : totalCount,
            totalNoPage : Math.ceil( totalCount / limit),
            data : data
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }

}

async function getProductByCategory(req,res) {
    try {
        const { id } = req.body 

        if(!id){
            return res.status(400).json({
                message : "provide category id",
                error : true,
                success : false
            })
        }

        console.log("Category ID received:", id)

        const product = await ProductModel.find({ 
            category: { $in: [id] }
        }).populate('category subCategory').limit(15)

        console.log("Products found:", product.length)
        console.log("First product:", product[0])

        return res.json({
            message : "category product list",
            data : product,
            error : false,
            success : true
        })
    } catch (error) {
        console.error("Error in getProductByCategory:", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }    
}

async function deleteProductController(req, res) {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false
            });
        }

        const deletedProduct = await ProductModel.findByIdAndDelete(_id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        return res.json({
            message: "Product deleted successfully",
            data: deletedProduct,
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

async function getAllProductsController(req, res) {
    try {
        const products = await ProductModel.find({}).populate('category subCategory');
        console.log("Total products in database:", products.length);
        
        return res.json({
            message: "All products",
            data: products,
            error: false,
            success: true
        });
    } catch (error) {
        console.error("Error getting all products:", error);
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

async function getProductByCategoryAndSubCategory(req,res){
try{
    const{categoryId,subCategoryId,page,limit} = req.body

    if(!categoryId || !subCategoryId){
        return res.status(400).json({
            message: "Category and sub category are required",
            error: true,
            success: false
        });
    }
    if(!page){
        page = 1
    }
    if(!limit){
        limit = 10
    }
    const query = {
        category: { $in: categoryId },
        subCategory: { $in: subCategoryId }
    }
    const skip = (page - 1) * limit
    const [data,dataCount] = await Promise.all([
        ProductModel.find(query).sort({createdAt : -1}).skip(skip).limit(limit).populate('category subCategory'),
        ProductModel.countDocuments(query)
    ])
    return res.json({
        message: "Products by category and sub category",
        data: data,
        totalCount: dataCount,
        page: page,
        limit: limit,
        totalNoPage: Math.ceil(dataCount / limit),
        error: false,
        success: true
    });
}catch(error){
    return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
    });
}
}
async function getProductDetails(req,res){
try{
    const { productId } = req.body 

    const product = await ProductModel.findOne({ _id : productId })


    return res.json({
        message : "product details",
        data : product,
        error : false,
        success : true
    })
}catch (error) {
    return res.status(500).json({
        message : error.message || error,
        error : true,
        success : false
    })
}}
module.exports = {
    createProductController,
    getProductController,
    getProductByCategory,
    deleteProductController,
    getAllProductsController,
    getProductByCategoryAndSubCategory,
    getProductDetails,
};