import mongoose, { mongo } from "mongoose"
import { Schema } from "mongoose"


const user = new Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true}
})
const accountSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    balance:{
        type:Number,
        required:true
    }
})



export const userModel = mongoose.model("user",user)
export const accountModel = mongoose.model("Account",accountSchema)
