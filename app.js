const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const cookie = require("cookie-parser");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const connectionDB = require("./connection/connection");

app.use(helmet());
app.use(xss());
app.use(cookie());
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowsMs: 15 * 60 * 100,
    max: 100,
  })
);
app.use(cors());

// REGISTER AND LOGIN ROUTES

const RegisterLoginRoute = require("./routes/Authentication/regLog");

// ADMIN ROUTES

const project = require("./routes/Admin/projects");
const Task = require("./routes/Admin/tasks");

// CHAT ROUTES

const Chats = require("./routes/chats/chats");

//PAYMENT ROUTES
const payment = require("./routes/payments/pay");

// REGISTER AND LOGIN ROUTES

app.use("/api/tasks", RegisterLoginRoute);

//ADMIN ROUTES

app.use("/api/tasks", project);
app.use("/api/tasks/v2", Task);

//CHAT ROUTES

app.use("/api/chat", Chats);

//PAYMENT ROUTES
app.use("/api/chpter", payment);

app.get("/wake-up", (req, res) => {
  res.json({
    responseType: "success",
    message: "Server is awake",
  });
});

const DBConnection = async () => {
  try {
    await connectionDB(process.env.mongo_url);

    app.listen(port, () => {
      console.log(`server is running on port, ${port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

DBConnection();
