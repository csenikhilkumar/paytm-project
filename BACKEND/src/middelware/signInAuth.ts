import { Router } from "express";
import  bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import env from "dotenv"
env.config

const signInAuth = Router()


export default signInAuth.use(async function(req:any ,res : any,next){
const token = await req.headers.token 

if(!token || !token.startsWith("Bearer ")){
    res.status(400).json({message : "invalid token format"})
}
const splitedToken = token.split(' ')[1]
const verifyToken = await jwt.verify(splitedToken,process.env.JWT_SECRET as string)

if(verifyToken){
    //@ts-ignore
    req.userId = verifyToken.id
    next()
}
else{
    message : "unauthorized access"
}

})