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
            
            const secret = process.env.SECRET

            if(verifyPasswordSecurity(password,existUser[0].password)){
                const token= jwt.sign({
                    username:username,
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

    async verificarSession(req, res) {
        // Obtener el token de la solicitud
        const token = req.headers['authorization'];
      
        if (!token) {
          return res.status(401).json({ error: 'Token no proporcionado',details:false});
        }
        const secret= process.env.SECRET
      
        // Verificar el token
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            return res.status(401).json({ error: 'Token inválido',details:false });
          }

          // El token es válido, puedes hacer lo que necesites con decoded, que contiene la información decodificada del token
          const usuario = decoded.usuario;
          res.json({ mensaje: 'Sesión verificada', details:true });
        });
      }

}

export default sessionController