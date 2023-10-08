import express from 'express';
import { getVetList } from '../controller/generalController.js';
const listRoute = express.Router();
listRoute.get('/getvetlist', getVetList);
export default listRoute;
//# sourceMappingURL=listRoute.js.map