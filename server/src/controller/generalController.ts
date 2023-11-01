import { NextFunction, Request, Response } from "express";
import Partner from '../model/PartnerModel.js'
// import { log } from "console";


export const getVetList = async(req:Request, res:Response) => {
    try {
        const vetList = await Partner.find({role:'Vet',is_verified:true})
        console.log(vetList);
    
        res.status(200).json({ vetList })
    } catch (error) {
        res.status(500).json({message:"Error getting data"})
    }
}


export const getIndividualPartnerData = async(req:Request, res:Response) => {
    try {
        const {partnerId} = req.body
        console.log(partnerId);
        
        const partnerData = await Partner.findById(partnerId)
        console.log(partnerData);
        
        res.status(200).json({partnerData})
    } catch (error) {
        res.status(500).json({message:"Error getting Data"})
    }
}
