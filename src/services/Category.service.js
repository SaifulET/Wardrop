import category from "../models/category.js";
import Outfit from "../models/Outfit.js";

// Create Style (Admin only)
export const createCategoryService = async (categoryData, adminId) => {
  const ctg= await category.find({name:categoryData.name})
  console.log(ctg)
  
  if(ctg.length<1)
  {
    const Category = await category.create({ ...categoryData, createdBy: adminId });
  return Category;
  }
  return "Category already exist"
};

// Edit Style (Admin only)
export const updateCategoryService = async (CategoryId, updateData) => {
  const Category = await category.findByIdAndUpdate(CategoryId, updateData, {
    new: true,
    runValidators: true,
  });
  return Category;
};

// Delete Style (Admin only)
export const deleteCategoryService = async (CategoryId) => {
  const Category = await category.findByIdAndDelete(CategoryId);
  return Category;
};

// Get All Styles (Users + Admin)
export const getAllCategoryService = async () => {
  const Category = await category.find().select("name createdAt");
  console.log(Category);
  
  return Category;
};



