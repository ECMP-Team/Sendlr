import fileProcessingWorker from './fileProcessingWorker.js';
import aiGenerationWorker from './aiGenerationWorker.js';
import emailSendingWorker from './emailSendingWorker.js';
import chalk from 'chalk';

console.log(chalk.blue.bold('🚀 Starting All Background Workers...'));
console.log(chalk.gray('───────────────────────────────────────'));

// Workers are imported and started automatically
// Each worker exports itself and starts listening when imported

const workers = {
  fileProcessing: fileProcessingWorker,
  aiGeneration: aiGenerationWorker,
  emailSending: emailSendingWorker
};

// Graceful shutdown for all workers
process.on('SIGTERM', async () => {
  console.log(chalk.yellow('\n🛑 Received SIGTERM. Shutting down all workers gracefully...'));
  
  try {
    await Promise.all([
      workers.fileProcessing.close(),
      workers.aiGeneration.close(),
      workers.emailSending.close()
    ]);
    
    console.log(chalk.green('✅ All workers shut down successfully'));
    process.exit(0);
  } catch (error) {
    console.error(chalk.red('❌ Error during worker shutdown:'), error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  console.log(chalk.yellow('\n🛑 Received SIGINT. Shutting down all workers gracefully...'));
  
  try {
    await Promise.all([
      workers.fileProcessing.close(),
      workers.aiGeneration.close(),
      workers.emailSending.close()
    ]);
    
    console.log(chalk.green('✅ All workers shut down successfully'));
    process.exit(0);
  } catch (error) {
    console.error(chalk.red('❌ Error during worker shutdown:'), error);
    process.exit(1);
  }
});

console.log(chalk.green.bold('✅ All Workers Started Successfully!'));
console.log(chalk.gray('───────────────────────────────────────'));
console.log(chalk.blue('📁 File Processing Worker: Ready'));
console.log(chalk.magenta('🤖 AI Generation Worker: Ready'));
console.log(chalk.cyan('📧 Email Sending Worker: Ready'));
console.log(chalk.gray('───────────────────────────────────────'));
console.log(chalk.white('Press Ctrl+C to stop all workers'));

export default workers; 