const prisma = require('../config/db');

const parseCustomer = (c) => ({ ...c, tags: JSON.parse(c.tags || '[]') });

const createCustomer = async (userId, data) => {
  const customer = await prisma.customer.create({
    data: {
      user_id: userId,
      name: data.name,
      phone: data.phone,
      tags: JSON.stringify(data.tags || []),
    },
  });
  return parseCustomer(customer);
};

const getCustomers = async (userId, filters = {}) => {
  const query = { where: { user_id: userId } };

  if (filters.search) {
    query.where.OR = [
      { name: { contains: filters.search } },
      { phone: { contains: filters.search } },
    ];
  }

  const customers = await prisma.customer.findMany(query);
  const parsed = customers.map(parseCustomer);

  if (filters.tag) {
    return parsed.filter(c => c.tags.includes(filters.tag));
  }
  return parsed;
};

const getCustomerProfile = async (userId, customerId) => {
  const customer = await prisma.customer.findFirst({
    where: {
      id: customerId,
      user_id: userId,
    },
    include: {
      transactions: true,
    },
  });

  if (!customer) {
    throw new Error('Customer not found');
  }

  return customer;
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerProfile,
};
