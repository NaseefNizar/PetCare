import express from "express";
import {
  getDashboardData,
  getPartnerData,
  getUnverifiedPartner,
  getUserData,
  getallappointments,
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
adminRoute.get('/getadmindashboard',verifyToken,getDashboardData)
adminRoute.get('/appointments',verifyToken,getallappointments)

export default adminRoute;
