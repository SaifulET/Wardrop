import * as authService from "../services/auth.service.js";
import { emailSchema } from "../utils/Validation.js";


// Signup
export const signup = async (req, res) => {
  try {
  const result = emailSchema.safeParse(req.body.email); // ❌ invalid
  console.log(result.success)
  if (!result.success) {
    console.log("dk")
    return res.json({error:result.error.errors[0].message}); // 👉 "Invalid email address"
  }
  
    const {user,token} = await authService.signup(req.body);
     res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV==="production", sameSite: "Strict" });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Signin
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.signin(email, password);
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV==="production", sameSite: "Strict" });
    res.status(200).json({ success: true, data: user , token});
  } catch (err) {
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

export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await authService.verifyOtpService(email, otp);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Reset Password
export const resetPassword = async (req, res) => {
  try {

    const { email, newPassword, ConfirmPassword } = req.body;
    const data = await authService.resetPassword(email,  newPassword,ConfirmPassword,);
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

// Apple Login
export const appleLogin = async (req, res) => {
  try {
    const { profile } = req.body;
    const { user, token } = await authService.appleLogin(profile);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
