import express from 'express';
import { signup } from '../controller/vetController.js';
const vetRoute = express.Router();
vetRoute.post('/signup', signup);
export default vetRoute;
//# sourceMappingURL=VetRoute.js.map