import mongoose from "mongoose";

const connection = async()=>{
    return await mongoose.connect("mongodb://localhost:27017/assignment9").then(()=>{
        console.log("Database connected");
    }).catch((err)=>{
        console.log(err);
    })
}


export default connection