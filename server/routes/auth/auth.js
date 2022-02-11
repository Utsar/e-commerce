import express from "express";
import User from "../users/userSchema.js";
import CryptoJS from "crypto-js";

const authRouter = express.Router();
// register
authRouter.post("/register", async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASSWORD
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (error) {
    next(error);
  }
});

// login
authRouter.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(401).send({ message: "User not found" });
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PASSWORD
    ).toString(CryptoJS.enc.Utf8);
    decryptedPassword !== req.body.password &&
      res.status(401).send({ message: "Wrong password" });
    res.status(200).send(user);
  } catch {
    next(error);
  }
});

export default authRouter;
