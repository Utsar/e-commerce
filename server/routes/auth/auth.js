import express from "express";

const authRouter = express.Router();
// register
authRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default authRouter;
