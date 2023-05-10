const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
/* const indexRoutes = require("./routes/index"); */
const { createUser, login } = require("./controllers/users");
const clothingItems = require("./routes/clothingItems");
const users = require("./routes/user");
const { NOT_FOUND } = require("./utils/errors");

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/signin", login);
app.post("/signup", createUser);
app.use("/items", clothingItems);
app.use("/users", users);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("This is working");
});
