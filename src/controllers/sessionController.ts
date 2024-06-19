import User from "../models/userModel";
import { verifyPasswordSecurity } from "../services/bycriptResourse";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

class sessionController {
  async createToken(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const existUser = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!existUser) {
        return res
          .status(400)
          .json({ message: "user not found", details: false });
      }

      const secret = process.env.SECRETJWT;

      if (!secret) {
        return res
          .status(400)
          .json({ message: "secret not found", details: false });
      }

      // if(await verifyPasswordSecurity(password,existUser.password)){
      //     const token=  jwt.sign({
      //         name:existUser.name,
      //         id:existUser.id,
      //         exp:Date.now()+60*10000,
      //     },secret)

      //     token
      //     ? res.status(200).json({message:token,details:true})
      //     : res.status(500).json({message:"internal server error",details:false})
      // }else{
      //     res.status(400).json({message:"password incorrect",details:false})
      // }

      const hashPassword = await verifyPasswordSecurity(
        password,
        existUser.password
      );
      if (hashPassword) {
        const token = jwt.sign(
          {
            id: existUser.id,
            name: existUser.name,
            exp: Date.now() + 60 * 10000,
          },
          secret
        );

        token
          ? res.json({ token:token, details: true })
          : res
              .status(500)
              .json({ message: "internal server error", details: false });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req: Request, res: Response) {
    const token = req.headers["authorization"];

    if (!token) {
      res.status(404).json({ message: "you didn't log in" });
    }

    req.headers["authorization"] = "";

    res.status(200).json({ message: "logout succesfully", details: true });
  }
}

export default sessionController;
