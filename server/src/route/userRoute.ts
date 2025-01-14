import express from "express";
import {
  addPetDetail,
  existingUser,
  forgotPassword,
  getData,
  getPetDetail,
  googleVerify,
  login,
  logout,
  setNewPassword,
  signup,
  updateContact,
  updateProfilePic,
  updateUser,
  verifyPasswordOTP,
  verifyToken,
} from "../controller/userController.js";
import { sendOTP, verifyOTP } from "../middleware/otpService/otp.js";
import { upload } from "../middleware/multer/multer.js";
import { verifyBlock } from "../middleware/userMiddlewares/blockedUser.js";

const userRoute = express.Router();

userRoute.post("/sendotp", existingUser, sendOTP);

userRoute.post("/otp", sendOTP);

userRoute.post("/signup", verifyOTP, signup);

userRoute.post("/updatecontact", verifyOTP, updateContact);

userRoute.post("/addpetdetail", verifyToken, addPetDetail);

userRoute.get("/getpetdetail", verifyToken, getPetDetail);

userRoute.post("/googleVerify", googleVerify);

userRoute.post("/login", login);

userRoute.get("/logout", verifyToken, logout);

userRoute.get("/getuserData", verifyToken,verifyBlock, getData);

userRoute.patch("/updateuser", verifyToken, updateUser);

userRoute.patch(
  "/updateprofilepic",
  verifyToken,
  upload.single("image"),
  updateProfilePic
);


userRoute.post('/forgotpassword',forgotPassword,sendOTP)

userRoute.post('/verifyotppassword',verifyPasswordOTP)

userRoute.post('/setnewpassword',setNewPassword)

export default userRoute;
