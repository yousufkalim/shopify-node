// Init
import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
  id: Number,
  quantity: Number,
  variant_id: Number,
  key: String,
  title: String,
  price: Number,
  original_price: Number,
  discounted_price: Number,
  line_price: Number,
  original_line_price: Number,
  total_discount: Number,
  sku: String,
  grams: Number,
  vendor: String,
  taxable: Boolean,
  product_id: Number,
  product_has_only_default_variant: Boolean,
  gift_card: Boolean,
  final_price: Number,
  final_line_price: Number,
  url: String,
  image: String,
  handle: String,
  requires_shipping: Boolean,
  product_type: String,
  product_title: String,
  product_description: String,
  variant_title: String,
  line_level_total_discount: Number,
});

// Schema
const cartSchema = new mongoose.Schema(
  {
    token: String,
    customer: String,
    items: [itemsSchema],
    shop: String,
    shop_id: mongoose.Types.ObjectId,
    original_total_price: Number,
    total_price: Number,
    total_discount: Number,
    item_count: Number,
    currency: String,
  },
  {
    timestamps: true,
  }
);

const Carts = mongoose.model("carts", cartSchema);
export default Carts;
