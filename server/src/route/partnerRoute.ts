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
  forgotPassword,
  verifyPasswordOTP,
  setNewPassword,
  kycUpdate,
  kycDocumentUpload,
  addSlot,
} from "../controller/partnerController.js";
import { sendOTP, verifyOTP } from "../middleware/otpService/otp.js";
import { upload } from "../middleware/multer/multer.js";
import { partnerBlocked } from "../middleware/partnerMiddleware/blocked.js";

const partnerRoute = express.Router();

partnerRoute.post("/sendotp", existingUser, sendOTP);

partnerRoute.post("/signup", verifyOTP, signup);

// partnerRoute.post("/googleVerify", googleVerify);

partnerRoute.post("/login", login);

partnerRoute.get("/getpartnerdata", verifyToken, partnerBlocked, getPartnerData);

partnerRoute.get("/logout", verifyToken, logout);

partnerRoute.patch("/updatepartner", verifyToken, updatePartner);

partnerRoute.patch(
  "/updatepartnerprofilepic",
  verifyToken,
  upload.single("image"),
  updatePartnerProfilePic
);


partnerRoute.post('/forgotpassword',forgotPassword,sendOTP)

partnerRoute.post('/verifyotppassword',verifyPasswordOTP)

partnerRoute.post('/setnewpassword',setNewPassword)

partnerRoute.patch('/kycupdate',verifyToken,upload.fields([
  {name:'poi', maxCount: 1},
  {name:'poq', maxCount: 1},
  {name:'photo', maxCount: 1},
]),kycUpdate)

partnerRoute.patch('/kycdocumentupload',verifyToken,upload.fields([
  {name:'poi', maxCount: 1},
  {name:'poq', maxCount: 1},
]),kycDocumentUpload)


partnerRoute.patch('/addslot',verifyToken,addSlot)

export default partnerRoute;
