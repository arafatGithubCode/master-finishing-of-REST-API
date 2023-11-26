const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./routes/users.route");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/users", router);

//home route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//route not found error
app.use((req, res, next) => {
  res.status(404).json({
    statusCode: 404,
    message: "Resource not found",
  });
});

//server error
app.use((err, erq, res, next) => {
  res.status(500).json({
    statusCode: 500,
    message: "something broken",
  });
});

module.exports = app;
