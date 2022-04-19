// Init
import mongoose from "mongoose";

// Schema
const shopSchema = new mongoose.Schema(
  {
    id: { type: Number },
    email: { type: String },
    phone: { type: Number },
    shop_owner: { type: String },
    timezone: { type: String },
    domain: { type: String },
    myshopify_domain: { type: String, unique: true, required: true },
    plan_name: { type: String },
    app_status: { type: String, default: "pending" },
    charge_id: { type: String },
    uninstall_webhook_id: { type: Number },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

const Shops = mongoose.model("shops", shopSchema);
export default Shops;
