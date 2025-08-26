import Metarial from "../models/Materials.js";

// Create Style (Admin only)
export const createMetarialsService = async (MetarialsData, adminId) => {
  const Metarials = await Metarial.create({ ...MetarialsData, createdBy: adminId });
  return Metarials;
};

// Edit Style (Admin only)
export const updateMetarialsService = async (MetarialsId, updateData) => {
  const Metarials = await Metarial.findByIdAndUpdate(MetarialsId, updateData, {
    new: true,
    runValidators: true,
  });console.log(Metarials)
  return Metarials;
};

// Delete Style (Admin only)
export const deleteMetarialsService = async (MetarialsId) => {
  const Metarials = await Metarial.findByIdAndDelete(MetarialsId);
  return Metarials;
};

// Get All Styles (Users + Admin)
export const getAllMetarialsService = async () => {
  const Metarials= await Metarial.find().select("name createdAt");
  return Metarials
};



