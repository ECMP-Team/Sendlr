#!/usr/bin/env node

import chalk from 'chalk';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(chalk.blue.bold('🚀 Sendlr Background Workers Startup Script'));
console.log(chalk.gray('═══════════════════════════════════════════════'));

// Check if Redis environment variables are set
const requiredEnvVars = ['REDIS_HOST', 'REDIS_PORT', 'AI_API'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.log(chalk.red('❌ Missing required environment variables:'));
  missingVars.forEach(varName => {
    console.log(chalk.red(`   - ${varName}`));
  });
  console.log(chalk.yellow('\n📝 Please set these variables in your .env file'));
  process.exit(1);
}

console.log(chalk.green('✅ Environment variables configured'));

// Display configuration
console.log(chalk.blue('\n📋 Configuration:'));
console.log(chalk.gray(`   Redis Host: ${process.env.REDIS_HOST}`));
console.log(chalk.gray(`   Redis Port: ${process.env.REDIS_PORT}`));
console.log(chalk.gray(`   AI API: ${process.env.AI_API ? '✓ Configured' : '❌ Missing'}`));

console.log(chalk.blue('\n🔧 Starting Workers:'));

// Start the workers
const workersPath = join(__dirname, '..', 'queue', 'workers', 'index.js');

const workerProcess = spawn('node', [workersPath], {
  stdio: 'inherit',
  env: process.env
});

workerProcess.on('error', (error) => {
  console.error(chalk.red('❌ Failed to start workers:'), error);
  process.exit(1);
});

workerProcess.on('close', (code) => {
  if (code !== 0) {
    console.log(chalk.red(`❌ Workers exited with code ${code}`));
    process.exit(code);
  } else {
    console.log(chalk.green('✅ Workers shut down gracefully'));
  }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n🛑 Received interrupt signal. Shutting down workers...'));
  workerProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\n🛑 Received termination signal. Shutting down workers...'));
  workerProcess.kill('SIGTERM');
});

console.log(chalk.green('\n✨ Workers are starting up...'));
console.log(chalk.blue('🌐 Monitor queues at: http://localhost:3000/admin/queues'));
console.log(chalk.gray('   Press Ctrl+C to stop workers\n')); 