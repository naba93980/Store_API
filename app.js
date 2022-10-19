require("express-async-errors");
const connectDB = require('./db/connect');
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/handleError");
const env = require("dotenv");
env.config();
const router = require('./routes/products');
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products",router);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(URI);
    app.listen(PORT, () => console.log(`server started at port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
