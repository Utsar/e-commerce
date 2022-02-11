import express from "express";
import User from "./userSchema.js";
import { verifyAndAuth, verifyAndAdmin } from "../verifyToken.js";

const userRouter = express.Router();

// Updating user

userRouter.put("/:id", verifyAndAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASSWORD
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch {
    res.status(500).send(error);
  }
});

export default userRouter;
