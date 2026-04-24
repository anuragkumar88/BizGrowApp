const campaignService = require('../services/campaignService');
const Joi = require('joi');

const generateSchema = Joi.object({
  input: Joi.string().required(),
});

const saveCampaignSchema = Joi.object({
  message: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional(),
});

const generateMessage = async (req, res, next) => {
  try {
    const { error, value } = generateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const message = await campaignService.generateCampaignMessage(value.input);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

const saveCampaign = async (req, res, next) => {
  try {
    const { error, value } = saveCampaignSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const campaign = await campaignService.saveCampaign(req.user.userId, value);
    res.status(201).json(campaign);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateMessage,
  saveCampaign,
};
