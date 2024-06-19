import User from "../models/userModel";
import {
  encryptPassword,
  verifyPasswordSecurity,
} from "../services/bycriptResourse";
import { Request, Response } from "express";

class UserController {

  async  createUser(req: Request, res: Response) {
    try {
      const { email, name, lastname, password } = req.body;
  
      // Verificar si todos los campos están presentes y son válidos
      if (!email || !name || !lastname || !password) {
        return res.status(400).json({
          message: "Complete all fields",
          details: false,
        });
      }
  
      // Verificar si ya existe un usuario con el mismo email
      const existingUser = await User.findOne({ where: { email: email } });
  
      if (existingUser) {
        return res.status(400).json({ message: "User already exists", details: false });
      }
  
      // Encriptar la contraseña antes de guardarla en la base de datos
      const hashedPassword = await encryptPassword(password);
  
      // Crear el nuevo usuario en la base de datos
      const newUser = await User.create({
        email,
        name,
        lastname,
        password: hashedPassword,
      });
  
      // Verificar si el usuario se creó correctamente
      if (newUser) {
        return res.status(200).json({ message: "User created successfully", details: true });
      } else {
        return res.status(400).json({ message: "Failed to create user", details: false });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", details: false });
    }
  }
  
  

  async editPassword(req: Request, res: Response) {
    try {
      const { password, newPassword, confirmNewPassword } = req.body;
      const dataUser = req.session.user;
  
      if (!dataUser || !dataUser.id) {
        return;
      }
  
      if (
        !newPassword ||
        !confirmNewPassword ||
        newPassword !== confirmNewPassword
      ) {
        return res
          .status(400)
          .json({
            message: "Passwords must match and cannot be empty",
            details: false,
          });
      }
  
      const user = await User.findOne({
        where: {
          id: dataUser.id,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: "user not found", details: false });
      }
      
  
      const isValid = await verifyPasswordSecurity(password, user.password);
  
      if (!isValid) {
        return res
          .status(400)
          .json({ message: "password invalid", datail: false });
      }
  
      const passwordEncripted = await encryptPassword(newPassword);
  
      const updated = await User.update(
        { password: passwordEncripted },
        {
          where: {
            id: dataUser.id,
          },
        }
      );
  
      updated?
      res.status(200).json({ message: "edit succesfully", details: true })
      :res.status(400).json({ message: "error on update password", details: true });
    } catch (error) {
      res.status(500).json({ message: "internal server error", details: true })
    }
  }
}

export default UserController;
