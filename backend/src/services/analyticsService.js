const prisma = require('../config/db');

const getDashboardData = async (userId) => {
  // 1. Total Revenue
  const transactions = await prisma.transaction.findMany({
    where: {
      customer: {
        user_id: userId,
      },
      // You can add date filters here if needed
    },
  });

  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);c

  // 2. Total Customers
  const totalCustomers = await prisma.customer.count({
    where: { user_id: userId },
  });
  // 3. Recent Transactions
  const recentTransactions = await prisma.transaction.findMany({
    where: {
      customer: { user_id: userId },
    },
    include: {
      customer: { select: { name: true } }
    },
    orderBy: { created_at: 'desc' },
    take: 5,
  });

  return {
    totalRevenue,
    totalCustomers,
    recentTransactions,
  };
};

module.exports = {
  getDashboardData,
};
