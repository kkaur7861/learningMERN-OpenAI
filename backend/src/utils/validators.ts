import { NextFunction,Request,Response } from "express";
import {ValidationChain, body, validationResult} from "express-validator";


export const validate= (rules:ValidationChain[])=>{
return async(req:Request,res:Response,next: NextFunction)=>{
    for(let rule of rules){
        const res = await rule.run(req);
        if(!res.isEmpty()){
            break;
        }
    }
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    return res.status(422).json({errors:errors.array()})
}
}
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min:6}).withMessage("Password should coantain atleast 6 characters"),
]

export const signUpValidator = [
    body("name").notEmpty().withMessage("name is required"),
    ...loginValidator
]