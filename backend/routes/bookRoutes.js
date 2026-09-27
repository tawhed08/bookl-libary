const express = require("express");

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

// GET all books + search + category filter
router.get("/", getBooks);

// GET single book
router.get("/:id", getBookById);

// POST new book
router.post("/", createBook);

// PUT update book
router.put("/:id", updateBook);

// DELETE book
router.delete("/:id", deleteBook);

module.exports = router;