import { model, Schema } from "mongoose";

const msgSchema = new Schema({

    content:{
        type:String,
        required:true
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})
const msgModel= model("Message", msgSchema)

export default msgModel