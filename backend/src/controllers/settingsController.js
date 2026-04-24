const settingsService = require('../services/settingsService');
const Joi = require('joi');

const updateSettingsSchema = Joi.object({
  points_rate: Joi.number().integer().positive().optional(),
  redemption_days: Joi.number().integer().positive().optional(),
});

const getSettings = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettings(req.user.userId);
    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const { error, value } = updateSettingsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const settings = await settingsService.updateSettings(req.user.userId, value);
    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
