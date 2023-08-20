import express from "express";
import {
  googleVerify,
  login,
  logout,
  signup,
  verifyToken,
  existingUser,
  getPartnerData,
  updatePartner,
  updatePartnerProfilePic,
} from "../controller/partnerController.js";
import { sendOTP, verifyOTP } from "../middleware/otpService/otp.js";
import { upload } from "../middleware/multer/multer.js";

const partnerRoute = express.Router();

partnerRoute.post("/sendotp", existingUser, sendOTP);

partnerRoute.post("/signup", verifyOTP, signup);

// partnerRoute.post("/googleVerify", googleVerify);

partnerRoute.post("/login", login);

partnerRoute.get("/getpartnerdata", verifyToken, getPartnerData);

partnerRoute.get("/logout", verifyToken, logout);

partnerRoute.patch("/updatepartner", verifyToken, updatePartner);

partnerRoute.patch(
  "/updatepartnerprofilepic",
  verifyToken,
  upload.single("image"),
  updatePartnerProfilePic
);

export default partnerRoute;
