import BookTaken from '../models/BookTaken.js';
import Book from '../models/Book.js';

export const takeBook = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { bookId } = req.body;

    console.log("[DEBUG] takeBook => userId:", userId, "bookId:", bookId);

    if (!userId || !bookId) {
      return res.status(400).json({ message: "Missing userId or bookId" });
    }

    // Check if already taken and not returned
    const existingRecord = await BookTaken.findOne({ userId, bookId, status: 'taken' });
    if (existingRecord) {
      return res.status(400).json({ message: "You have already taken this book" });
    }

    // ✅ Check if book exists and quantity > 0
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.quantity <= 0) {
      return res.status(400).json({ message: "Book is out of stock" });
    }

    // ✅ Decrease quantity
    book.quantity -= 1;
    await book.save();

    // ✅ Mark book as taken
    const takenBook = new BookTaken({ userId, bookId, status: 'taken' });
    await takenBook.save();

    res.status(201).json({ message: "Book marked as taken", takenBook });
  } catch (error) {
    console.error("[ERROR] takeBook:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const returnBook = async (req, res) => {
  try {
    const { recordId } = req.params;

    const record = await BookTaken.findById(recordId).populate('bookId');
    if (!record || record.status === 'returned') {
      return res.status(400).json({ message: "Already returned or not found" });
    }

    // Update status
    record.status = 'returned';
    await record.save();

    // Increment book quantity
    await Book.findByIdAndUpdate(record.bookId._id, { $inc: { quantity: 1 } });

    res.json({ message: "Book marked as returned successfully" });
  } catch (error) {
    console.error("[ERROR] returnBook:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserTakenBooks = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ message: "Missing user ID" });
    }

    const takenBooks = await BookTaken.find({ userId, status: 'taken' }).select('bookId');
    const bookIds = takenBooks.map(entry => entry.bookId.toString());
    res.json(bookIds);
  } catch (error) {
    console.error("[ERROR] getUserTakenBooks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};