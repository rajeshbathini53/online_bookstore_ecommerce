import express from 'express';
import { registerUser } from '../controllers/register.js';
import {LoginUser} from '../controllers/Login.js'
import { authenticateToken } from '../middleware/middleware.js';
import { deleteUser, getAllUsers } from '../controllers/UserController.js';
import { isAdmin } from '../middleware/isAdmin.js';
const router= express.Router();
router.post("/register",registerUser);
router.post("/login",LoginUser);
router.get("/myProfile" ,authenticateToken,(req,res)=>{
    res.json({message:"Protected Route",user:req.user});
});
router.get("/admin/users", authenticateToken, isAdmin, getAllUsers);
router.delete("/admin/users/:id", authenticateToken, isAdmin, deleteUser);
export default router;