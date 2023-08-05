import express from 'express'
import { login } from '../controller/adminController.js'
const adminRoute = express.Router()

adminRoute.post('/login',login)

export default adminRoute