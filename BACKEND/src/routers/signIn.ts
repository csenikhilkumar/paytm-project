import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../database/db";
import env from "dotenv";
import signInAuth from "../middelware/signInAuth";

env.config();


const skey = process.env.JWT_SECRET as string;


const SignInRouter = Router();

SignInRouter.post("/signIn",signInAuth,async function (req: any, res: any) {
    const {username,email,password} = req.body
    if(!username || !password || !email){
        res.json({
            message:"all fields are required "
        })
    }
    const hashedPassword = await bcrypt.hash(password,7)
    const userFind : any = await userModel.findOne({
        email
    })
    const dbPassword  = userFind.password
    const comparedPassword = await bcrypt.compare(password,hashedPassword)
    if(comparedPassword){
        res.status(200).json({
            message : "user successfully loggedIn"
        })
    }
    else{
        res.status(400).json({
            message:"wrong password please enter correct password"
        })
    }
  
});



export default SignInRouter;