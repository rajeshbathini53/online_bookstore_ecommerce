import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
export const LoginUser = async (req,res)=>{
   const {email,password} =req.body;
   const user = await User.findOne({email});
   if(!user){
    return res.status(401).json({message : "Invalid email or password"});
   }
   console.log("Plain password from input:", password);
console.log("Hashed password from DB:", user.password);
   const isMatch = await bcrypt.compare(password,user.password);
 if(!isMatch){
    return res.status(401).json({message:"Invalid password"});
 }
const token = jwt.sign(
    {userId :user._id,role:user.role},
    process.env.JWT_SECRET,
    {expiresIn:"1h"}
);
res.json({token,user:{id:user._id,name:user.name,email:user.email,role:user.role}});
}