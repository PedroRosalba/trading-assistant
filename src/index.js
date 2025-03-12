require('dotenv').config(); 
const express = require('express');
const { startSolanaMonitor } = require('./services/solanaService');

async function main() {
  const app = express();
  
  app.get('/health', (req, res) => {
    res.send('OK - Trading Monitor is running');
  });

  app.get('/start', (req, res) => {
    startSolanaMonitor();
    res.send('OK - Trading Monitor started');
  });

  app.get('/stop', (req, res) => {
    stopSolanaMonitor();
    res.send('OK - Trading Monitor stopped');
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
}

main().catch(err => {
  console.error('Error starting app:', err);
  process.exit(1);
});