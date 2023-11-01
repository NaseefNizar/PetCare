import express from "express";
import { verifyToken } from "../controller/partnerController.js";
import { getAllAppointments, userAppointments } from "../controller/appointmentController.js";
const appointmentRoute = express.Router();
appointmentRoute.get('/getallappointments', verifyToken, getAllAppointments);
appointmentRoute.get('/userappointments', verifyToken, userAppointments);
export default appointmentRoute;
//# sourceMappingURL=appointmentRoute.js.map