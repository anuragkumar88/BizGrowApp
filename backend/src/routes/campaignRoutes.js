const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/generate', campaignController.generateMessage);
router.post('/', campaignController.saveCampaign);

module.exports = router;
