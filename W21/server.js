const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/bookstore");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  genre: String,
});

const Book = mongoose.model("Book", bookSchema);

// Insert sample books if collection is empty
mongoose.connection.once("open", async () => {
  const count = await Book.countDocuments();
  if (count === 0) {
    await Book.insertMany([
      { title: "Atomic Habits", author: "James Clear", price: 499, genre: "Self-help" },
      { title: "The Alchemist", author: "Paulo Coelho", price: 299, genre: "Fiction" },
      { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 399, genre: "Finance" },
    ]);
    console.log("Sample books added.");
  }
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});

// Routes
app.get("/api/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post("/api/books", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

app.put("/api/books/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
});

app.delete("/api/books/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
