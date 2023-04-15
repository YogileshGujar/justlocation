import { Invitess } from "../models/Invitess.js";



export async function allinvites(){
    return await Invitess.find({});
}

// export async function postInvite(meetingId, invites){
//     // let data=[];
    // data.push(invitedata);
//     export async function postInvite(invitedata){
//         let { meetingId, invitess } = invitedata;
//         let inviteId= await Invitess.findOne({meetingId});
//         // return inviteId
//         if(!inviteId){
//             let data=[];
//             data.push(invitedata);
//         return await Invitess.insertMany(data);
//         }else{
//             const { phonNumber, status, _id } =invitess;
//              await inviteId.invitess.push(invitess[0]);
//             // await inviteId.invitess.push(...inviteId.invitess,{phonNumber,status});
//             return await inviteId.save();
//             // return await Invitess.insertMany({ meetingId, invitess: invites });
//             // return await Invitess.insertMany({...invitess, invitess:invitess});
//         }
        
       

// }
