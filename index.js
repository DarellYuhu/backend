const express = require("express");
const { prisma } = require("./db");

const app = express();

app.use(express.json());

/* ---------------- */

app.get("/students", async (req, res) => {
  try {
    const data = await prisma.students.findMany();
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/students", async (req, res) => {
  const { name, address } = req.body;
  try {
    if (!name || !address)
      return res.status(400).json({
        status: "failed",
        message: "name dan address harus diisi",
      });
    const data = await prisma.students.create({
      data: {
        name,
        address,
      },
    });
    res.status(200).json({
      status: "success",
      message: "data berhasil dimasukan",
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Get student by ID
app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.students.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update Student by ID
app.patch("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const data = await prisma.students.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        name,
        address,
      },
    });
    res.status(200).json({
      status: "success",
      message: "data berhasil diubah",
      data,
    });
  } catch (error) {
    if (error.code === "P2025")
      return res.status(404).json({
        status: "failed",
        message: "data tidak ditemukan",
      });
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Student by ID
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.students.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    res.status(200).json({
      status: "success",
      message: "data berhasil dihapus",
      data,
    });
  } catch (error) {
    if (error.code === "P2025")
      return res.status(404).json({
        status: "failed",
        message: "data tidak ditemukan",
      });
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

/* ----------------- */

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
