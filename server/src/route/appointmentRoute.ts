import express from "express";
import { verifyToken } from "../controller/partnerController.js";
import { cancelAppointment, getAllAppointments, getPartnerAppointments, userAppointments } from "../controller/appointmentController.js";

const appointmentRoute = express.Router()

appointmentRoute.get('/getallappointments',verifyToken,getAllAppointments)
appointmentRoute.get('/userappointments',verifyToken,userAppointments)
appointmentRoute.post('/cancelappointment',verifyToken,cancelAppointment)
appointmentRoute.get('/getpartnerappointment',verifyToken,getPartnerAppointments)

export default appointmentRoute