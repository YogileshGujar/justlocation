import mongoose from "mongoose";
import { createUser, getAllUsers, getUserById} from "../services/userService.js";
import { Users, } from "../models/User.js";


export async function getAllUserController(req,res){
    try{
        let Users= await getAllUsers();
        return res.status(200).json(Users);

    }catch(e){
         return res(500).json({error:"Error from controller catch"});
    }
}

export async function createUserController(req,res){
    let {fname,phonNumber}=req.body;
    try{
        let user=await Users.findOne({phonNumber:phonNumber});
        if(user){
            return res.status(400).send("This User Allready exist in our Data",e);
        }else{
            let data1= await createUser(req.body);
             return res.status(200).send(data1);
        }

    }catch(e){
        return res.status(500).send("Error while Creating User ",e);
    }
}
export async function getUserByIdController(req,res){
    // let id=req.body
    try{
         let user =await getUserById(req.body);
         return res.status(200).send(user);
    }catch(e){
        return res.status(500).send("Error while geting User id of ",e)
    }
}