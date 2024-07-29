import User from "../models/User.js";
import {compare, hash} from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers =async (req,res,next)=>{

    try{
        const users= await User.find();
        return res.status(200).json({message:"ok user",users});
    }catch(err){
        console.log("error:::",err);
        return res.status(200).json({message:"ok",err});
    }
}

export const userSignUp =async (req,res,next)=>{

    try{
        const {name,email,password} = req.body;
        const hashPassword = await hash(password,10);
        const user= new User({name,email,password:hashPassword});
        await user.save();
        res.clearCookie(COOKIE_NAME,{
            path:"/",domain:"localhost",httpOnly:true,signed:true
        });
        const token = createToken(user._id.toString(),user.email,"7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true})
        
        return res.status(201).json({message:"user is created",id: user._id.toString()});
    }catch(err){
        console.log("error:::",err);
        return res.status(200).json({message:"ok",err});
    }
}

export const userLogin =async (req,res,next)=>{

    try{
        const {email,password} = req.body;
        const existingUser =  await User.findOne({email});
        if(!existingUser){
            return res.status(401).send("User is not registered");
        }
        const isPasswordCorrect = await compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(401).send("Incorrect Password");
        }
        res.clearCookie(COOKIE_NAME,{
            path:"/",domain:"localhost",httpOnly:true,signed:true
        });
        const token = createToken(existingUser._id.toString(),existingUser.email,"7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true})
        return res.status(200).json({message:"Ok",id: existingUser._id.toString()});
    }catch(err){
        console.log("error:::",err);
        return res.status(200).json({message:"ok",err});
    }
}