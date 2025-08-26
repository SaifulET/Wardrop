import AdminNotification from "../models/AdminNotification.js";
import { sendNotificationToAdmin, sendNotificationToUser } from "../socket";

export const createAdminNotification = async ({ userId, RegistratedId = null, ReportId = null, FeedbackId = null,deleteId = null  }) => {
  const AdminnNotification = await AdminNotification.create({
    user: userId,
    Registration: RegistratedId,
    Report: ReportId,
    Feedback: FeedbackId,
    delete:deleteId
  });

  sendNotificationToAdmin(userId, AdminnNotification);

  return AdminnNotification;
};

export const getUserNotifications = async (userId) => {
  return AdminNotification.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("Registration Report Feedback delete");
};

// Mark as read
export const markAsRead = async (notificationId) => {
  const notify=await  AdminNotification.findByIdAndUpdate(notificationId, { read: true }, { 
    new: true, 
    select: "Registration Report Feedback delete read" // only post, planner and read fields
  })
  return notify
};