import express from "express";
import {
  getPartnerData,
  getUnverifiedPartner,
  getUserData,
  individualPartnerData,
  login,
  logout,
  partnerAccess,
  partnerApproval,
  userAccess,
  verifyToken,
} from "../controller/adminController.js";


const adminRoute = express.Router();

adminRoute.post("/login", login);
adminRoute.get("/getusers", verifyToken, getUserData);
adminRoute.put("/blockuser", verifyToken, userAccess);
adminRoute.get("/getpartner", verifyToken, getPartnerData);
adminRoute.get("/getunverifiedpartner", verifyToken, getUnverifiedPartner);
adminRoute.post("/getindividualpartner", verifyToken, individualPartnerData);
adminRoute.put("/blockpartner", verifyToken, partnerAccess);
adminRoute.patch("/approvepartner", verifyToken, partnerApproval);
adminRoute.get("/logout", verifyToken, logout);

export default adminRoute;
