import User from "../models/userModel";
import {
  encryptPassword, 
  verifyPasswordSecurity,
} from "../services/bycriptResourse";
import { Request, Response } from "express";

class UserController {
  async createUser(req:Request,res:Response) {
    try {
      const { email, name, lastname, password } = req.body;

      // Verificando si todos los campos están presentes
      if (!email || !name || !lastname || !password) { // Corregido el error en la condición
        return res.status(400).json({
          message: "Complete all camps",
          details: false,
        });
      }

      // Verificando si ya existe un usuario con el mismo email
      const user = await User.findOne({ where: { email: email } }); // Cambiado findAll por findOne

      if (user) { // Corregido el nombre de la propiedad length
        return res.status(400).json({ message: "User already exist", details: true });
      }

      // Creando el nuevo usuario con la contraseña encriptada
      const hashedPassword = await encryptPassword(password); // Corregido el nombre de la función
      const newUser = await User.create({
        email,
        name,
        lastname,
        password: hashedPassword,
      });

      newUser
      ? res.status(200).json({ message: "User created", details: true })
      : res.status(400).json({message:"internal server error", details:false});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }


  async editPassword(req:Request,res:Response){
    const {password, newPassword, confirmNewPassword} =req.body;
    const dataUser = req.session.user;
     
    if(newPassword != confirmNewPassword){
      return res.status(400).json({message:"password must be same", details:false})
    }

    const user = await User.findOne({where:{
      id:dataUser.id
    }})

    if(!user){
      return res.status(404).json({message:"user not found",details:false});
    }
     

    const isValid = await verifyPasswordSecurity(password,user.password);

    if(!isValid){
      return  res.status(400).json({message:"password invalid",datail:false});
    }

     user.password = await encryptPassword(newPassword);

     await user.save();
     
     res.status(200).json({message:"edit succesfully", details:true});
  }
}

export default UserController;
