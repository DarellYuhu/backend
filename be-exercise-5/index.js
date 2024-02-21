const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const upload = multer({ dest: "public" });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.post("/users", (req, res) => {
  const user = req.body;
  res.json({
    status: "success",
    message: "user berhasil ditambahkan",
    data: user,
  });
});

app.post("/photos", upload.single("photo"), (req, res) => {
  const photo = req.file;
  if (photo) {
    const target = path.join(__dirname, "public", photo.originalname);
    fs.renameSync(photo.path, target);
    res.json({
      status: "success",
      message: "photo berhasil diupload",
      data: photo,
    });
  } else {
    res.json({
      status: "error",
      message: "photo gagal diupload",
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
