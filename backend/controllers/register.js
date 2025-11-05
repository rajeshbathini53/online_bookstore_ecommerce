import User from "../models/User.js";
import bcrypt from "bcrypt";
export const registerUser = async (req,res)=>{
   try{
     
   const {email,password,confirmPassword,name,role}=req.body;
   if(!name || !password || !confirmPassword || !email){
    return res.status(400).json({message: "All fields are required"});
   }
   if(password != confirmPassword){
    return res.status(400).json({message : "Password and confirmPassword should be same"});
   }
   const existingUser = await User.findOne({email});
   if(existingUser){
    return res.status(409).json({message : "User already exist"});
   }
   const hashpassword = await bcrypt.hash(password,15);
   const newUser = await new User({name, email ,password:hashpassword,confirmPassword:hashpassword,role});
   await newUser.save();
   res.status(201).json({message:"User registered successfully"});
   }
   catch(err){
    res.status(500).json({message:"Server error"});
    console.log("Registration Error",err);
   }
};