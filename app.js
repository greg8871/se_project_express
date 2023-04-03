const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
/* const indexRoutes = require("./routes/index"); */
const { createUser, login } = require("./controllers/users");
const clothingItems = require("./routes/clothingItems");
const users = require("./routes/user");
const { PORT = 3001 } = process.env;

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);
app.use("/items", clothingItems);
app.use("/users", users);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("This is working");
});
