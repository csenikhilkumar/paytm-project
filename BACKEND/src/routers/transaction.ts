import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accountModel, userModel } from "../database/db";
import env from "dotenv";
import signInAuth from "../middelware/signInAuth";
import mongoose from "mongoose";

env.config();


const transationRouter = Router();
export default transationRouter.put("/transaction",signInAuth,async function(req:Request,res:Response){
const session =await mongoose.startSession()
await session.startTransaction()
const {amount,to} = req.body
//@ts-ignore
const fromId = req.userId
const findUser = await accountModel.findOne({
    
    userId:fromId

}).session(session)


if(!findUser || findUser.balance < amount){
    await session.abortTransaction()
    session.endSession()
    res.status(400).json({
        messsage : "insufficient funds"
    })
}

const toAccount = await accountModel.findOne({userId:to}).session(session)
if(!toAccount){
    await session.abortTransaction()
    session.endSession()
    res.status(400).json({
        message:"recipient accunt not found "
    })
}
 
await accountModel.updateOne({userId : fromId},{ $inc:{balance : -amount}}).session(session)
await accountModel.updateOne({userId : to},{$inc:{balance : amount}}).session(session)

await session.commitTransaction()
session.endSession()
res.status(200).json({message : "transfer successfully "})
})