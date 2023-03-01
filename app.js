const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
/* const { PORT = 3001 } = process.env; */
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const indexRoutes = require("./routes/index");

const { PORT = 3001 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "63f95a2ea2afd9756c0c89ac",
  };
  next();
});

app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("This is working");
});
