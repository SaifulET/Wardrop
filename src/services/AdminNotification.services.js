import AdminNotification from "../models/AdminNotification";
import { sendNotificationToUser } from "../socket";

export const createAdminNotification = async ({ userId, RegistratedId = null, ReportId = null, FeedbackId = null,deleteId = null  }) => {
  const AdminNotification = await AdminNotification.create({
    user: userId,
    Registration: RegistratedId,
    Report: ReportId,
    Feedback: FeedbackId,
    delete:deleteId
  });

  sendNotificationToUser(userId, AdminNotification);

  return notification;
};

export const getUserNotifications = async (userId) => {
  return Notification.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("planner post adminMessage");
};

// Mark as read
export const markAsRead = async (notificationId) => {
  const notify=await  Notification.findByIdAndUpdate(notificationId, { read: true }, { 
    new: true, 
    select: "post planner read" // only post, planner and read fields
  }).populate({
  path: "post",
  select: "title image user",
  populate: {path:"user",select:"username profileImage"}
}).populate("planner");
  return notify
};