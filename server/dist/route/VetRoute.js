import express from 'express';
import { login, logout, signup, verifyToken, existingUser } from '../controller/partnerController.js';
import { sendOTP, verifyOTP } from "../middleware/otpService/otp.js";
const vetRoute = express.Router();
vetRoute.post("/sendotp", existingUser, sendOTP);
vetRoute.post('/signup', verifyOTP, signup);
// vetRoute.post("/googleVerify", googleVerify);
vetRoute.post('/login', login);
vetRoute.get('/logout', verifyToken, logout);
export default vetRoute;
//# sourceMappingURL=VetRoute.js.map