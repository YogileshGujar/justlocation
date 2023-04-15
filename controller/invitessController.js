import { allinvites } from "../services/invitessService.js";

export async function getAllinvitessController(req,res){
    try{
        let allinvitess=await allinvites();
        if(!allinvitess){
            res.status(400).json({error:"invites data notfound"})
        }
        return res.status(200).json({data:allinvitess})

    }catch(e){
        return res.status(400).json({error:"invite failed from controller catch"})
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

// import { postInvite } from "../services/invitessService.js";

// export async function inviteOtherController(req,res){
//     try{
//         // const { meetingId, invitess } = req.body;
//         // let invite=await postInvite( meetingId, invitess);
//         let invite=await postInvite(req.body);
//         if(!invite){
//             return res.status(400).json({error:"invite from controller is failde"})
//         }else{
//             return res.status(200).json({invitess:invite})
//         }
       

//     }catch(e){
//         return res.status(400).json({error:"invite failed"})
//     }
// }