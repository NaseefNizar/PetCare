import express from "express";
import { existingUser, getData, googleVerify, login, logout, signup, updateProfilePic, updateUser, verifyToken, } from "../controller/userController.js";
import { sendOTP, verifyOTP } from "../middleware/otpService/otp.js";
import { upload } from "../middleware/multer/multer.js";
const userRoute = express.Router();
userRoute.post("/sendotp", existingUser, sendOTP);
userRoute.post("/signup", verifyOTP, signup);
userRoute.post("/googleVerify", googleVerify);
userRoute.post("/login", login);
userRoute.get("/logout", verifyToken, logout);
userRoute.get("/getuserData", verifyToken, getData);
userRoute.patch("/updateuser", verifyToken, updateUser);
userRoute.patch("/updateprofilepic", verifyToken, upload.single("image"), updateProfilePic);
export default userRoute;
//# sourceMappingURL=userRoute.js.map