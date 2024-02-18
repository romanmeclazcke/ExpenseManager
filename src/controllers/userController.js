import user from "../models/userModel";
import {
  encryiptPassword,
  verifyPasswordSecurity,
} from "../services/bycriptResourse";

class userController {
  async createUser(req, res) {
    try {
      const { email, lastname, password } = req.body;

      if ((!email, !lastname, !password)) {
        return res
          .send(400)
          .json({
            message: "complete todos los campos porfavor",
            details: false,
          });
      }

      const user = await user.findAll({ where: { email: email } });

      if (user.lenght > 0) {
        res.send(400).json({ message: "el usuario ya existe", details: true });
      }

      const data = {
        email,
        lastname,
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
