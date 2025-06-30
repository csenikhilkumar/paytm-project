import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../database/db";
import env from "dotenv";
import express from "express"
import signInAuth from "../middelware/signInAuth";
env.config();



const userAccountRouter = Router();

export default userAccountRouter.get("/bulk",signInAuth,async function(req :Request,res:Response){
    const username = req.query.username as string
    console.log(username)

    const findUser = await userModel.findOne({
    username : username 
    })
    if (findUser){
        res.status(200).json({
            user :[
                {
                    username : findUser.username,
                    id : findUser.id
                }
            ]
        })
    }
    else{
        res.status(400).json({
            message :"username doesnt exist plaese enter right username "
        })
    }
})