# Background Workers System

This document explains the background workers system implemented using BullMQ and Redis for processing file uploads, AI content generation, and email sending.

## Architecture Overview

The system is built with three specialized workers that handle different aspects of email campaign processing:

1. **File Processing Worker** - Handles file parsing and validation
2. **AI Generation Worker** - Generates personalized email content using AI
3. **Email Sending Worker** - Sends emails and logs results

## Worker Types

### 1. File Processing Worker
- **Queue**: `FileProcessing`
- **Purpose**: Parse Excel/CSV files and validate email data
- **Input**: File path, campaign details
- **Output**: Creates AI generation jobs for validated data batches
- **Concurrency**: 2 files simultaneously

### 2. AI Generation Worker
- **Queue**: `AIGeneration`
- **Purpose**: Generate personalized email content using AI
- **Input**: User data batches, prompts, campaign details
- **Output**: Creates email sending jobs for each generated email
- **Concurrency**: 3 batches simultaneously

### 3. Email Sending Worker
- **Queue**: `EmailSending`
- **Purpose**: Send emails and log results to database
- **Input**: Email content, recipient, campaign details
- **Output**: Email delivery status and database logging
- **Concurrency**: 5 emails simultaneously

## Running Workers

### Start All Workers
```bash
npm run workers
```

### Development Mode (with auto-restart)
```bash
npm run workers:dev
```

### Individual Workers
```bash
# File processing only
npm run workers:file

# AI generation only
npm run workers:ai

# Email sending only
npm run workers:email

# Legacy batch worker
npm run workers:legacy
```

## Queue Dashboard

Monitor all queues using Bull Board dashboard:
- **URL**: `http://localhost:3000/admin/queues`
- **Features**: 
  - Real-time job monitoring
  - Queue statistics
  - Job retry/delete functionality
  - Performance metrics

## API Endpoints

### 1. Background Campaign Processing
```http
POST /api/email/generate-and-send
```

**Request Body:**
```json
{
  "campaignId": "campaign_id",
  "userData": [
    {
      "email": "user@example.com",
      "name": "John Doe",
      "company": "Example Corp"
    }
  ],
  "prompt": "Custom email prompt",
  "fromEmail": "sender@example.com",
  "useBackgroundWorkers": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Campaign processing started in background...",
  "processing": {
    "method": "background_workers",
    "totalRecipients": 100,
    "batchesCreated": 20,
    "aiJobIds": ["1", "2", "3"]
  },
  "monitoring": {
    "dashboard": "/admin/queues"
  }
}
```

### 2. File-Based Campaign Processing
```http
POST /api/email/process-file-campaign
```

**Request Body:**
```json
{
  "campaignId": "campaign_id",
  "filePath": "/path/to/data.xlsx",
  "prompt": "Custom email prompt",
  "fromEmail": "sender@example.com"
}
```

### 3. Job Status Check
```http
GET /api/email/job-status/{jobId}
```

## Queue Configuration

### Redis Connection
```javascript
{
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD
}
```

### Queue Settings
- **File Processing**: 3 attempts, 2s exponential backoff
- **AI Generation**: 2 attempts, 1s exponential backoff  
- **Email Sending**: 3 attempts, 1.5s exponential backoff

### Job Priorities
- File Processing: 10 (High)
- Campaign Processing: 8 (High)
- AI Generation: 5 (Medium)
- Email Sending: 1 (Low)

## Error Handling

### Automatic Retries
- Failed jobs are automatically retried based on queue configuration
- Exponential backoff prevents overwhelming external services

### Failure Logging
- All failures are logged with detailed error messages
- Failed email attempts are recorded in the database

### Graceful Shutdown
- Workers handle SIGTERM/SIGINT for graceful shutdown
- In-progress jobs are completed before shutdown

## Monitoring and Debugging

### Log Output
Workers provide color-coded console output:
- 🔵 **Blue**: File processing operations
- 🟣 **Magenta**: AI generation operations  
- 🔵 **Cyan**: Email sending operations
- 🟢 **Green**: Success messages
- 🔴 **Red**: Error messages
- 🟡 **Yellow**: Warning messages

### Performance Metrics
- Job completion times
- Success/failure rates
- Queue depths
- Worker utilization

## Development Tips

### Local Development
1. Ensure Redis is running locally
2. Set environment variables in `.env`
3. Start workers with `npm run workers:dev`
4. Use dashboard at `/admin/queues` for monitoring

### Testing
- Use smaller batch sizes for testing
- Monitor queue dashboard for job progress
- Check application logs for detailed execution info

### Scaling
- Increase worker concurrency for higher throughput
- Add more worker instances for horizontal scaling
- Monitor Redis memory usage with large job volumes

## Environment Variables

Required environment variables:
```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_password
AI_API=your_ai_api_key
```

## Legacy Support

The system maintains backward compatibility with synchronous processing:
- Set `useBackgroundWorkers: false` in API requests
- Legacy worker still available at `npm run workers:legacy`
- Existing API endpoints continue to work

## Troubleshooting

### Common Issues

1. **Redis Connection Failed**
   - Check Redis server is running
   - Verify connection credentials
   - Ensure network connectivity

2. **Jobs Stuck in Queue**
   - Check worker processes are running
   - Verify no worker errors in logs
   - Use dashboard to manually retry jobs

3. **High Memory Usage**
   - Reduce batch sizes
   - Increase job cleanup settings
   - Monitor Redis memory usage

4. **AI Generation Failures**
   - Check AI API credentials
   - Verify API rate limits
   - Review prompt formatting

5. **Email Sending Issues**
   - Verify email service credentials
   - Check recipient email validity
   - Review sending rate limits 