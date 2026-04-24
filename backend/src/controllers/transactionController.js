const transactionService = require('../services/transactionService');
const Joi = require('joi');

const addTransactionSchema = Joi.object({
  customerId: Joi.string().uuid().required(),
  amount: Joi.number().positive().required(),
  items: Joi.array().items(Joi.object()).default([]),
});

const addTransaction = async (req, res, next) => {
  try {
    const { error, value } = addTransactionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const transaction = await transactionService.addTransaction(req.user.userId, value);
    res.status(201).json(transaction);
  } catch (error) {
    if (error.message === 'Customer not found') {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

module.exports = {
  addTransaction,
};
