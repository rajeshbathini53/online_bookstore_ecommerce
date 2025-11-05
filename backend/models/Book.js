import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  subject: String,
  description: String,
  quantity: Number,          // ✅ added quantity
  image: String,             // Path to the uploaded image
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
export default Book;
