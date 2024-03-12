const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

/* ---------------- */

app.get("/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/students", async (req, res) => {
  const { name, address } = req.body;
  try {
    const result = await db.query(
      `INSERT into students (name, address) values ('${name}', '${address}')`
    );
    res.status(200).json({
      status: "success",
      message: "data berhasil dimasukan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Update Student by ID
app.patch("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    if (!name || !address)
      return res
        .status(400)
        .json({ status: "error", message: "Name and address is required" });
    const result = await db.query(`
    UPDATE public.students
  	SET name='${name}', address='${address}'
	  WHERE id=${id};
    `);
    res.status(200).json({
      status: "success",
      message: "data berhasil diubah",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Student by ID
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(`DELETE FROM students WHERE id=${id}`);
    res.status(200).json({
      status: "success",
      message: "data berhasil dihapus",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get student by ID
app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(`SELECT * FROM students WHERE id=${id}`);
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

/* ----------------- */

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
