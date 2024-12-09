const csv = require('csv-parser');
const fs = require('fs');
const Expense = require('../models/expenseModel');
// const upload = multer({ dest: 'uploads/' });
const moment = require('moment');


const addExpense = async (req, res) => {
  const { amount, description, date, category, paymentMethod } = req.body;

  if (!amount || !description || !date || !category || !paymentMethod) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const expense = new Expense({
    user: req.user._id,
    amount,
    description,
    date,
    category,
    paymentMethod,
  });

  const createdExpense = await expense.save();
  res.status(201).json(createdExpense);
};

const updateExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  if (expense.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedExpense);
};

const getExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'date', order = 'desc', search = '' } = req.query;
    const sortOptions = {
      [sortBy]: order === 'asc' ? 1 : -1
    };
    
    const filter = {
      user: req.user._id, 
      ...(search && {
        $or: [
          { description: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
        ]
      })
    };

    const expenses = await Expense.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalExpenses = await Expense.countDocuments(filter);

    res.json({
      expenses,
      totalPages: Math.ceil(totalExpenses / limit),
      currentPage: Number(page),
      totalExpenses
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// Get a single expense by ID
const getExpense = async (req, res) => {
  try {
    const { id } = req.params; // Get the expense ID from the URL params
    const expense = await Expense.findById(id); // Find the expense by ID

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(expense); // Return the expense details
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const uploadExpensesCSV = async (req, res) => {
  try {
    const filePath = req.file.path;  // Path to the uploaded file
    const expenses = [];

    // Parse the CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Validate each row
        const { amount, description, date, category, paymentMethod } = row;

        // Simple validation for required fields
        if (!amount || !description || !date || !category || !paymentMethod) {
          return res.status(400).json({ message: 'Invalid CSV data, missing required fields' });
        }

        // Push the valid data into the expenses array
        expenses.push({
          user: req.user._id,  // Link the expense to the logged-in user
          amount: parseFloat(amount),
          description,
          date: new Date(date),
          category,
          paymentMethod,
        });
      })
      .on('end', async () => {
        // Bulk insert the expenses into the database
        await Expense.insertMany(expenses);
        res.status(200).json({ message: 'Expenses uploaded successfully' });

        // Optionally, delete the file after processing
        fs.unlinkSync(filePath);
      });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


const deleteExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.id);
  
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
  
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  
    // Using findByIdAndDelete
    await Expense.findByIdAndDelete(req.params.id);
  
    res.json({ message: 'Expense removed' });
  };

const bulkDeleteExpenses = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No expense IDs provided' });
    }

    // Delete all expenses with the given IDs
    const result = await Expense.deleteMany({ _id: { $in: ids }, user: req.user._id });

    res.status(200).json({ message: `${result.deletedCount} expenses removed` });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
  
module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  bulkDeleteExpenses,
  uploadExpensesCSV,
  getExpense
}
