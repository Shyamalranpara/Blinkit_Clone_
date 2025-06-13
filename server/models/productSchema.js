const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: Array,
        default: []
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "category"
        }
    ],
    subCategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "subCategory"
        }
    ],
    unit: {
        type: String,
        default: ""
    },
    stock: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    description: {   // ✅ fixed spelling here
        type: String,
        default: ""
    },
    more_details: {
        type: Object,
        default: {}
    },
    publish: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

// ✅ Corrected index
productSchema.index({
    name: "text",
    description: "text"
});

const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
