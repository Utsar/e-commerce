import express from "express";
import Cart from "./cartSchema.js";
import { verifyAndAuth, verifyToken, verifyAndAdmin } from "../verifyToken.js";

const cartRouter = express.Router();

// CREATE CART
cartRouter.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const saveCart = await newCart.save();
    res.status(200).send(saveCart);
  } catch (error) {
    res.status(500).send(error);
  }
});
// UPDATE CART
cartRouter.put("/:id", verifyAndAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(500).send(error);
  }
});
// DELETE CART
cartRouter.delete("/:id", verifyAndAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send("cart has been deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});
// GET USER CART
cartRouter.get("/find/:userId", verifyAndAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
});
// GET ALL
cartRouter.get("/", verifyAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default cartRouter;
