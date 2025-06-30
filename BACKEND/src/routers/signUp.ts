import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accountModel, userModel } from "../database/db";
import env from "dotenv";

env.config();


const skey = process.env.JWT_SECRET as string;


const SignUpRouter = Router();

SignUpRouter.post("/signUp", async function (req: any, res: any) {
  try {
    const { username, email, password } = req.body;
     const hashedPassword = await bcrypt.hash(password, 7);
   
    const checkUser = await userModel.findOne({ 
       email
    });

    if (!checkUser) {
      const createUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const createAccount = await accountModel.create({
      userId:createUser._id,
      balance:1+Math.random()*1000
    })  

    const token = jwt.sign({ id: createUser._id }, skey, {
      expiresIn: "7d",
    });

   res.status(200).json({
      message: "User created successfully .",
      token,
      user: {
        id: createUser._id,
        username: createUser.username,
        email: createUser.email
      }
    });
      
    }

    else{
    return res.status(409).json({
        message: "User already exists. Please go to the Sign In page.",
      });
    }

  } catch (error) {
    console.error("SignUp Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});

export default SignUpRouter;