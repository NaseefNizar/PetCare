import express from 'express';
import { createPaymentIntent, webhook } from '../controller/paymentController.js';
import { verifyToken } from '../controller/userController.js';



const paymentRoute = express.Router()

paymentRoute.post("/createpaymentintent",verifyToken,createPaymentIntent)

paymentRoute.post('/webhook',webhook)

export default paymentRoute