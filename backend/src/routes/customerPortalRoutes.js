const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getDashboardData } = require('../controllers/customerPortalController');

router.get('/dashboard', authMiddleware, getDashboardData);

module.exports = router;
