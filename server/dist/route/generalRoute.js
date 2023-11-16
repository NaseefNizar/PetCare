import express from "express";
import { getIndividualPartnerData, getVetList, search, } from "../controller/generalController.js";
const generalRoute = express.Router();
generalRoute.get("/getvetlist", getVetList);
generalRoute.post("/getindividualdetail", getIndividualPartnerData);
generalRoute.get("/search", search);
export default generalRoute;
//# sourceMappingURL=generalRoute.js.map