require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes (we will create these next)
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const loyaltyRoutes = require('./routes/loyaltyRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// Import Error Handler
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/customers', customerRoutes);
app.use('/transactions', transactionRoutes);
app.use('/loyalty', loyaltyRoutes);
app.use('/campaigns', campaignRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/settings', settingsRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
