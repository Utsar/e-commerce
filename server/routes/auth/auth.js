import express from "express";
import User from "../users/userSchema.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();
// register
authRouter.post("/register", async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    // encrypting password
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
    // checking if user exists
    !user && res.status(401).send({ message: "User not found" });

    // checking if password is correct
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PASSWORD
    ).toString(CryptoJS.enc.Utf8);
    // verifying password
    decryptedPassword !== req.body.password &&
      res.status(401).send({ message: "Wrong password" });
    //   generating token
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).send({ user, token });
  } catch {
    next(error);
  }
});

export default authRouter;
