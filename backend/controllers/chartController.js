const Expense = require('../models/expenseModel');

const getUserChartExpenses = async (req, res) => {
    try {
      const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching expenses', error: error.message });
    }
  };
  
module.exports = {getUserChartExpenses}
  