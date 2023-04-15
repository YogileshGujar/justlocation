import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes.js";
import cors from 'cors';


const app =express();
app.use(express.json());
 app.use(cors());

 const databaseUrl= 'mongodb+srv://locationYogi:yogi123@cluster0.bgwgx0g.mongodb.net/test';
mongoose.set('strictQuery', true);
mongoose.connect(databaseUrl,);
const database=mongoose.connection;

database.on('error',(error)=>{
    console.log('Error while conecting to datbase')
})

database.once('connected',()=>{
    console.log("Connected to data base111")
})

app.use(routes);

app.listen(5000,()=>{
    console.log("server is running on port 5000")
})