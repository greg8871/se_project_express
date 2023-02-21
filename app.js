const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
/* const { PORT = 3001 } = process.env; */
const app = express();
mongoose.connect("mongodb://localhost:27017/wtwr_db");

const indexRoutes = require("./routes/index");

const { PORT = 3001 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "",
  };
  next();
});

app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
