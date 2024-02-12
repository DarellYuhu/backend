require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

const log = (req, res, next) => {
  console.log(`${new Date()} ${req.ip} - ${req.originalUrl}`);
  next();
};

// app.use(log);
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.json({
    status: "success",
    data: "This is the about page",
  });
});

app.post("/contoh", (req, res) => {
  res.send("requiest dengan method post");
});

app.put("/contoh", (req, res) => {
  res.send("requiest dengan method put");
});

app.delete("/contoh", (req, res) => {
  res.send("requiest dengan method delete");
});

app.get("/post/:id", (req, res) => {
  res.send(`request dengan id ${req.params.id}`);
});

app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Page not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
