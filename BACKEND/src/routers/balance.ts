import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accountModel, userModel } from "../database/db";
import env from "dotenv";
import signInAuth from "../middelware/signInAuth";

env.config();



const checkBalanceRouter = Router();

export default checkBalanceRouter.get("/balance",signInAuth,async function (req : Request,res : Response){
 const userId = req.body.userId
 const findAccount = await accountModel.findOne({
    userId:userId
 })
 if(findAccount){
    res.json({
        message : "user found ",
        balance : findAccount.balance 
    })
 }
})