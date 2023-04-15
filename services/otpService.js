import mongoose from "mongoose";
import { Users } from "../models/User.js";
import dotenv from "dotenv";
import twilio from "twilio";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";



dotenv.config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioClient = twilio(accountSid, authToken);

let secretKey= 'abcdefghijkl123';

export async function otpgenerator(phonNumber){
     
         try{
        let user=await Users.findOne({phonNumber});
        console.log("for otp User ",user);
        if(!user){
            return{
              status:"error",
              message:"This User Not Exist In Our Data Base "
            }
        }
           let OTP=Math.floor(1000 + Math.random() * 9000).toString();
           console.log("for me otp ",OTP);
          const hashOtp = await bcrypt.hash(OTP,10);
           user.otp=hashOtp;
           await user.save()

          //  let optmessage=`Your OTP cod is :${OTP}`;

          //  let OtpData=await twilioClient.messages.create({
          //   body: optmessage,
          //   from: process.env.TWILIO_PHONE_NUMBER,
          //   // to: phoneNumber,
          //   to: `+91${phonNumber}`,
          // });
      
         
        return OTP;
    
                   
        

      }catch(e){
        throw new Error("Otp is not send from service",e);
      }
}

export async function otpverification(data){
  let {phonNumber,otp}=data;
  if(!phonNumber && !otp){
    return{
      status:"error",
      message:"phonNumber and otp is not coming "
    }
  }
  try{
      let otpverify=await Users.findOne({phonNumber})
      if(!otpverify){
        return{
          
          status:"error",
          message:"This User Not Exist In Our Data Base for otp verification "
        }
  }
    // return otpverify.otp
         let hashOTP=otpverify.otp;
         let matching = await bcrypt.compare(otp,otpverify.otp);
         if(!matching){
          //token
          return{
            status:"error",
            message:"OTP is not matched so verfication is faild ",otpverify
          }
         }
          //token
          let token= jwt.sign(
            {
              name:otpverify.fname,
              phonnumber:otpverify.phonNumber,
              userId:otpverify._id
            },
            secretKey,
            {expiresIn:"24h"}
          )

          let datatosend={
            fname: otpverify.fname,
            phonNumber: otpverify.phonNumber,
            _id: otpverify._id,
            token: token
          }

          return {status:'success',message:datatosend}
  
}catch(e){
    throw new Error("Otp is not verify",e);
  }

} 