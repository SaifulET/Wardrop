import AdminNotification from "../models/AdminNotification.js";
import { sendNotificationToAdmin, } from "../socket.js";

export const createAdminNotification = async ({ userId, RegistratedId = null, ReportId = null, FeedbackId = null,deleteId = null  }) => {
let AdminnNotification;
  if(RegistratedId)
  {
       AdminnNotification = await AdminNotification.create({
    user: userId,
    Registration: RegistratedId,
  });
  }
  if(ReportId){
       AdminnNotification = await AdminNotification.create({
    user: userId,
    Report: ReportId,
  });
  }
  if(FeedbackId){
       AdminnNotification = await AdminNotification.create({
    user: userId,
    Feedback: FeedbackId,
  });
  }
  if(deleteId){
       AdminnNotification = await AdminNotification.create({
    user: userId,
    delete:deleteId
  });
  }

  sendNotificationToAdmin(userId, AdminnNotification);

  return AdminnNotification;
};

export const getAdminNotifications = async (userId) => {
  return AdminNotification.find()
    .sort({ createdAt: -1 })
    .populate("Registration Report Feedback delete");
};

// Mark as read
export const markAsReadAdminNotifications = async (notificationId) => {
  const notify=await  AdminNotification.findByIdAndUpdate(notificationId, { read: true }, { 
    new: true, 
    select: "Registration Report Feedback delete read" 
  })
  return notify
};