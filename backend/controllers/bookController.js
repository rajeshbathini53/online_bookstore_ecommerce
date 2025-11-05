import Book from '../models/Book.js';

export const addBook = async (req, res) => {
  try {
    console.log("[DEBUG] Inside addBook controller");

    const { author, title, subject, description, quantity } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!author || !title || !subject || !description || !quantity) {
      console.log("[DEBUG] Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({
      author,
      title,
      subject,
      description,
      quantity,
      image
    });

    await newBook.save();
    console.log("[DEBUG] Book added successfully:", newBook);
    res.status(201).json({ message: "Book added", book: newBook });
  } catch (error) {
    console.error("[ERROR] Failed to add book:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

import BookTaken from '../models/BookTaken.js';
export const getAllTakenBooks = async (req, res) => {
  try {
    const allTaken = await BookTaken.find({ status: 'taken' })
      .populate('bookId')       // ✅ Populate book details
      .populate('userId');      // ✅ Populate user details

    res.json(allTaken);
  } catch (error) {
    console.error("[ERROR] getAllTakenBooks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("[ERROR] Failed to fetch books:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted", book });
  } catch (error) {
    console.error("[ERROR] Failed to delete book:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
