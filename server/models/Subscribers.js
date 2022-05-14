// Init
import mongoose from "mongoose";

// Schema
const subscriberSchema = new mongoose.Schema(
  {
    shop: String,
    email: String,
    product_name: String,
    product_link: String,
  },
  {
    timestamps: true,
  }
);

const Subscribers = mongoose.model("subscribers", subscriberSchema);
export default Subscribers;
