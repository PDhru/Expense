const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');
const User = require('../models/userModel');
// const { getAllUsersWithExpenses } = require('../controllers/adminController');
const router = express.Router();


// Example admin route: Get all users (only admins can access this)
router.get('/users', protect, admin, async (req, res) => {
  const users = await User.find({});
  console.log(users)
  res.json(users);
});

// router.get('/users-expenses', protect, admin, getAllUsersWithExpenses);

module.exports = router;

