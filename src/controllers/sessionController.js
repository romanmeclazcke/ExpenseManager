import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import { verifyPasswordSecurity } from "../services/bycriptResourse.js";


class sessionController{
    async createToken(req,res){
        try {
            const{email,password}= req.body

            const existUser= await User.findOne({where:{
                email:email
            }})

            if(!existUser){
                return res.status(401).json({message:"user not found", details:false})
            }
        
            const secret = process.env.SECRETJWT
        
            if(await verifyPasswordSecurity(password,existUser.password)){
                const token=  jwt.sign({
                    username:existUser.username,
                    id:existUser.id,
                    exp:Date.now()+60*10000,
                },secret)

             

                token
                ? res.status(200).json({message:token,userId: existUser.id,details:true})
                : res.status(500).json({message:"internal server error",details:false})
            }else{
                res.status(400).json({message:"password incorrect",details:false})
            }


        } catch (error) {
            console.log(error)
        }
    }


    async logout(req,res){
        const token = req.headers['authorization'];

        if(!token){
            res.status(404).json({message:"you didn't log in"})
        }

        
        req.headers['authorization'] = '';
    
        res.status(200).json({message:"logout succesfully",details:true});


    }
}

export default sessionController