import {
  createNotificationService,
  getAllNotificationsService,
  editNotificationService,
  deleteNotificationService,
  getNotificationByIdService
} from "../services/AffiliateData.service.js";

export const createAffiliateData = async (req, res) => {
  try {
    const result = await createNotificationService(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllAffiliateData = async (req, res) => {
  try {
    const notifications = await getAllNotificationsService();
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editAffiliateData = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await editNotificationService(id, req.body);
    if (!notification) return res.status(404).json({ success: false, message: "Notification not found" });
    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAffiliateData = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteNotificationService(id);
    if (!result) return res.status(404).json({ success: false, message: "Notification not found" });
    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};






export const getAffiliatedDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await getNotificationByIdService(id);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }
    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};