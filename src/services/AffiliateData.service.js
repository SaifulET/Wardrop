// import Notification from "../models/Notification.js";
import AffiliateDatas from "../models/AffiliateData.js"
import User from "../models/User.js";

/**
 * Create notification for ALL users
 */
export const createNotificationService = async (data) => {

  const notifications = {
   
    title: data.title,
    description: data.description,
    image: data.image,
    link: data.link,
    
  };

  return await AffiliateDatas.insertMany(notifications);
  // return { message: "Notification sent to all users" };
};

/**
 * View all notifications (admin side)
 */
export const getAllNotificationsService = async () => {
  return await AffiliateDatas.find()
};

/**
 * Edit notification (update for all users)
 */
export const editNotificationService = async (id, updateData) => {
  return await AffiliateDatas.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Delete notification (remove from all users)
 */
export const deleteNotificationService = async (id) => {
  return await AffiliateDatas.findByIdAndDelete(id);
};




export const getNotificationByIdService = async (id) => {
  return await AffiliateDatas.findById(id)

};



