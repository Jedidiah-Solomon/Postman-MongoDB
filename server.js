const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGODB_URI_ADMIN, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a schema and model
const bookSchema = new mongoose.Schema(
  {
    custom_id: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    imgUrl: { type: String, required: true },
    publication: {
      publisher: { type: String, required: true },
      year: { type: Number, required: true },
      location: { type: String, required: true },
    },
    genres: { type: [String], required: true },
    reviews: [
      {
        reviewer: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
  },
  { collection: "Bookstore_jvn" }
);

const Book = mongoose.model("Book", bookSchema);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Home Page
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

// Add Book Page
app.get("/addbook", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "public", "pages", "addBook.html"));
});

// Check Book Page
app.get("/checkbook", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "public", "pages", "checkbook.html"));
});

// GET all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to view all books as HTML
app.get("/view-all-books", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "public", "pages", "allbooks.html"));
});

// POST a new book
app.post("/books", async (req, res) => {
  const { custom_id, title, author, imgUrl, publication, genres, reviews } =
    req.body;

  const newBook = new Book({
    custom_id,
    title,
    author,
    imgUrl,
    publication,
    genres,
    reviews,
  });

  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search books by genre, author, year, or ID
app.get("/books/search", async (req, res) => {
  const { genre, author, year, custom_id } = req.query;
  let filter = {};

  if (genre) {
    filter.genres = { $regex: new RegExp(genre, "i") };
  }
  if (author) {
    filter.author = { $regex: new RegExp(author, "i") };
  }
  if (year) {
    filter["publication.year"] = year;
  }
  if (custom_id) {
    filter.custom_id = { $regex: new RegExp(custom_id, "i") };
  }

  try {
    const books = await Book.find(filter);
    if (books.length === 0) {
      return res.status(404).json({ message: "Books not found!" });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server listening
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
