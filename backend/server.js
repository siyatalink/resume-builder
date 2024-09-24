require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// Connect to MongoDB
const db = process.env.DB_URI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Protect routes that require authentication
app.post('/api/personal-info', authMiddleware, (req, res) => {
  // Call your savePersonalInfo controller here
  require('./controllers/authController').savePersonalInfo(req, res);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
