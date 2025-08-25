import AffiliateData from "../models/AffiliateData.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const createAffiliateDataService = async (data) => {
  // 1. Save affiliate section
  const affiliate = await AffiliateData.create(data);

  // 2. Prepare notifications for all users
  const users = await User.find({}, "_id");

  const notifications = users.map((user) => {
    
    return {
      user: user._id,
      adminMessage: {
        title: affiliate.title,
        description: affiliate.description,
        image: affiliate.image,
        link: affiliate.link
      },
      status: "active",
      read: false
    };
  });

  await Notification.insertMany(notifications);
  return affiliate;
};
