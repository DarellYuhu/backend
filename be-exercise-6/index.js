const express = require("express");
const users = require("./users");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");

const upload = multer({ dest: "public" });
const app = express();

const corsOptions = {
  origin: "http://localhost:5500",
};

app.use(morgan("short"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));

app.get("/users", (req, res) => {
  res.json({ status: "OK", data: users });
});

app.get("/users/:name", (req, res) => {
  const name = req.params.name;
  const user = users.find(
    (user) => user.name.toLowerCase() === name.toLowerCase()
  );
  if (user) {
    res.json({ status: "OK", data: user });
  } else {
    res.status(404).json({ status: "Not Found" });
  }
});

app.post("/users", (req, res) => {
  const payload = req.body;
  try {
    if (!payload?.id || !payload?.name) {
      throw new Error("Masukan data yang akan diubah");
    }
    const newUser = {
      id: users.length + 1,
      name: payload.username,
      password: payload.password,
    };
    users.push(newUser);
    res.json({ status: "OK", data: users });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
});

app.put("/users/:name", (req, res) => {
  const name = req.params.name;
  const payload = req.body;
  try {
    if (!(!payload?.name || !payload?.id)) {
      throw new Error("Masukan data yang akan diubah");
    }
    const user = users.find(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    );
    if (!user) {
      throw new Error("User tidak ditemukan");
    }
    console.log(payload);

    if (payload.name) user.name = payload.name;
    if (payload.id) user.id = payload.id;
    console.log(user);
    res.json({ status: "OK", data: user });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
});

app.delete("/users/:name", (req, res) => {
  const name = req.params.name;
  const user = users.find(
    (user) => user.name.toLowerCase() === name.toLowerCase()
  );
  if (user) {
    users.splice(users.indexOf(user), 1);
    res.json({ status: "OK", data: user });
  } else {
    res.status(404).json({ status: "Not Found" });
  }
});

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    const target = path.join(__dirname, "public", file.originalname);
    fs.renameSync(file.path, target);
    res.json({
      status: "success",
      message: "file berhasil diupload",
      data: file,
    });
  } else {
    res.json({
      status: "error",
      message: "file gagal diupload",
    });
  }
});

app.use((_, res) => {
  res
    .status(404)
    .json({ status: "error", message: "resource tidak ditemukan" });
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ status: "error", message: "terjadi kesalahan pada server" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
