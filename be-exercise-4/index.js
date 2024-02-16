const express = require("express");
const users = require("./users");
const morgan = require("morgan");

const app = express();

app.use(morgan("short"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users/:name", (req, res) => {
  const { name } = req.params;
  const user = users.find(
    (user) => user.name.toLowerCase() === name.toLowerCase()
  );
  if (user) {
    res.json(user);
  } else {
    res.json({ message: "Data user tidak ditemukan" });
  }
});

app.use((req, res) => {
  res
    .status(404)
    .json({ status: "error", message: "resource tidak ditemukan" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ status: "error", message: "terjadi kesalahan pada server" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
