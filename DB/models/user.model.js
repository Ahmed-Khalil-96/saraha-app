import { model, Schema } from "mongoose";

const userSchema= new Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    OTP:{
        type:String,
        required:true
        
        
    },
    confirmed:{
        type:Boolean,
        default:false
    }
})

const userModel = model("User", userSchema)

export default userModel