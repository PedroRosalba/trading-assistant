const {
    Connection,
    PublicKey,
    Keypair,
    clusterApiUrl,
  } = require('@solana/web3.js');
  
  let connection;
  let subscriptionId;
  
  async function startSolanaMonitor() {
    // 1. Create connection
    connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  
    // 2. Example public key to monitor (replace with your actual):
    const tradingWalletPubkey = new PublicKey(process.env.PUBLIC_KEY);
  
    subscriptionId = connection.onLogs(
      tradingWalletPubkey,
      async (log, ctx) => {
        console.log("Detected transaction involving trading wallet:", log.signature);
        // parse details, handle deposit logic, etc.
      },
      "confirmed"
    );
  
    console.log("Monitoring started with subscriptionId:", subscriptionId);
  }
  
  async function stopSolanaMonitor() {
    // Cancel subscription if you want to gracefully stop
    if (subscriptionId !== undefined) {
      await connection.removeOnLogsListener(subscriptionId);
      console.log("Stopped Solana monitor");
    }
  }
  
  module.exports = {
    startSolanaMonitor,
    stopSolanaMonitor
  };