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
  let unit;

  switch (period) {
    case "weekly":
      unit = "week";
      dateFormat = {
        year: { $isoWeekYear: "$date" },
        week: { $isoWeek: "$date" }
      };
      break;
    case "monthly":
      unit = "month";
      dateFormat = {
        year: { $year: "$date" },
        month: { $month: "$date" }
      };
      break;
    case "yearly":
      unit = "year";
      dateFormat = { year: { $year: "$date" } };
      break;
    default:
      unit = "month";
      dateFormat = {
        year: { $year: "$date" },
        month: { $month: "$date" }
      };
  }

 const result = await User.aggregate([
  { $unwind: { path: "$loginHistory", preserveNullAndEmptyArrays: true } },

  {
    $addFields: {
      firstLoginPeriod: { $dateTrunc: { date: "$firstLogin", unit: unit } },
      loginPeriod: { $dateTrunc: { date: "$loginHistory.loginAt", unit: unit } }
    }
  },

  {
    $facet: {
      newUsers: [
        {
          $group: {
            _id: "$firstLoginPeriod",
            users: { $addToSet: "$_id" }
          }
        },
        { $project: { _id: 1, count: { $size: "$users" } } },
        { $sort: { _id: 1 } }
      ],

      oldUsers: [
        { $match: { $expr: { $gt: ["$loginHistory.loginAt", "$firstLogin"] } } },
        {
          $group: {
            _id: "$loginPeriod",
            users: { $addToSet: "$_id" }
          }
        },
        { $project: { _id: 1, count: { $size: "$users" } } },
        { $sort: { _id: 1 } }
      ]
    }
  }
]);

console.log( result[0].newUsers[0].count)
  return {
    newUsers:  result[0].newUsers,
    oldUsers: result[0].oldUsers
  };
};





