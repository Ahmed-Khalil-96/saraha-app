import jwt from "jsonwebtoken"
import userModel from "../../../DB/models/user.model.js"


export const auth = ()=>{
    return async(req, res, next)=>{
try {
    
        const {token }= req.headers
        if(!token){
            return res.status(401).json({message: 'Token not found.'})
        }

        if(!token.startsWith("ahmed__")){
            return res.status(401).json({message: 'invalid token.'})
        }

        const newToken = token.split("ahmed__")[1]

        if(!newToken){
            return res.status(401).json({message: 'invalid token.'})    
        }
        const decoded = jwt.verify(newToken,"topSecret")
        
        if(!decoded.email|decoded.id){
            return res.status(401).json({message: 'invalid token.'})
        }

        const user = await userModel.findOne({email:decoded.email})
        if(!user){
            return res.status(401).json({message: 'invalid token.'})
        }
        req.user = user
        next()
    }
 catch (error) {
    
    return res.status(401).json({message: error.message})
}

}}