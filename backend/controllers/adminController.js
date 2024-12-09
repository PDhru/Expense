// controllers/adminController.js
const User = require('../models/userModel');
const Expense = require('../models/expenseModel');

// Get all users with their expenses
const getAllUsersWithExpenses = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Fetch all users excluding passwords
    const expenses = await Expense.find(); // Fetch all expenses

    // Combine users and their expenses
    const data = users.map((user) => {
      const userExpenses = expenses.filter(
        (expense) => expense.user.toString() === user._id.toString()
      );
      return { user, expenses: userExpenses };
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users and expenses', error: error.message });
  }
};

module.exports = { getAllUsersWithExpenses };
