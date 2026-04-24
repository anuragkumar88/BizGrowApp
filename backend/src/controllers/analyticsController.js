const analyticsService = require('../services/analyticsService');

const getDashboardData = async (req, res, next) => {
  try {
    const data = await analyticsService.getDashboardData(req.user.userId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardData,
};
