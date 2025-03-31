const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./Routes/adminRoutes');
const userRoutes = require('./Routes/userRoute');
const cors = require('cors'); 
require('dotenv').config();




const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow cookies & auth headers
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Failed to connect to MongoDB', error));


app.get('/', (req, res) => {
  res.send('Welcome To NSS Backend!');
})
// Routes
app.use('/api/admin', adminRoutes); 
app.use('/api/user', userRoutes);

app.use('/*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
