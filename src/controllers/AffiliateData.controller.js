import { createAffiliateDataService } from "../services/AffiliateData.service.js";

export const createAffiliateData = async (req, res) => {
  try {
    const { title, description, image, link} = req.body;

    const affiliate = await createAffiliateDataService(
      { title, description, image, link },
      
    );

    res.status(201).json({
      success: true,
      data: affiliate,
      message: "Affiliate section created with per-user status"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
