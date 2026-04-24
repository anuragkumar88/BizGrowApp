const loyaltyService = require('../services/loyaltyService');
const Joi = require('joi');

const redeemPointsSchema = Joi.object({
  customerId: Joi.string().uuid().required(),
  points: Joi.number().integer().positive().required(),
});

const redeemPoints = async (req, res, next) => {
  try {
    const { error, value } = redeemPointsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedCustomer = await loyaltyService.redeemPoints(req.user.userId, value.customerId, value.points);
    res.status(200).json({ message: 'Points redeemed successfully', customer: updatedCustomer });
  } catch (error) {
    if (error.message === 'Customer not found' || error.message === 'Insufficient points') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

module.exports = {
  redeemPoints,
};
