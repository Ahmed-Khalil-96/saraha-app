import randomstring from "randomstring"
import userModel from "../../../DB/models/user.model.js"
import sendEmail from "../../services/sendEmail.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const generateOtp = ()=>{
    return randomstring.generate({
        length:6,
        charset:"numeric"
    })
}

export const getAllUsers = async(req, res, next)=>{
    const users = await userModel.find()
    return res.json(users)
}


export const addUser = async(req,res,next)=>{
try {
    
    const{userName , email , password }= req.body
    const userExist = await userModel.findOne({email})

    if(userExist){
        return res.status(400).json({message:"User already exist"})
    }

    const OTP = generateOtp()

    const token = jwt.sign({email},"ahmed")

    const link = `http:localhost:3000/user/confirmEmail/${token}`

    const confirmEmail = sendEmail(email, "please use the OTP to confirm your email", `<b>${OTP}</b> <br> <a href = ${link}>please click here and use the OTP to confirm your email </a>`)

    if(!confirmEmail){
        return res.status(500).json({message:"Email not sent"})
    }

    const hash = bcrypt.hashSync(password,10)
    const user = await userModel.create({userName , email, password:hash ,OTP})
    return res.json({message:"User created successfully", user})
}
 catch (error) {
    
}
}

export const confirmEmail = async(req, res, next)=>{
    try {
        
    
    const{email , OTP}= req.body
    const {token}=req.params
    if(!token){
        return res.status(400).json({message:"Invalid token"})
    }
    const decoded = jwt.verify(token,"ahmed")
    if(!decoded.email){
        return res.status(400).json({message:"Invalid token"})
    }
    if(email !== decoded.email){
        return res.status(400).json({message:"Invalid email"})
    }

    const userExist = await userModel.findOne({email, OTP })
    if(!userExist){
        return res.status(400).json({message:"Invalid email or OTP"})
}
if(userExist.confirmed){
    return res.status(400).json({message:"Email is already confirmed"})
}
const user = await userModel.updateOne({email},{confirmed:true})
return res.json({message:"Email confirmed successfully", user})

} catch (error) {
    return res.status(500).json({message:error.message})
        
}
}




export const logIn = async(req, res, next)=>{
    const {email , password }= req.body
    try {
        const userExist = await userModel.findOne({email})
    if(!userExist){
        return res.status(400).json({message:"wrong email or password"})
    }
    const match = bcrypt.compareSync(password,userExist.password)
    if(!match){
        return res.status(400).json({message:"wrong email or password"})
    }
    if(!userExist.confirmed){
        return res.status(400).json({message:"please confirm your email"})
    }

    const token = jwt.sign({email, id:userExist._id},"topSecret")
    return res.json({message:"User loggedIn successfully", token})
}
     catch (error) {
        return res.status(409).json({msg:error.message})
        
    }
}
    