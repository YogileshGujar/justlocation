import mongoose from "mongoose";
import { Invitess } from "../models/Invitess.js";
import { Meetings } from "../models/Meeting.js";


export async function getAllMeetings(){
   return await Meetings.find({})
}

export async function createMetting(data
    // requesterId,
    // receiverIds,
    // startDateTime,
    // endDateTime
    ){
        const {meetingName,description, requesterId, receiverIds, startDateTime, endDateTime } = data;
    
         try{  
            let meeting = await Meetings.create({
                meetingName,description,
                requesterId,
                receiverIds,
                startDateTime,
                endDateTime, 
            });

            for(const receiver of receiverIds){
                await Invitess.create({
                    meetingId: meeting._id,
                    receiverId: receiver,
                    status: "pending",
                });
            }
                return meeting;
         }catch(e){
             return {status:"error",message:"error while creating meeting"};
         }
    // let data=[];
    // data.push(meetinData);
    // return await Meetings.insertMany(data);
}

export async function UpdateMeeting(data){
    let {meetingName,description,  receiverIds, startDateTime, endDateTime,_id } = data;
    // let {meetingName,_id} = data;
    

    try{
        let meetingData =await Meetings.findById(_id);
        console.log(meetingData)
        if(!meetingData){
            return{status:"error",message:"Meeting is not find fro update"};
        }else{
            console.log("leterr ",meetingData);
      
        
            if(meetingName !== undefined && meetingName !== ''){
                meetingData.meetingName = meetingName;
                console.log("leterr from ",meetingData.meetingName);
            }
            if(description !== undefined && description !== ''){
                meetingData.description = description;
            }
            if(startDateTime !== undefined && startDateTime !== ''){
                meetingData.startDateTime = startDateTime;
            }
            if(endDateTime !== undefined && endDateTime !== ''){
                meetingData.endDateTime = endDateTime;
            }
            if(receiverIds.length > 0){
                const uniqueReceiverIds = receiverIds.filter((newReceiverId) => !meetingData.receiverIds.includes(newReceiverId));
                meetingData.receiverIds = meetingData.receiverIds.concat(uniqueReceiverIds);
                
                for(const receiver of uniqueReceiverIds){
                    await Invitess.create({
                        meetingId: meetingData._id,
                        receiverId: receiver,
                        status: "pending",
                    });
                }
    
            }
            
            meetingData.save();
            return{status:"success",message:"Meeting data updated",meetingData}; 
        }
         
    }catch(e){
        return{status:"error",message:"Error from update meeting data catch service"};
    }
     
}

export async function updateMeetingStatus(meetingId, receiverId, status){
   
    console.log("data ",meetingId, receiverId, status);
    try{
        // let {meetingId, receiverId, status}=updatedata;
       
        let invitess =await Invitess.findOneAndUpdate(
            {meetingId,receiverId},
            {status},
            {new:true}
        )
        // ).populate("meetingId");
        console.log("data1 ",invitess);

        if(!invitess){
            return{status:"error",message:"invitess not finde"};
        }
        let  allInviteess = await Invitess.find({meetingId});

        let allInviteessStatues=allInviteess.map((invitess)=>invitess.status);

        if(!allInviteessStatues.includes("pending")){
            let meeting=await Meetings.findByIdAndUpdate(
                meetingId,
                {status: "completed"},
                {new: true}
            )

            // .populate("requesterId")
            // .populate("receiverIds");
            return meeting;
        }
         
        return invitess.meetingId
    }catch(e){
         return{status:"error",message:"Error from service updating meeting status"}
    }
}