const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registerCustomer = async (req, res) => {
  try {
    const { phone, password, name, merchantId } = req.body;
    
    // Check if customer already exists
    const existing = await prisma.customer.findUnique({ where: { phone } });
    if (existing) {
      return res.status(400).json({ error: 'Customer with this phone already exists' });
    }

    // Default to the first user if no merchantId is provided (for hackathon purposes)
    let finalMerchantId = merchantId;
    if (!finalMerchantId) {
        const firstMerchant = await prisma.user.findFirst();
        if (firstMerchant) {
            finalMerchantId = firstMerchant.id;
        } else {
            return res.status(400).json({ error: 'No merchants available to register under.' });
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newCustomer = await prisma.customer.create({
      data: {
        phone,
        password: hashedPassword,
        name,
        user_id: finalMerchantId,
        tags: '[]',
        points: 0
      }
    });

    const token = jwt.sign({ id: newCustomer.id, role: 'customer' }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
    
    res.status(201).json({
      message: 'Customer registered successfully',
      token,
      customer: { id: newCustomer.id, name: newCustomer.name, phone: newCustomer.phone }
    });
  } catch (error) {
    console.error('Customer Register Error:', error);
    res.status(500).json({ error: 'Server error during customer registration' });
  }
};

const loginCustomer = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const customer = await prisma.customer.findUnique({ where: { phone } });
    if (!customer) {
      return res.status(400).json({ error: 'Invalid phone or password' });
    }

    // If password is not set (e.g. existing customer from before), fail or allow setup?
    // Let's just fail for now.
    if (!customer.password) {
        return res.status(400).json({ error: 'Please register first or setup password.' });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid phone or password' });
    }

    const token = jwt.sign({ id: customer.id, role: 'customer' }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
    
    res.json({
      message: 'Logged in successfully',
      token,
      customer: { id: customer.id, name: customer.name, phone: customer.phone }
    });
  } catch (error) {
    console.error('Customer Login Error:', error);
    res.status(500).json({ error: 'Server error during customer login' });
  }
};

module.exports = {
  registerCustomer,
  loginCustomer
};
