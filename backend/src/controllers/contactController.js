const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Submit a contact message
// @route   POST /contact
// @access  Public
exports.submitMessage = async (req, res, next) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ error: 'Please provide subject and message' });
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        subject,
        message
      }
    });

    res.status(201).json({
      success: true,
      data: newMessage
    });
  } catch (error) {
    next(error);
  }
};
