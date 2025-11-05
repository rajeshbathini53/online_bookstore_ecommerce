import express from 'express';
import multer from 'multer';
import { uploadBooksFromExcel } from '../controllers/adminController.js';

const router = express.Router();

// Memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/admin/upload-books
router.post('/upload-books', upload.single('file'), uploadBooksFromExcel);

export default router;
