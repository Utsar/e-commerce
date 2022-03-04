import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

// deleting information which doesnt need to be visible
OrderSchema.methods.toJSON = function () {
  const order = this;
  const orderObject = order.toObject();
  delete orderObject.__v;
  return orderObject;
};

export default model("Order", OrderSchema);
