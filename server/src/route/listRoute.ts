import express from 'express'
import { getVetList } from '../controller/listController.js'

const listRoute = express.Router()

listRoute.get('/getvetlist',getVetList)

export default listRoute