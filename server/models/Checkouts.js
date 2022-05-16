// Init
import mongoose from "mongoose";

// Schema
const checkoutSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    abandoned_checkout_url: String,
    created_at: Date,
    updated_at: Date,
    expired: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Checkouts = mongoose.model("checkouts", checkoutSchema);
export default Checkouts;
