const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/student");

const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_marks: Number,
});

const Student = mongoose.model("studentmarks", studentSchema);

// Default students to insert if DB is empty
const defaultStudents = [
  { Name: "Alice", Roll_No: 1, WAD_Marks: 30, CC_Marks: 28, DSBDA_Marks: 35, CNS_Marks: 26, AI_marks: 22 },
  { Name: "Bob", Roll_No: 2, WAD_Marks: 18, CC_Marks: 21, DSBDA_Marks: 19, CNS_Marks: 23, AI_marks: 25 },
  { Name: "Charlie", Roll_No: 3, WAD_Marks: 29, CC_Marks: 25, DSBDA_Marks: 32, CNS_Marks: 30, AI_marks: 34 },
  { Name: "Daisy", Roll_No: 4, WAD_Marks: 26, CC_Marks: 30, DSBDA_Marks: 28, CNS_Marks: 27, AI_marks: 31 },
  { Name: "Ethan", Roll_No: 5, WAD_Marks: 24, CC_Marks: 20, DSBDA_Marks: 22, CNS_Marks: 19, AI_marks: 20 },
];

// On server start, insert default students if DB is empty
mongoose.connection.once("open", async () => {
  const count = await Student.countDocuments();
  if (count === 0) {
    await Student.insertMany(defaultStudents);
    console.log("✅ Inserted 5 default students.");
  }
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
});

// API to get all students
app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Count
app.get("/api/count", async (req, res) => {
  const count = await Student.countDocuments();
  res.json({ count });
});

// Insert student
app.post("/api/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
});

// Delete student by name
app.delete("/api/students/:name", async (req, res) => {
  const { name } = req.params;
  const result = await Student.deleteOne({ Name: name });
  res.json(result);
});

// Filter: DSBD > 20
app.get("/api/dsbda-above-20", async (req, res) => {
  const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
  res.json(students);
});

// Filter: All subjects > 25
app.get("/api/all-above-25", async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_marks: { $gt: 25 },
  });
  res.json(students);
});

// Filter: Maths & Science < 40
app.get("/api/math-science-less-40", async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $lt: 40 },
    CNS_Marks: { $lt: 40 },
  });
  res.json(students);
});

// Update marks of a student by +10
app.put("/api/students/:name", async (req, res) => {
  const { name } = req.params;
  const student = await Student.findOne({ Name: name });
  if (!student) return res.status(404).json({ error: "Student not found" });

  student.WAD_Marks += 10;
  student.CC_Marks += 10;
  student.DSBDA_Marks += 10;
  student.CNS_Marks += 10;
  student.AI_marks += 10;

  await student.save();
  res.json(student);
});
