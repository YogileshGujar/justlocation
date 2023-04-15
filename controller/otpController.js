
import mongoose from "mongoose";
import { Users } from "../models/User.js";
import { otpgenerator, otpverification } from "../services/otpService.js";

import dotenv from "dotenv";
import twilio from "twilio";


dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);



export async function otpgeneratorController(req,res){
    let {phonNumber}=req.body;
      try{
        if(!phonNumber){
          return res.status(400).send({error:"Please Enter Your PhonNumber"})
        }
          let otpdata= await otpgenerator(phonNumber);
          return res.status(200).json({resdata:otpdata})
      }catch(e){
        return res.status(400).json({error:"Otp is not send"})
      }
      
      
          
}

export async function otpverificationController(req,res){
  
  try{
       let verifyData=await otpverification(req.body);
       if(verifyData.status === "error"){
        return res.status(401).send(verifyData.message);
       }
       return res.status(200).json(verifyData);
  }catch(e){
    return res.status(400).json({error:"Otp is not verify catch"})
  }
}