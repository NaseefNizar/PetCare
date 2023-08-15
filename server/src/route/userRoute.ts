import express from "express";
import { existingUser, getData, googleVerify, login, logout, signup, verifyToken } from "../controller/userController.js";
import { sendOTP, verifyOTP } from "../middleware/otpService/otp.js";
const userRoute = express.Router();

userRoute.post("/sendotp",existingUser, sendOTP);

userRoute.post("/signup",verifyOTP, signup);

userRoute.post("/googleVerify", googleVerify);

userRoute.post("/login", login);

userRoute.get("/logout",verifyToken, logout);

userRoute.get("/getuserData",verifyToken, getData);


export default userRoute;
