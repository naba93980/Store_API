const connectDB = require("./db/connect");
const products = require("./products.json");
const env = require("dotenv");
env.config();
const URI = process.env.MONGO_URI;
const ProductsCollection = require("./model/products");

const start = async () => {
  try {
    await connectDB(URI);
    console.log("connection with database succeeded");
    await ProductsCollection.deleteMany({});
    console.log("deleted all documents present in ProductsCollection");
    await ProductsCollection.create(products);
    console.log("Inserted products");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
