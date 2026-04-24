const prisma = require('../config/db');

const redeemPoints = async (userId, customerId, pointsToRedeem) => {
  const customer = await prisma.customer.findFirst({
    where: { id: customerId, user_id: userId },
  });

  if (!customer) {
    throw new Error('Customer not found');
  }

  if (customer.points < pointsToRedeem) {
    throw new Error('Insufficient points');
  }

  // Deduct points
  const updatedCustomer = await prisma.customer.update({
    where: { id: customerId },
    data: {
      points: {
        decrement: pointsToRedeem,
      },
    },
  });

  return updatedCustomer;
};

module.exports = {
  redeemPoints,
};
