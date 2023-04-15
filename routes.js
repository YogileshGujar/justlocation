import  express  from "express";
import { authenticate } from "./auth.js";
import { createmeetingController, getAllMeetingController, updatemeetingController, updateMeetingStatusController } from "./controller/createMeetingController.js";
import { getAllinvitessController } from "./controller/invitessController.js";

import { findLocationController } from "./controller/locationController.js";
import { otpgeneratorController, otpverificationController } from "./controller/otpController.js";
import { createUserController, getAllUserController, getUserByIdController } from "./controller/userController.js";
const router = express.Router();

router.post('/api/createUser',createUserController);
router.post('/api/otpgenerator',otpgeneratorController);
router.post('/api/otpverification',otpverificationController);
// router.post('/api/otpverification',authenticate,otpverificationController);
router.post('/api/getLocation',findLocationController)

//Meetings

// router.get('/api/getAllMeetings',getAllMeetingController);
router.get('/api/getAllMeetings',getAllMeetingController);
router.post('/api/createMeeting',authenticate,createmeetingController);
router.post('/api/updateStatusMeeting',authenticate,updateMeetingStatusController);//..........
router.post('/api/UpdateMeeting',authenticate,updatemeetingController);


//Users
router.get('/api/getAllUsers',getAllUserController);
router.post('/api/getUsers',getUserByIdController);

//Invitess
router.get('/api/getAllInvites',getAllinvitessController);


export {router as routes};