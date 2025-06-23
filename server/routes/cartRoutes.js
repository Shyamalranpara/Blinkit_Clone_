const express = require("express");
const route = express.Router();
const {addToCartItemController,getCartItemController,updateCartItemQtyController,deleteCartItemQtyController}=require('../controllers/cartController');
const auth = require("../middleware/auth");

route.post('/create',auth,addToCartItemController)

route.get('/get',auth,getCartItemController)

route.put('/update-qty',auth,updateCartItemQtyController)

route.delete('/delete-cart-item',auth,deleteCartItemQtyController)
module.exports = route;