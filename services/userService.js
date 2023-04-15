import mongoose from "mongoose";
import { Users } from "../models/User.js";

export async function createUser(userData){
   
    let users=[];
    users.push(userData);
    return await Users.insertMany(users);
}

export async function getAllUsers(){
    return await Users.find({})
}

export async function getUserById(userId){
    return await Users.find({"_id":userId});
}

export async function updateuser(id,data){
    return await Users.updateOne({_id:id},{$set:data});
}