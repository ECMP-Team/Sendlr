# 📧 ECMP - Email Campaign Management Platform

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-4.21+-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)
![Redis](https://img.shields.io/badge/Redis-7+-red.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

**A powerful, scalable email campaign management platform with AI-powered content generation and background job processing.**

[Features](#-features) • [Quick Start](#-quick-start) • [API Documentation](#-api-documentation) • [Docker Setup](#-docker-deployment) • [Contributing](#-contributing)

</div>

---

## 🌟 Features

### 📨 **Email Management**
- **Bulk Email Sending** - Send emails to thousands of recipients efficiently
- **Individual Personalization** - AI-powered personalized content for each recipient
- **Campaign Management** - Organize and track email campaigns
- **Background Processing** - Scalable job queue system with BullMQ

### 🤖 **AI-Powered Content**
- **Smart Email Generation** - AI-powered email content creation
- **Personalization** - Dynamic content based on recipient data
- **Custom Prompts** - Flexible prompt system for content generation

### 🔧 **Developer Experience**
- **RESTful API** - Clean, well-documented API endpoints
- **Swagger Documentation** - Interactive API documentation
- **Real-time Monitoring** - Bull Board dashboard for job monitoring
- **TypeScript Ready** - Full type safety with Prisma

### 🛡️ **Security & Performance**
- **JWT Authentication** - Secure user authentication
- **Rate Limiting** - Arcjet-powered protection
- **Database Optimization** - Efficient Prisma ORM queries
- **Horizontal Scaling** - Separate API and worker processes

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 15+
- Redis 7+
- (Optional) Docker & Docker Compose

### 1. Installation

```bash
# Clone the repository
git clone <repo-url>
cd ecmp

# Install dependencies
npm install

# Install Prisma tools
npm install --save-dev prisma@latest                       
npm install @prisma/client@latest    
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# Required: DATABASE_URL, REDIS_HOST, RESEND_API_KEY, JWT_SECRET
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### 4. Start Development

```bash
# Start the API server
npm run dev

# In another terminal, start background workers
npm run workers:dev
```

🎉 **Your ECMP server is now running!**
- API: http://localhost:3000
- Documentation: http://localhost:3000/api-docs
- Queue Dashboard: http://localhost:3000/admin/queues

---

## 🐳 Docker Deployment (Advised)

### One-Command Setup

```bash
# Copy environment variables
cp .env.example .env
# Edit .env with your API keys

# Start all services
docker-compose up -d

# Run database migrations
docker-compose exec api npx prisma migrate deploy
```

### Services Included
- **API Server** (Port 3000)
- **PostgreSQL Database** (Port 5432)
- **Redis** (Port 6379)
- **Background Workers**  (Redis-based BullMQ queue)

### Management Commands

```bash
# View logs
docker-compose logs -f api

# Scale workers
docker-compose up -d --scale workers=3

# Database access
docker-compose exec postgres psql -U ecmp_user -d ecmp

# Restart services
docker-compose restart api workers
```

---

## 📖 API Documentation

### Authentication
All endpoints require JWT authentication except `/api/user/register` and `/api/user/login`.

```bash
# Include token in headers
Authorization: Bearer <your-jwt-token>
```

### Core Endpoints

#### 👤 **User Management**
```http
POST /api/user/register     # Create new account
POST /api/user/login        # Authenticate user
GET  /api/user/get-user     # Get current user
PUT  /api/user/update-user  # Update user profile
```

#### 📋 **Campaign Management**  
```http
POST /api/campaign/create-campaign   # Create new campaign
GET  /api/campaign/get-campaign/:id  # Get campaign details
GET  /api/campaign/get-campaigns     # List all campaigns
DELETE /api/campaign/delete-campaign/:id  # Delete campaign
```

#### 📧 **Email Operations**
```http
POST /api/email/generate-and-send        # AI-powered email generation & sending
POST /api/email/process-file-campaign    # File-based campaign processing
POST /api/email/send-bulk               # Simple bulk email sending
GET  /api/email/job-status/:jobId       # Check processing status
```

### Example Usage

#### Send AI-Generated Campaign
```javascript
const response = await fetch('/api/email/generate-and-send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    campaignId: "campaign-123",
    userData: [
      { email: "john@example.com", name: "John", company: "Tech Corp" },
      { email: "jane@example.com", name: "Jane", company: "Design Ltd" }
    ],
    fromEmail: "hello@yourcompany.com",
    prompt: "Write a personalized introduction email for a new product launch",
    useBackgroundWorkers: true
  })
});
```

---

## 🏗️ Architecture

### System Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Server    │    │ Background      │
│   (Your App)    │◄──►│   (Express.js)  │◄──►│ Workers         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                        ┌───────▼───────┐       ┌───────▼───────┐
                        │  PostgreSQL   │       │     Redis     │
                        │   Database    │       │   Job Queue   │
                        └───────────────┘       └───────────────┘
```

### Tech Stack
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL + Prisma ORM  
- **Queue**: Redis + BullMQ
- **Authentication**: JWT + bcrypt
- **Email Service**: Resend API
- **AI Integration**: Google Generative AI
- **Security**: Arcjet rate limiting
- **Monitoring**: Bull Board dashboard
- **Documentation**: Swagger/OpenAPI

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | `3000` |
| `DATABASE_URL` | PostgreSQL connection | Yes | - |
| `REDIS_HOST` | Redis host | Yes | `127.0.0.1` |
| `REDIS_PORT` | Redis port | No | `6379` |
| `RESEND_API_KEY` | Email service API key | Yes | - |
| `AI_API` | Google AI API key | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `ARCJET_KEY` | Rate limiting key | Yes | - |

### Available Scripts

```bash
npm start              # Production server
npm run dev            # Development with hot reload
npm run workers        # Start background workers
npm run workers:dev    # Workers with hot reload
npm run test:batch     # Test bulk email sending
npm run test:real      # Real email sending test
```

---

## 📊 Monitoring & Debugging

### Queue Dashboard
Access the Bull Board dashboard at `/admin/queues` to monitor:
- Job processing status
- Queue statistics
- Failed job details
- Worker performance

### Health Check
```bash
GET /api/health
```
Returns system status and database connectivity.

### Logging
- Application logs: Console output with colored formatting
- Queue logs: Available in Bull Board
- Database logs: Prisma query logging (dev mode)

---

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Install dependencies: `npm install`
4. Set up environment: `cp .env.example .env`
5. Run migrations: `npx prisma migrate dev`
6. Start development: `npm run dev`

### Code Standards
- Use ESLint + Prettier for formatting
- Follow conventional commit messages
- Add tests for new features
- Update documentation

### Commit Format
```
✨ feat(scope): add amazing feature
🛠️ fix(api): resolve email sending issue
📋 docs(readme): update installation guide
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Resend](https://resend.com) for reliable email delivery
- [BullMQ](https://docs.bullmq.io/) for robust job processing
- [Prisma](https://prisma.io) for excellent database tooling
- [Arcjet](https://arcjet.com) for security protection

---

<div align="center">

**Built with ❤️ By Yasser Dalali, Yasin Mazhare and Nouredinne Achbili. 2025**

[⭐ Star this repo](../../stargazers) • [🐛 Report Bug](../../issues) • [💡 Request Feature](../../issues)

</div>
