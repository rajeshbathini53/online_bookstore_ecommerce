import express from 'express';
import { addBook, deleteBook, getAllBooks, getAllTakenBooks } from '../controllers/bookController.js';
import multer from 'multer';
import path from 'path';
import { authenticateToken } from '../middleware/middleware.js';

const router = express.Router();

// Log when bookRoutes is loaded
console.log("[DEBUG] bookRoutes.js loaded");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // ensure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage: storage });
router.get('/books', getAllBooks);

// DELETE /api/books/:id
import { getUserTakenBooks, returnBook, takeBook } from '../controllers/bookTakenController.js';

router.post('/takebook', authenticateToken, takeBook);

router.delete('/books/:id', authenticateToken, deleteBook);
// Add Book Route with Debug
router.post('/addbook', authenticateToken, upload.single('image'), (req, res, next) => {
  console.log("[DEBUG] /addbook route6 hit");
  console.log("[DEBUG] req.body:", req.body);
  console.log("[DEBUG] req.file:", req.file);
  next(); // forward to controller
}, addBook);
router.put('/return-book/:recordId', authenticateToken, returnBook);
router.get('/all-taken-books', authenticateToken, getAllTakenBooks); 
router.post('/takebook', authenticateToken, (req, res, next) => {
  console.log("[DEBUG] /takebook route hit with bookId:", req.body.bookId);
  next();
}, takeBook);
router.get('/my-taken-books', authenticateToken, getUserTakenBooks);

export default router;
