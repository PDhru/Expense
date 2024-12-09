const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getUserChartExpenses } = require('../controllers/chartController');

const router = express.Router();

router.get('/', protect, getUserChartExpenses);

module.exports = router;