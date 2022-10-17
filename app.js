const env = require("dotenv");
env.config();
const PORT = process.env.PORT || 5000;

const express = require("express");
const app = express();

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/handleError");

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.get("/api/v1/products");

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    //connect DB
    app.listen(PORT, () => console.log(`server started at port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};
start();
