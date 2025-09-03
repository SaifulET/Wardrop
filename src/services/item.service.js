import Category from "../models/category.js";
import Item from "../models/Item.js";
import Materials from "../models/Materials.js";

export const createItem = async (data) => {
const { category, material, ...rest } = data;
console.log(data,"from 7 line")
    // Convert category names to ObjectIds
    const categoryDocs = await Category.find({ name: { $in: category } });
    const materialDocs = await Materials.find({ name: { $in: material } });

    const item = new Item({
      ...rest,
      category: categoryDocs.map(c => c._id),
      material: materialDocs.map(m => m._id)
    });


console.log(item)

  // const item = new Item({ ...data, user: userId });
  return await item.save();
};

export const getItems = async (filters,id) => {
  if(filters){
    const query = {};
  query.user= id;

// Title search (case-insensitive)
if (filters.title) query.title = { $regex: filters.title, $options: "i" };

// Multiple brands (comma-separated)
if (filters.brand)
  query.brand = { $in: filters.brand.split(",").map((b) => b.trim()) };

// Multiple categories (optional)
if (filters.category){

if (filters.category) {

    const cat= await Category.findOne({ items: id, category: filters.category,user:user });
    if (cat) {
      query.category = cat._id.toString();
    }}


  query.category = { $in: filters.category.split(",").map((c) => c.trim()) };

}
  
if (filters.material)
  query.material = { $in: filters.material.split(",").map((c) => c.trim()) };

// Colors, season, style
if (filters.colors)
  query.colors = { $in: filters.colors.split(",").map((c) => c.trim()) };

if (filters.season)
  query.season = { $in: filters.season.split(",").map((s) => s.trim()) };

if (filters.style)
  query.style = { $in: filters.style.split(",").map((s) => s.trim()) };
  const item= await Item.find(query);
  
    return item;
  }
  else{
    const item = await Item.findById({user:id})
    return item
  }
};

export const getItemById = async (id,user) => {
    const item= await Item.findById(id,{ user: user });
    return item;
};



export const updateItem = async (id, data,user) =>{
  const query = {}
  query.user = user;
  if (data.category || data.subCategory || data.subsubCategory) {

    const cat= await Category.findOne({ items: id, category: data.category,user:user });
    if (cat) {
      query.category = cat._id.toString();
    }
    else {
    const categoryData = {};
    if (data.category) categoryData.category = data.category;
    if (data.subCategory) categoryData.subCategory = data.subCategory;
    if (data.subsubCategory) categoryData.subsubCategory = data.subsubCategory;

  categoryData.items= id;
  categoryData.user = user;

    
  const categoryDoc = new Category(categoryData);
  await categoryDoc.save()
    query.category = categoryDoc._id.toString();
    }
  };

    const item =await Item.findByIdAndUpdate({_id:id},query, { new: true, runValidators: true });
    return item;
}
  

export const deleteItem = async (id) => {
     await Item.findByIdAndDelete({ _id: id });
    return "user has been deleted successfully";
};





export const getBrandsByUser = async (userId) => {
  try {
    // using distinct to get unique brand values for that user
    const brands = await Item.distinct("brand", { user: userId });
    return brands;
  } catch (error) {
    throw new Error("Failed to fetch brands: " + error.message);
  }
};