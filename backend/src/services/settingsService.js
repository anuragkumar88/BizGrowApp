const prisma = require('../config/db');

const getSettings = async (userId) => {
  return prisma.setting.findUnique({
    where: { user_id: userId },
  });
};

const updateSettings = async (userId, data) => {
  return prisma.setting.upsert({
    where: { user_id: userId },
    update: {
      points_rate: data.points_rate,
      redemption_days: data.redemption_days,
    },
    create: {
      user_id: userId,
      points_rate: data.points_rate || 10,
      redemption_days: data.redemption_days || 30,
    },
  });
};

module.exports = {
  getSettings,
  updateSettings,
};
