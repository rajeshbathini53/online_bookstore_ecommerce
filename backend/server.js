import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
dotenv.config(); // ✅ Load env variables first

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB using correct env variable
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send("Welcome to Online Book store APP");
});

app.use('/api',adminRoutes);
app.use('/api', userRoutes);

import bookRoutes from './routes/bookRoutes.js';
app.use('/api', bookRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
