const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cors = require("cors");
const { createUser, login } = require("./controllers/users");
const errorHandler = require("./middlewares/error_handler");
const {
  validateUserLogin,
  validateUserBody,
} = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;
const routes = require("./routes");

const app = express();
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(requestLogger);
app.post("/signin", validateUserLogin, login);
app.post("/signup", validateUserBody, createUser);
app.use(routes);
 

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("This is working");
});
