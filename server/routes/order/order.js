import express from "express";
import Order from "./orderSchema.js";
import { verifyAndAdmin, verifyAndAuth, verifyToken } from "../verifyToken.js";

const orderRouter = express.Router();

// CREATE AN ORDER
orderRouter.post("/", verifyToken, async (req, res, next) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).send(savedOrder);
  } catch (error) {
    res.status(500).send(error);
  }
});
// UPDATE AN ORDER
orderRouter.put("/:id", verifyAndAdmin, async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(500).send(error);
  }
});
// DELETE AN ORDER
orderRouter.put("/:id", verifyAndAdmin, async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order is deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});
// GET USER ORDERS
orderRouter.get("/find/:userId", verifyAndAuth, async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});
// GET ALL ORDERS
orderRouter.get("/", verifyAndAdmin, async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});
// GET STATS

orderRouter.get("/imcome", verifyAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$greatedAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(income);
  } catch (error) {
    res.status(500).send(error);
  }
});
export default orderRouter;
