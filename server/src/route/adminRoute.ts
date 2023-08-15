import express from 'express'
import { getPartnerData, getUserData, login, logout, partnerAccess, userAccess, verifyToken } from '../controller/adminController.js'
const adminRoute = express.Router()

adminRoute.post('/login',login)
adminRoute.get('/getusers',verifyToken,getUserData)
adminRoute.put('/blockuser',verifyToken,userAccess)
adminRoute.get('/getpartner',verifyToken,getPartnerData)
adminRoute.put('/blockpartner',verifyToken,partnerAccess)
adminRoute.get('/logout',verifyToken,logout)

export default adminRoute