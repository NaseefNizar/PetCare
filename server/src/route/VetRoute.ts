import express from 'express';
import { googleVerify, login, signup } from '../controller/partnerController.js';
const vetRoute = express.Router();

vetRoute.post('/signup',signup);
vetRoute.post('/login',login);

export default vetRoute