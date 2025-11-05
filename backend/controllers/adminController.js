import XLSX from 'xlsx';
import Book from '../models/Book.js';

export const uploadBooksFromExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No Excel file uploaded' });
    }

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!data.length) {
      return res.status(400).json({ message: 'Excel file is empty' });
    }

    // Validate and map data
    const books = data.map(item => ({
      title: item.title?.toString() || '',
      author: item.author?.toString() || '',
      subject: item.subject?.toString() || '',
      description: item.description?.toString() || '',
      quantity: Number(item.quantity) || 0,
      image: item.image?.toString() || '',
    }));

    await Book.insertMany(books);
    res.status(200).json({ message: 'Books uploaded successfully' });

  } catch (error) {
    console.error('Excel upload error:', error.message);
    res.status(500).json({ message: 'Server error while uploading books' });
  }
};
