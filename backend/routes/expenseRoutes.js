const express = require('express');
const { protect ,authenticateUser} = require('../middlewares/authMiddleware');
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  bulkDeleteExpenses,
  // getUserChartExpenses,
  getExpense,
  // getExpenseSummary
} = require('../controllers/expenseController');
const { uploadExpensesCSV } = require('../controllers/expenseController');
const  upload  = require('../middlewares/multer'); 

const router = express.Router();

router.post('/', protect, addExpense);
router.get('/', protect, getExpenses);
router.route('/:id')
  .get(protect, getExpense)    
  .put(protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

router.post('/bulk-delete', protect, bulkDeleteExpenses);
router.post('/upload', protect, upload.single('csv'), uploadExpensesCSV);
// router.get('/chart', protect, getUserChartExpenses);
// router.get('/summary', getExpenseSummary);

module.exports = router;
