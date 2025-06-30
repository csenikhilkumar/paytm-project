import express from "express"
import SignUpRouter from "./routers/signUp";
import mongoose, { connect } from "mongoose";

import env from "dotenv"
import SignInRouter from "./routers/signIn";
import UpdateRouter from "./routers/updateUser";
import userAccountRouter from "./routers/userAccount";
import checkBalanceRouter from "./routers/balance"
import transactionRouter from "./routers/transaction";
env.config()
const app = express();
const db_uri = process.env.MONGO_URI as string
console.log(db_uri)

app.use(express.json())
app.use("/api/v1",SignUpRouter)
app.use("/api/v1",SignInRouter)
app.use("/api/v1",UpdateRouter)
app.use("/api/v1",userAccountRouter)
app.use("/api/v1",checkBalanceRouter)
app.use("/api/v1",transactionRouter)





async function main (){
    await mongoose.connect(db_uri)
    app.listen(3000,()=>{
    console.log("server is running port 3000 ")
})}

main()