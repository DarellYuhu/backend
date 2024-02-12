const express = require("express");
const { data } = require("./members");
const { users } = require("./users");
const moment = require("moment");
const morgan = require("morgan");

const app = express();

const PORT = 3010;
const HOST = "127.0.0.1";

app.use(morgan("short"));

app.get("/", (req, res) => {
  res.send("This is home page");
});

app.get("/about", (req, res) => {
  res.json({
    status: "Success",
    message: "Response success",
    description: "Exerscise #3",
    date: moment(),
    data,
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}: ${new Date()}`);
});
