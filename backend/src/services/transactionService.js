const prisma = require('../config/db');

const addTransaction = async (userId, data) => {
  // First, verify the customer belongs to this user
  const customer = await prisma.customer.findFirst({
    where: { id: data.customerId, user_id: userId },
  });

  if (!customer) {
    throw new Error('Customer not found');
  }

  // Get user settings to calculate points
  const settings = await prisma.setting.findUnique({
    where: { user_id: userId },
  });

  const pointsRate = settings?.points_rate || 10;
  const pointsEarned = Math.floor(data.amount / pointsRate);

  // Use a transaction block to ensure both operations succeed or fail together
  return prisma.$transaction(async (tx) => {
    // 1. Create transaction record
    const transaction = await tx.transaction.create({
      data: {
        customer_id: data.customerId,
        amount: data.amount,
        items: JSON.stringify(data.items || []),
        points_earned: pointsEarned,
      },
    });

    // 2. Update customer points
    await tx.customer.update({
      where: { id: data.customerId },
      data: {
        points: {
          increment: pointsEarned,
        },
      },
    });

    return { ...transaction, items: JSON.parse(transaction.items) };
  });
};

module.exports = {
  addTransaction,
};
