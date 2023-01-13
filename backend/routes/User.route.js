import express from "express";
import { UserModel } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;
  try {
    bcrypt.hash(password, 10, async (err, hash_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          password: hash_password,
          age,
        });

        await user.save();
        res.status(200).send({ message: "Registered successfull" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Registration failed" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    const hash_password = user[0].password;

    if (user.length > 0) {
      bcrypt.compare(password, hash_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ course: "backend" }, "privateKey");
          res.status(200).send({ message: "Login successfull", token: token });
        } else {
          res.send({ message: "Wrong credentials" });
        }
      });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    res.status(500).send({ message: "Login failed" });
  }
});

export { userRouter };
