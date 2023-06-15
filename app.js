const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cors = require("cors");
const { createUser, login } = require("./controllers/users");

const { PORT = 3001 } = process.env;

const app = express();
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);
/* app.use(routes);
 */

app.use(errors());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("This is working");
});
