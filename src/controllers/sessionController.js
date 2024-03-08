import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import { verifyPasswordSecurity } from "../services/bycriptResourse.js";


class sessionController{
    async createToken(req,res){
        try {
            const{email,password}= req.body
            
            const existUser= await User.findAll({where:{
                email:email
            }})

            if(!existUser){
                return res.send(401).json({message:"user not found", details:false})
            }
            
            const secret = process.env.SECRETJWT

            if(await verifyPasswordSecurity(password,existUser[0].password)){
                const token=  jwt.sign({
                    username:existUser[0].username,
                    id:existUser[0].id,
                    exp:Date.now()+60*1000,
                },secret)

                token
                ? res.status(200).json({message:token,details:true})
                : res.send(500).json({message:"internal server error",details:false})
            }else{
                res.send(400).json({message:"password incorrect",details:false})
            }


        } catch (error) {
            console.log(error)
        }
    }
}

export default sessionController