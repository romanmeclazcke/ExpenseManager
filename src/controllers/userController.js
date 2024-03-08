import User from "../models/userModel.js";
import {
  encryptPassword, // Corregido el nombre de la función
  verifyPasswordSecurity,
} from "../services/bycriptResourse.js";

class UserController {
  async createUser(req, res) {
    try {
      const { email, name, lastname, password } = req.body;

      // Verificando si todos los campos están presentes
      if (!email || !name || !lastname || !password) { // Corregido el error en la condición
        return res.status(400).json({
          message: "Complete todos los campos por favor",
          details: false,
        });
      }

      // Verificando si ya existe un usuario con el mismo email
      const user = await User.findOne({ where: { email: email } }); // Cambiado findAll por findOne

      if (user) { // Corregido el nombre de la propiedad length
        return res.status(400).json({ message: "El usuario ya existe", details: true });
      }

      // Creando el nuevo usuario con la contraseña encriptada
      const hashedPassword = await encryptPassword(password); // Corregido el nombre de la función
      const newUser = await User.create({
        email,
        name,
        lastname,
        password: hashedPassword,
      });

      // Respondiendo con el usuario creado
      res.status(200).json({ message: "Usuario creado", details: true });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}

export default UserController;
