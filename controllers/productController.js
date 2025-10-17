import{sql} from "../config/db.js";
export const getProducts = async (req, res) => {
  try {
    const products = await sql`
      SELECT * FROM products
      ORDER BY created_at DESC
    `;
    console.log("Fetched products:", products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const getAllProducts=async(req,res)=>{
 
};
export const createProduct=async(req,res)=>{

};
export const updateProduct=async(req,res)=>{

};
export const deleteProduct=async(req,res)=>{

};

export const getProduct=async(req,res)=>{

};