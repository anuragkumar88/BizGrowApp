const prisma = require('../config/db');
const claude = require('../integrations/claude');

const generateCampaignMessage = async (input) => {
  return claude.generateMessage(input);
};

const saveCampaign = async (userId, data) => {
  const campaign = await prisma.campaign.create({
    data: {
      user_id: userId,
      message: data.message,
      tags: JSON.stringify(data.tags || []),
    },
  });
  return { ...campaign, tags: JSON.parse(campaign.tags) };
};

module.exports = {
  generateCampaignMessage,
  saveCampaign,
};
