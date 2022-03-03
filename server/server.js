import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  catchAllErrorHandler,
} from "./routes/errorHandlers.js";
import authRouter from "./routes/auth/auth.js";
import userRouter from "./routes/users/user.js";
import productRouter from "./routes/product/product.js";
import cartRouter from "./routes/cart/cart.js";
import orderRouter from "./routes/order/order.js";

const server = express();
const PORT = process.env.PORT || 3001;
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

// ****************** MIDDLEWARES ******************
server.use(express.json());

// ****************** ROUTES ******************
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/products", productRouter);
server.use("/api/cart", cartRouter);
server.use("/api/orders", orderRouter);

// ****************** ERROR HANDLERS ******************
server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(catchAllErrorHandler);

console.table(listEndpoints(server));

// ********** INITIALISING MONGOOSE CONNECTION ******************
mongoose
  .connect(MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

server.listen(PORT || 3001, () =>
  console.log(`Server running on port ${PORT}`)
);

//testing
