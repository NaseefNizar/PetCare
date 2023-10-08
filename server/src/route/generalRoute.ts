import express from 'express'
import { getIndividualPartnerData, getVetList } from '../controller/generalController.js'

const generalRoute = express.Router()

generalRoute.get('/getvetlist',getVetList)

generalRoute.post('/getindividualdetail',getIndividualPartnerData)

export default generalRoute