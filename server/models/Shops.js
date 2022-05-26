/**
 * Shops model
 * @author Yousuf Kalim
 */
import mongoose from "mongoose";

// Schema
const shopSchema = new mongoose.Schema(
  {
    id: String,
    shop: String,
    state: String,
    accessToken: String,
    scope: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Shops = mongoose.model("shops", shopSchema);
export default Shops;
