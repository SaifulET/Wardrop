import * as authService from "../services/AdminAuth.service.js";
import {  userschema } from "../utils/Validation.js";

// Signup
export const signup = async (req, res) => {
  try {
const result = userschema.safeParse({email:req.body.email , password: req.body.password});
  if (!result.success) {
    // Extract only messages you defined in the schema
    const messages = result.error.issues.map(err => err.message);

    return res.status(400).json({
      success: false,
      message: messages,   // 👈 only your custom messages
    });
  }


    const user = await authService.signup(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Signin
export const signin = async (req, res) => {
  try {

const result = userschema.safeParse({email:req.body.email , password: req.body.password});
  if (!result.success) {
    // Extract only messages you defined in the schema
    const messages = result.error.issues.map(err => err.message);

    return res.status(400).json({
      success: false,
      message: messages,   // 👈 only your custom messages
    });
  }


    const { email, password } = req.body;
    const { gmail, token } = await authService.signin(email, password);
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV==="production", sameSite: "Strict" });
    res.status(200).json({ success: true, email: gmail , token});
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false, message: err.message });
  }
};

// Signout
export const signout = async (req, res) => {
  try {
    const data = await authService.signout(req,res);
    res.status(200).json({ success: true, message: data.message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await authService.forgotPassword(email);
    res.status(200).json({ success: true, message: data.message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Reset Password
export const VerifyAdminEmail = async (req, res) => {
  try {
    const { email, otp} = req.body;
    const data = await authService.AdminOtpVerify(email, otp);
    res.status(200).json({ success: true, message: data.message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const resetAdminPasswordController = async (req, res) => {
  try {
    const result = userschema.safeParse({email:req.body.email, password:req.body.password});
  if (!result.success) {
    // Extract only messages you defined in the schema
    const messages = result.error.issues.map(err => err.message);

    return res.status(400).json({
      success: false,
      message: messages,   // 👈 only your custom messages
    });
  }

    const { email, password, confirmPassword } = req.body;
    const data = await authService.resetAdminPassword(email,  password,confirmPassword,);
    res.status(200).json({ success: true, message: data.message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Google Login
export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body; // from passport/google strategy
    const { user, token } = await authService.googleLogin(idToken);
    res.cookie("token", token, { 8: true });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateAdminProfileController = async (req, res, next) => {
  try {
    const userId = req.headers.user_id;
   console.log(userId)
    const updateData = req.body.data; // Assuming the update data is in the request body
    const file = req.file; // Assuming multer middleware is used to handle file uploads
console.log(updateData)
    const updatedProfile = await authService.updateAdminProfile(userId, updateData, file);
    res.json(updatedProfile);
  } catch (error) {
    next(error);
  }
};


export const getAdminProfileController = async (req, res, next) => {
  try {
    const profile = await authService.getAdminProfile(req.headers.user_id);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

