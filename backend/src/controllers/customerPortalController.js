const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDashboardData = async (req, res) => {
  try {
    const customerId = req.user.id;

    // Fetch customer data along with their transactions and the store they belong to
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        user: {
          select: { store_name: true }
        },
        transactions: {
          orderBy: { created_at: 'desc' },
          take: 10
        }
      }
    });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Prepare active campaigns from their merchant
    const campaigns = await prisma.campaign.findMany({
        where: { user_id: customer.user_id },
        orderBy: { created_at: 'desc' },
        take: 5
    });

    res.json({
      storeName: customer.user.store_name,
      points: customer.points,
      transactions: customer.transactions,
      activeCampaigns: campaigns
    });
  } catch (error) {
    console.error('Customer Dashboard Error:', error);
    res.status(500).json({ error: 'Server error fetching dashboard data' });
  }
};

module.exports = {
  getDashboardData
};
