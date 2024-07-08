import msgModel from "../../../DB/models/message.model.js"


export const getAllMsgs = async(req,res,next)=>{
    try {
        
    
    const msgs = await msgModel.find({receiverId:req.user.id})
    res.status(200).json({msgs})
} catch (error) {
     return res.status(500).json({msg:error.message})
}
}


export const addMsg = async(req, res, next)=>{
    try {
    const {content}= req.body
    const {id}= req.user
    const msg = await msgModel.create({content,receiverId:id})
    return res.status(201).json({msg:"done", msg})
} catch (error) {
    return res.status(500).json({msg:error.message})
        
}
}

export const deleteMsg = async(req, res, next)=>{
    const{id}= req.params
    const msg = await msgModel.findOneAndDelete({_id:id,receiverId:req.user.id})
    if(!msg) return res.status(404).json({msg:"msg not found or you are nor auhtorized"})
        return res.status(200).json({msg:"message is deleted successfully"})
}