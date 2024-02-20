
import User from "../models/userModel.js";
import {
  encryiptPassword,
  verifyPasswordSecurity,
} from "../services/bycriptResourse.js";

class userController {
  async createUser(req, res) {
    try {
      const { email,name, lastname, password } = req.body;

      if ((!email,!name, !lastname, !password)) {
        return res
          .send(400)
          .json({
            message: "complete todos los campos porfavor",
            details: false,
          });
      }

      const user = await User.findAll({ where: { email: email } });

      if (user.lenght > 0) {
        res.send(400).json({ message: "el usuario ya existe", details: true });
      }

      const data = {
        email,
        lastname,
        name,
        password: encryiptPassword(password),
      };

      const created = await user.create({data});

      created
      ? res.send(200).json({message:"user creado",details:true})
      : res.send(500).json({messaga:"internal server error"})

    } catch (error) {
      console.log(error);
    }
  }
}


export default userController