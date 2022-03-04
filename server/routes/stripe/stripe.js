import express from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

const stripeRouter = express.Router();

stripeRouter.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeError, stripeResponse) => {
      if (stripeError) {
        res.status(500).send(stripeError);
      } else {
        res.status(200).send(stripeResponse);
      }
    }
  );
});

export default stripeRouter;
