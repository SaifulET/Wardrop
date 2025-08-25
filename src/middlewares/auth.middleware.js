import {TokenDecode} from "../utils/tokenUtility.js";
export const authCheck=async (req,res,next)=>{
    let token= req.cookies.token;
    let decoded=TokenDecode(token);
    if(decoded===null){
        res.status(401).json({status:"fail",Message:"Unauthorized"});
    }
    else{
        let user_id=decoded.id;
        req.headers.user_id=user_id;
        next();
    }
}