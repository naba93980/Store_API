const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name required"],
    },
    price: {
      type: Number,
      required: [true, "product price required"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 3,
    },
    createAt: {
      type: String,
      default: new Date().toLocaleString(),
    },
    company: {
      type: String,
      enum: {
        values: ["ikea", "liddy", "caressa", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { strictQuery: "throw"}
  // { strictQuery: false}
);

module.exports = mongoose.model("ProductsCollection", productSchema);
