import { createReportService, deleteReportByIdService, getAllReportsService, searchReportsService, toggleReportStatusService } from "../services/Report.service.js";

export const createReportController = async (req, res) => {
  try {
    const {   reason, reportType } = req.body;
    console.log(req.body)
    const reporterId = req.headers.user_id;
    
    if(reportType==="post"){
      const {targetCommunityId} = req.body
      const report = await createReportService({
      reporterId,
      targetCommunityId,
      reason,
      reportType,
    });
    res.status(201).json({ message: "Report submitted successfully", report });
      
    }
    else{
       const {targetUserId} = req.body
        const report = await createReportService({
      reporterId,
      targetUserId,
      
      reason,
      reportType,
    });
    res.status(201).json({ message: "Report submitted successfully", report });
      
    }
    
    // const report = await createReportService({
    //   reporterId,
    //   targetUserId,
    //   targetCommunityId,
    //   reason,
    //   reportType,
    // });
// console.log(report)
//     res.status(201).json({ message: "Report submitted successfully", report });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllReportsController = async (req, res) => {
  try {
    const reports = await getAllReportsService();
    res.status(200).json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const deleteReportByIdController = async (req, res) => {
  try {
    const { reportId } = req.body;
    const result = await deleteReportByIdService(reportId);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const toggleReportStatusController = async (req, res) => {
  try {
    const { reportId } = req.body;
    const updatedReport = await toggleReportStatusService(reportId);
    res.status(200).json({ success: true, report: updatedReport });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchReportsController = async (req, res) => {
  try {
    const { username, reportType, status } = req.body;

    const filters = { username, reportType, status };
    const reports = await searchReportsService(filters);

    res.status(200).json({
      success: true,
      reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};