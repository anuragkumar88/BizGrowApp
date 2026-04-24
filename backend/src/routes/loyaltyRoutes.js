const express = require('express');
const router = express.Router();
const loyaltyController = require('../controllers/loyaltyController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/redeem', loyaltyController.redeemPoints);

module.exports = router;
