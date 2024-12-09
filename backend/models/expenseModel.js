const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit'],
    required: [true, 'Please specify the payment method'],
  },
}, {
  timestamps: true,
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
