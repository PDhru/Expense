const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
// const { getUserProfile } = require('../controllers/userController');
const router = express.Router();
const User = require("../models/userModel")

// Example route: Get the logged-in user's profile
router.get('/profile', protect, (req, res) => {
  console.log('Profile route hit');
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
  });
});

// router.get('/profile', protect, getUserProfile);

module.exports = router;
