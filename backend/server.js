const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const chartRoutes = require('./routes/chartRoutes');
const errorHandler = require('./middlewares/errorHandler');


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use("/uploads", express.static("uploads"));
// Connect to MongoDB
connectDB();


// All the Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/chart', chartRoutes)
app.use(errorHandler);



// Default route
app.get('/', (req, res) => {
  res.send('Expense Tracker API');
});

// Listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
