import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../database/db";
import env from "dotenv";
import signInAuth from "../middelware/signInAuth";

env.config();


const skey = process.env.JWT_SECRET as string;


const UpdateRouter = Router();

UpdateRouter.put("/updatePassword",signInAuth,async function(req,res){

     const {upUsername,upEmail,password,upPassword,email}= req.body
   //  const userId  = req.userId
   //   const hashedPassword = await bcrypt.hash(password,7)
     const findUser = await userModel.findOne({
        email
     })
     //@ts-ignore
     const comparePassword = await bcrypt.compare(password,findUser.password)
     const hasheTheUpdatedPassword = await bcrypt.hash(upPassword,7)
     if(comparePassword){
        const updateData = await userModel.updateOne(
           {email},
            {$set:{password : hasheTheUpdatedPassword,
               username : upUsername,
               email:upEmail,
             }}
            
            
        )
        if(updateData){
        res.status(200).json({
            message : "user's password updated succefully "
        })}
     }
     else{
        res.status(404).json({
             message : "password wrong please enter right password "
        })
     }
})

export default UpdateRouter