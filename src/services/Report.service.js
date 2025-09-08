import Report from "../models/Report.js";
import Community from "../models/Community.js";
import Outfit from "../models/Outfit.js"; 
import User from "../models/User.js";
import { createAdminNotification } from "./AdminNotification.services.js";

export const createReportService = async ({ reporterId, targetUserId, targetCommunityId, reason, reportType }) => {
  console.log(reporterId,targetUserId,targetCommunityId,reason,reportType)

  if (!["Profile", "Post"].includes(reportType)) {
    throw new Error("Invalid report type");
  }

  if (reportType === "Post") {
    if (!targetCommunityId) throw new Error("targetCommunityId required for post report");

    // fetch the Community post to get its owner
    const community = await Community.findById(targetCommunityId)
    
    if (!community) throw new Error("Community post not found");

    const report= await Report.create({
      reporter: reporterId,
      targetUser:  community.user, 
      targetCommunity: targetCommunityId,
      reason,
      reportType,
    });

    await createAdminNotification({
      userId: reporterId,
      ReportId: report._id
    });
    return report 
  }

  if (reportType === "Profile") {
    if (!targetUserId) throw new Error("targetUserId required for user report");

    const report= await Report.create({
      reporter: reporterId,
      targetUser: targetUserId,
      reason,
      reportType,
    });
    await createAdminNotification({
      userId: reporterId,
      ReportId: report._id
    });
    return report
  }
};



export const getAllReportsService = async () => {
  // Fetch all reports sorted by newest first
  const reports = await Report.find()
    .populate("reporter", "username email profileImage") // who reported
    .populate("targetUser", "username email profileImage") // if type user
    .populate({
      path: "targetCommunity",
      populate: { path: "post", select: "title image user", populate: { path: "user", select: "username email profileImage" } }
    }) // if type post
    .sort({ createdAt: -1 })
    .select("reportType reason targetUser targetCommunity reporter status createdAt");  

  return reports;
};


// 1️⃣ Delete report by ID
export const deleteReportByIdService = async (reportId) => {
  const report = await Report.findById(reportId);
  if (!report) throw new Error("Report not found");

  if (report.reportType === "Post" && report.targetCommunity) {
    // Delete the community post
    const community = await Community.findById(report.targetCommunity);
    if (community) {
      await Outfit.findByIdAndDelete(community.post); // delete outfit
      await Community.findByIdAndDelete(community._id); // delete community reference
    }
  }

  // Delete the report itself
  await Report.findByIdAndDelete(reportId);

  return { message: "Report and related post (if any) deleted successfully" };
};

// 2️⃣ Toggle report status
export const toggleReportStatusService = async (reportId) => {
  const report = await Report.findById(reportId);
  if (!report) throw new Error("Report not found");

  // Toggle between "pending" and "banned"
  report.status = report.status === "Pending" ? "Banned" : "Pending";
  await report.save();
  console.log(report.status)
  // If banned and post type, deactivate related post
  if (report.status === "Banned" && report.reportType === "Post" && report.targetCommunity) {
    const community = await Community.findById(report.targetCommunity);
    if (community) {
      await Outfit.findByIdAndUpdate(community.post, { active: false }); // deactivate post
    }
  }
  console.log(report.targetUser.toString())
  if(report.status==="Banned" && report.reportType==="Profile" ){
    await User.findByIdAndUpdate({_id:report.targetUser.toString()}, { disabled:true }); 
  }

  return report;
};



// Dynamic search service
export const searchReportsService = async (filters) => {
  const { username, reportType, status } = filters;

  // Build query dynamically
  const query = {};
console.log(reportType)
  if (reportType) query.reportType = reportType; // filter by "post" or "user"
  if (status) query.status = status;             // filter by "pending" or "banned"

  // If username provided, find user IDs for reporter or target
  if (username) {
    const users = await User.find({ username: { $regex: username, $options: "i" } });
    const userIds = users.map(u => u._id);

    query.$or = [
      { reporter: { $in: userIds } },
      { targetUser: { $in: userIds } }
    ];
  }

  // Fetch reports with populates
  const reports = await Report.find(query)
    .populate("reporter", "username email profileImage")
    .populate("targetUser", "username email profileImage")
    .populate({
      path: "targetCommunity",
      populate: {
        path: "post",
        select: "title image user",
        populate: { path: "user", select: "username email profileImage" }
      }
    })
    .sort({ createdAt: -1 }) // newest first
    .select("reportType reason status targetUser targetCommunity reporter createdAt");

  return reports;
};

