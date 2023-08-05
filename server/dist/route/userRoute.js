import express from 'express';
import { googleVerify, login, signup } from '../controller/userController.js';
const userRoute = express.Router();
userRoute.post('/signup', signup);
userRoute.post('/googleVerify', googleVerify);
userRoute.post('/login', login);
export default userRoute;
//# sourceMappingURL=userRoute.js.map