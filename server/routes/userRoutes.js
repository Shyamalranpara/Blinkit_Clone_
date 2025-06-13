const express = require("express");
const route = express.Router();
const { registerUserController,verifyEmailController,loginController,logoutController,uploadAvatar,updateUserDetails, forgotPasswordController,verifyForgotPasswordOtp,resetPassword,refreshToken,userDetails} = require("../controllers/userControllers");
const upload = require("../middleware/multer");
const auth = require("../middleware/auth");

route.post('/register', registerUserController);

route.post('/verify_email',verifyEmailController);

route.post('/login',loginController);

route.get('/logout',logoutController);

route.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar);

route.put('/update-user',auth,updateUserDetails);

route.put('/forgot-password',forgotPasswordController);

route.put('/verify-forgot-password-otp',verifyForgotPasswordOtp);

route.put('/reset-password',resetPassword);

route.post('/refresh-token',refreshToken);

route.get('/user-details',auth,userDetails);

module.exports = route;
