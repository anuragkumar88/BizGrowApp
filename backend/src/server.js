const app = require('./app');
const prisma = require('./config/db');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('BizGrow Backend is running......');
});

const startServer = async () => {
  // Try to connect to DB but don't crash if it fails (allows demo mode)
  try {
    await prisma.$connect();
    console.log('📦 Connected to Postgres database!');
  } catch (error) {
    console.warn('⚠️  Database not connected — running in demo mode (auth/DB routes will fail).');
    console.warn('   Set DATABASE_URL in .env to enable full functionality.');
  }

  app.listen(PORT, () => {
    console.log(`🚀 BizGrow backend running on http://localhost:${PORT}`);
  });
};

startServer();
