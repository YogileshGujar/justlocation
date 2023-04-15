import mongoose from "mongoose";

import { createMetting, getAllMeetings, UpdateMeeting, updateMeetingStatus } from "../services/createMeetingService.js";


export async function getAllMeetingController(req,res){
    try{
        let allMeeting= await getAllMeetings();
         return res.status(200).json(allMeeting);

    }catch(e){
         return res.status(500).json({Error:"Error from controller catch getMeetings"})
    }
}

export async function createmeetingController(req,res){
    // const { requesterId, receiverIds, startDateTime, endDateTime } = req.body;
    try{
       
        let meeting= await createMetting(req.body);
        // let meeting= await createMetting( 
        //     requesterId,
        //     receiverIds,
        //     startDateTime,
        //     endDateTime
        //     );

        res.status(200).json(meeting);

    }catch(e){
        res.status(400).json({message:" error from Meeting Controller (catch)"},e);
    }
}

export async function updatemeetingController(req,res){
    try{
          let updateMeeting=await UpdateMeeting(req.body);
          if(updateMeeting.status === 'success'){
            return res.status(200).json({message:updateMeeting.message,data:updateMeeting.meetingData});
          }else
          return res.status(500).json(updateMeeting.message);
    }catch(e){
        res.status(400).json({message:" meeting no updated from (catch)"},e);
    }
}

export async function updateMeetingStatusController(req,res){

    try{
        const { meetingId, receiverId, status } = req.body;
          let updatMeeting= await updateMeetingStatus(meetingId, receiverId, status);

          if(updatMeeting.status ==="error"){
            return res.status(400).json({message:updatMeeting.message});
          }
          return res.json(updatMeeting);
    }catch(e){
             return res.status(500).json({message: "error from updateMeeting Controller (catch)"})
    }
}


export async function acceptMeetingrequestController(req, res){
         let meetingId =req.meetingId;
         let receiverId = req.receiverId;
         let status =  "accepted"

    try{
        let updateMeeting=await updateMeetingStatus(meetingId,receiverId,status);

        if(!updateMeeting){
            return res.status(400).json({message:"Meeting not  find"});
        }
        res.status(200).json(updateMeeting);

    }catch(e){
        return res.status(500).json({mesage: "error from acceptMeeting Controller (catch)"},e)
    }
}

export async function rejectMeetingrequestController(req,res){
    let meetingId =req.meetingId;
    try{
        let rejectMeeting= await updateMeetingStatus(meetingId,null,"rejected");

        if(!rejectMeeting){
            return res.status(400).json({message:"Meeting not  find"});
        }

    }catch(e){
        return res.status(500).json({mesage: "error from rejectMeeting Controller (catch)"},e)
    }
}

// export async function createmeetingController(req,res){
//     // let {createdphonNumber}=req.body;
//     try{
//         // let user=await Users.findOne({phonNumber:createdphonNumber});
//         // if(user){
//         //     return res.status(400).send("This User Allready exist in our Data",e);
//         // }else{
//         //     let data1= await createMetting(req.body);
//         //      return res.status(200).send(data1);
//         // }
//         let data1= await createMetting(req.body);
//         return res.status(200).send(data1);

//     }catch(e){
//         return res.status(500).send("Error while Creating Meeting ",e);
//     }
// }