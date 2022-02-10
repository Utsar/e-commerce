import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CartSchema = new Schema(
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
  },
  { timestamps: true }
);

// deleting information which doesnt need to be visible
CartSchema.methods.toJSON = function () {
  const cart = this;
  const cartObject = cart.toObject();
  delete cartObject.__v;
  return cartObject;
};

export default model("Cart", CartSchema);
