const express = require('express');
const router = express.Router();
const {getMe} = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.get('/me',protect, getMe);

module.exports = router;