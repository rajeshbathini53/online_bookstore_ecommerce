import mongoose from 'mongoose';

const bookTakenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  takenAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['taken', 'returned'], default: 'taken' } // ✅ Added status field
});

export default mongoose.model('BookTaken', bookTakenSchema);
