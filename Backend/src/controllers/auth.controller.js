import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import {ENV} from '../lib/env.js';
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import "dotenv/config"
import cloudinary from "../lib/cloudinary.js";
export const signup =async (req, res) => {
const {fullName , email ,password}=req.body
try {
    if(!fullName || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    if(password.length < 6 ){
        return res.status(400).json({message:"Password must be at least 6 characters"});
    }
    const emailRegex =/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({message:"Invaild email format"});
    }
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({message:"Email already exists"});
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser =new User({
        fullName,
        email,
        password:hashedPassword
    })
    if(newUser){
        //Before cr:
        // generateToken(newUser._id,res);
        // await newUser.save();
        //after cr:
        //presist user first , then issue auth cookie
        const savedUser = await newUser.save();
        generateToken(savedUser._id,res);

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilepic:newUser.profilepic,
        });
//todo:send a welcome email to user
    try {
        await sendWelcomeEmail(savedUser.email,savedUser.fullName,ENV.CLIENT_URL);
    } catch (error) {
        console.error("failed to send welcome email:",error);
        
    }
    }else {
        return res.status(400).json({message:"Invalid user data"});

    }
} catch (error) {
        return res.status(500).json({message:"Internal server error"});

}
}

export const Login =async (req, res) =>{
const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"});
    }
try {
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message:"Invaild credentials"});
        // never tell the client which one is incorrect : password or emaail
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invaild credentials"});
    }
        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilepic:user.profilepic,
        });    
} catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({message:"Internal server error"});
}
};

export const Logout =(_, res) =>{
res.cookie("jwt","",{maxAge:0});
res.status(200).json({message:"Logged out successfully"});
};

export const updateProfile =async (req, res) =>{
    try {
        const {profilepic} = req.body;
        if(!profilepic){
        return res.status(400).json({message:"Profile pic is required"});
    }
        const userId = req.user._id;
        const uploadResponse = await cloudinary.uploader.upload(profilepic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilepic:uploadResponse.secure_url},
            {new: true}
        );
            res.status(200).json(updatedUser);
    } catch (error) {
            console.log("Error in update profile:", error);
            res.status(500).json({message:"Internal server error"});
    }
};