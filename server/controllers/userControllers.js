const sendEmail = require("../config/sendEmail");
const UserModel = require("../models/userSchema");
const bcryptjs = require("bcryptjs");
const verifyEmailTemplate = require('../utils/verifyEmailTemplate');
const generateAccessToken = require("../utils/generatedAccessToken");
const generatedRefreshToken = require("../utils/generatedRefreshToken");
const uploadimageCloudinary = require("../utils/uploadimageCloudinary");
const generatedOtp = require("../utils/generatedOtp");
const forgotPasswordTemplate = require("../utils/forgotPasswordTemplate");
const jwt = require("jsonwebtoken");
const { useId } = require("react");

async function registerUserController(req, res){
  try {
     console.log(req.body);
    const { name, email, password } = req.body;

    // ✅ 1. Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email, and password.",
        error: true,
        success: false,
      });
    }

    // ✅ 2. Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered.",
        error: true,
        success: false,
      });
    }

    // ✅ 3. Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // ✅ 4. Save new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // ✅ 5. Send verification email
    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`;
    
    await sendEmail({
      sendTo: email,
      subject: "Verify your email | Blinkit",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    // ✅ 6. Respond to client
    return res.status(201).json({
      message: "User registered successfully. Verification email sent.",
      error: false,
      success: true,
      data: savedUser,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

async function verifyEmailController(req, res){
  try{
    const {code} = req.body;

    const user = await UserModel.findOne({ _id: code });

    if(!user){
      return res.status(404).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.updateOne({ _id: code }, { verify_email: true });

    return res.json({
      message: "Email verified successfully",
      error: false,
      success: true,
      data: updateUser,
    })
  }catch(error){
      return res.status(500).json({
        message: error.message || error,
        error: true,
        success: true,
      });
  }
}

// loginController 
async function loginController(req,res){
  try{
    const { email, password } = req.body;

    // ✅ 1. Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password.",
        error: true,
        success: false,
      });
    }

    // ✅ 2. Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        error: true,
        success: false,
      });
    }

    // ✅ 3. Check if email is verified
    if (user.status !== "Active") {
      return res.status(403).json({
        message: "contact to admin",
        error: true,
        success: false,
      });
    }

    // ✅ 4. Compare passwords
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Invalid password.",
        error: true,
        success: false,
      });
    }

    // send two token from server to client
    const accessToken =await generateAccessToken(user._id);
    const refreshToken =await generatedRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
      last_login_date : new Date()
    })
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    // ✅ 5. Update last login date
    // user.last_login_date = new Date();
    // await user.save();

    // ✅ 6. Respond to client
    return res.status(200).json({
      message: "Login successful.",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  }catch(error){
    return res.status(500).json({
      message:error.message || error,
      error: true,
      success: false,
    })
  }
}

//logoutController
async function logoutController(req, res){
try{

   const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  return res.status(200).json({
    message: "Logout successful.",
    error: false,
    success: true,
  });
}catch(error){
  return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false,
  });
}
}

//upload user avatar
async function uploadAvatar(req, res){
  try {
    console.log("File info:", req.file);
    console.log("Token:", req.headers.authorization);
    
    const userId = req.userId 
    const image = req.file;
    const upload = await uploadimageCloudinary(image);

    const updateUser = await UserModel.findByIdAndUpdate(userId,{
      avatar: upload.url
    })
    return res.json({
      message: "Uploaded profile",
      data:{
        _id: userId,
        avatar:updateUser
      } 
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

// update user details 
async function updateUserDetails(req,res){
  try{
    const userId = req.userId
    const {name,email,mobile,password} = req.body

    let hashPassword = ""

if(password){
   const salt = await bcryptjs.genSalt(10);
   hashPassword = await bcryptjs.hash(password, salt);
}

    const updateUser = await UserModel.updateOne({_id:userId},{
      ...( name && {name: name}),
      ...( email && {email: email}),
      ...( mobile && {mobile: mobile}),
      ...(password &&{password: hashedPassword})
    })

    return res.json({
      message: "update successfully!",
      error: false,
      success: true,
      data: updateUser,
    })
  }catch(error){
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

// forgot password not login user 
async function forgotPasswordController(req,res){
  try{
    const {email} = req.body
    const user = UserModel.findOne({email})

    if(!user){
      return res.status(400).json({
        message:"user not available",
        error:true,
        success:false
      })
    }

    const otp = generatedOtp()

    const expireTime = new Date(Date.now() + 60 * 1000); // 60,000 ms = 1 minute  ( 5minut to + 5 * 60 * 1000);


    const update = await UserModel.findByIdAndUpdate(user._id,{
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString()
    })

    await sendEmail({
      sendTo:email,
      subject: "forget password from Blinkit",
      html: forgotPasswordTemplate({
        name:user.name,
        otp:otp
      })
    })
    return res.json({
      message:"check your email",
      error: false,
      success:true
    })

  }catch(error){
    return res.status(500).json({
      message:error.message || error,
      error : true,
      success: false
    })
  }
}

// verify Forgot Password
async function verifyForgotPasswordOtp(req, res){
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide required fields: email and otp.",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not available",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();

    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        message: "OTP is expired",
        error: true,
        success: false,
      });
    }

    if (String(otp) !== String(user.forgot_password_otp)) {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
      forgot_password_otp:"",
      forgot_password_expiry:""
    })
    return res.json({
      message: "OTP verified successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// reset the password 
async function resetPassword(req, res){
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Provide required fields: email, newPassword, confirmPassword",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email is not available",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "newPassword and confirmPassword are not the same.",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    await UserModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.json({
      message: "Password updated successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// refresh token controlar
async function refreshToken(req,res){
  try{
    const refreshToken = req.cookies.refreshToken || req?.header?.authorization?.split("")[1]

    if(!refreshToken){
      return res.status(401).json({
        message:"Invalid token",
        error:true,
        success:false
      })
    }
    console.log("refreshToken",refreshToken)

    const verifyToken = await  jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)
    
    if(!verifyToken){
      return res.status(401).json({
        message:"token is expired",
        error: true,
        success:false
      })
    }
    console.log("verifyToken",verifyToken)

    const userId = verifyToken?._id
    const newAccessToken = await generateAccessToken(userId)

const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie('accessToken',newAccessToken,cookieOptions)

    return res.json({
      message:"new Access token generated",
      error:false,
      success:true,
      data:{
        accessToken:newAccessToken
      }
    })
  }catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// user details 
async function userDetails(req,res){
  try{
    const userId = req.userId
    console.log(userId)
    const user = await UserModel.findById(userId).select('-password -refresh_token')
    return res.json({
      message:user,
      data:user,
      error:false,
      success:true,
    })
  }catch(error){
    return res.status(500).json({
      message:"Something is wrong",
      error: false,
      success:true
    })
  }
}
module.exports = {
  registerUserController,
  verifyEmailController,
  loginController,
  logoutController,
  uploadAvatar,
  updateUserDetails,
  forgotPasswordController,
  verifyForgotPasswordOtp,
  resetPassword,
  refreshToken,
  userDetails
};