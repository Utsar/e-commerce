import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
    },
    size: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// deleting information which doesnt need to be visible
ProductSchema.methods.toJSON = function () {
  const product = this;
  const productObject = product.toObject();
  delete productObject.__v;
  return productObject;
};

export default model("Product", ProductSchema);
