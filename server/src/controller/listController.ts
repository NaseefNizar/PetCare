import { NextFunction, Request, Response } from "express";
import Partner from '../model/PartnerModel.js'


export const getVetList = async(req:Request, res:Response) => {
    try {
        const vetList = await Partner.find({role:'Vet',is_verified:true}).populate('kycDataId')
        console.log(vetList);
    
        res.status(200).json({ vetList })
    } catch (error) {
        res.status(500).json({message:"Error getting data"})
    }
}