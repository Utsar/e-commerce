import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import userRouter from "./routes/users/user.js";

const server = express();
const PORT = process.env.PORT || 3001;
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

server.use(express.json());

console.table(listEndpoints(server));

// initialize mongoose
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
server.get("/api/test", () => {
  console.log("test is successul");
});
server.use("/api/user", userRouter);
