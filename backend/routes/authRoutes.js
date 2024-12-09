const express = require('express');
// const { protect } = require('../middlewares/authMiddleware');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Register and login routes
router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/profile', protect, getUserProfile);


module.exports = router;
