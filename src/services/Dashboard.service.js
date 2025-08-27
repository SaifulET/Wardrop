import User from "../models/User.js";
import Outfit from "../models/Outfit.js";
import Community from "../models/Community.js";
import Feedback from "../models/Feedback.js";
import AffiliateData from "../models/AffiliateData.js";

export const getTotalUsers = async () => {
  return await User.countDocuments();
};

export const getActiveUsers = async () => {
  return await User.countDocuments({ active: true });
};

export const getDailyUploadedOutfits = async (date = new Date()) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return await Outfit.countDocuments({ createdAt: { $gte: start, $lte: end } });
};

export const getTotalFeedbacks = async () => {
  return await Feedback.countDocuments();
};
export const getTotalAffiliateData = async () => {
  return await AffiliateData.countDocuments();
};

export const countDisabledUsers = async () => {
  return await User.countDocuments({ disabled: true });
};
export const countReports = async () => {
  return await Community.countDocuments();
};


export const countAllReports = async () => {
  // count profile reports in user schema
  const profileReports = await User.aggregate([
    { $unwind: "$reports" },
    { $count: "totalProfileReports" }
  ]);

  // count post reports in community schema
  const postReports = await Community.aggregate([
    { $unwind: "$reports" },
    { $count: "totalPostReports" }
  ]);

  return {
    profileReports: profileReports.length ? profileReports[0].totalProfileReports : 0,
    postReports: postReports.length ? postReports[0].totalPostReports : 0,
    totalReports:
      (profileReports.length ? profileReports[0].totalProfileReports : 0) +
      (postReports.length ? postReports[0].totalPostReports : 0)
  };
}



export const getReportsWithPost = async () => {
  return await Community.aggregate([
    { $unwind: "$reports" },
    {
      $project: {
        reportId: "$reports._id",
        post: 1,
        user: "$reports.user",
        message: "$reports.message",
        reportedAt: "$reports.reportedAt",
      },
    },
  ]);
};

// ✅ Get only report IDs
export const getReportsIdsOnly = async () => {
  return await Community.aggregate([
    { $unwind: "$reports" },
    { $project: { reportId: "$reports._id" } },
  ]);
};



export const getUserActivityStats = async (period = "monthly") => {
  let dateFormat;

  switch (period) {
    case "weekly":
      dateFormat = { year: { $year: "$loginHistory.loginAt" }, week: { $isoWeek: "$loginHistory.loginAt" } };
      break;
    case "monthly":
      dateFormat = { year: { $year: "$loginHistory.loginAt" }, month: { $month: "$loginHistory.loginAt" } };
      break;
    case "yearly":
      dateFormat = { year: { $year: "$loginHistory.loginAt" } };
      break;
    default:
      dateFormat = { year: { $year: "$loginHistory.loginAt" }, month: { $month: "$loginHistory.loginAt" } };
  }

  // Aggregate
  const result = await User.aggregate([
    { $unwind: "$loginHistory" },
    {
      $facet: {
        newUsers: [
          { $match: { $expr: { $eq: ["$loginHistory.loginAt", "$firstLogin"] } } }, // first login during period
          { $group: { _id: dateFormat, count: { $sum: 1 } } },
          { $sort: { "_id.year": 1, "_id.month": 1, "_id.week": 1 } }
        ],
        oldUsers: [
          { $match: { $expr: { $gt: ["$loginHistory.loginAt", "$firstLogin"] } } }, // subsequent login
          { $group: { _id: dateFormat, count: { $sum: 1 } } },
          { $sort: { "_id.year": 1, "_id.month": 1, "_id.week": 1 } }
        ]
      }
    }
  ]);

  const newUsersData = result[0].newUsers || [];
  const oldUsersData = result[0].oldUsers || [];

  const newUsersTotal = newUsersData.reduce((acc, val) => acc + val.count, 0);
  const oldUsersTotal = oldUsersData.reduce((acc, val) => acc + val.count, 0);

  return {
    newUsers: { data: newUsersData, total: newUsersTotal },
    oldUsers: { data: oldUsersData, total: oldUsersTotal }
  };
};




