import {TokenDecode} from "../utils/tokenUtility.js";
export const authCheck=async (req,res,next)=>{
    const authHeader = req.headers.authorization; 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
    let decoded=TokenDecode(token);
    if(decoded===null){
        res.status(401).json({status:"fail",Message:"Unauthorized",token:token});
    }
    else{
        let user_id=decoded.id;
        req.headers.user_id=user_id;
        next();
    }
}