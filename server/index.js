import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// import postRoutes from './routes/posts.js';
// import userRoutes from './routes/users.js';
import auth from './routes/auth.js';
import listing from './routes/listing.js'
import bookings from './routes/bookings.js'
import user from './routes/user.js';

const app = express();
dotenv.config();



// Body parser middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// CORS middleware
app.use(cors({
  origin: '*',
}));

// Routes
// Multer configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });



// app.use('/posts', postRoutes);
// app.use('/user', userRoutes);
app.use('/api/auth',auth)
app.use('/api/listing',listing)
app.use('/api/bookings',bookings);
app.use('/api/user',user);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

startServer();
