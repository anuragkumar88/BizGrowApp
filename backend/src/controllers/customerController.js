const customerService = require('../services/customerService');
const Joi = require('joi');

const createCustomerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().min(10).required(),
  tags: Joi.array().items(Joi.string()).optional(),
});

const createCustomer = async (req, res, next) => {
  try {
    const { error, value } = createCustomerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const customer = await customerService.createCustomer(req.user.userId, value);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

const getCustomers = async (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      tag: req.query.tag,
    };

    const customers = await customerService.getCustomers(req.user.userId, filters);
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

const getCustomerProfile = async (req, res, next) => {
  try {
    const customer = await customerService.getCustomerProfile(req.user.userId, req.params.id);
    res.status(200).json(customer);
  } catch (error) {
    if (error.message === 'Customer not found') {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerProfile,
};
