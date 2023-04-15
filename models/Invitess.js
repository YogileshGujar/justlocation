import mongoose from "mongoose";
import { Schema, Types } from "mongoose";

const invitessSchema = new mongoose.Schema({
    meetingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Meetings",
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",

    },
    // invitess:[{phonNumber:Number,status:String}],
    
    // createdphonNumber:{type:Schema.Types.Mixed},
    
},)
const Invitess = mongoose.model('invitess',invitessSchema);
export {Invitess};