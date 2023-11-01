import Appointment from "../model/appointmentModel.js";
import { NextFunction, Request, Response } from "express";


interface MyRequest extends Request {
    id?: string;
  }

export const getAllAppointments = async(req:MyRequest,res:Response) => {
    try{
    const appointments = await Appointment.find({partnerId:req.id}).populate('userId')
    res.status(200).json({appointments})
    } catch {
        res.status(500).json({message:"Error getiing data"})
    }
}


export const userAppointments = async(req:MyRequest, res:Response) => {
    try{
        const appointments = await Appointment.find({userId:req.id}).populate('partnerId') 
        console.log(appointments);      
        res.status(200).json({appointments})
    } catch {
        res.status(500).json({message:"Error getting data"})
    }
}