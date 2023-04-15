import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    phonNumber:{
        type:Number,
        required:true,
        trim:true,
        unique:true
    },
    otp:{
        type:String,
        trim:true
    },
    Location:{
            lat:String,
            long:String  
}
},{timestamps:true})
const Users = mongoose.model('users',userSchema);
export {Users};