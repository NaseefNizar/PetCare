import Appointment from "../model/appointmentModel.js";
import { NextFunction, Request, Response } from "express";
import easyinvoice from 'easyinvoice';


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
        res.status(200).json({appointments})
    } catch {
        res.status(500).json({message:"Error getting data"})
    }
}

export const cancelAppointment = async(req:MyRequest, res:Response) => {
    try {
        console.log(req.id);
        
        const { appointmentId,slot,partnerId,date } = req.body
        const appointment = await Appointment.findByIdAndUpdate({_id:appointmentId},{
            $set:{
                status:"Cancelled"
            }
        })
        console.log(appointment);
        const appointments = await Appointment.find({userId:req.id}).populate('partnerId')    
        console.log(appointments);
        

        res.status(200).json({appointments})
        
    } catch (error) {
        res.status(500).json({message:"Error getting data"})
    }
}

export const getPartnerAppointments = async(req:MyRequest, res:Response) => {
    try {
        
        const appointments = await Appointment.find({partnerId:req.id}).populate('partnerId')
        console.log(appointments);
        res.status(200).json({appointments})
    } catch (error) {
        res.status(500).json({message:"Error getting data"})
    }
}

