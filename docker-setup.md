# Docker Setup for ECMP

This project includes Docker configuration for easy deployment and development.

## Quick Start

1. **Set up environment variables**:
   - Copy `.env.example` to `.env`
   - Fill in the required API keys:
     - `RESEND_API_KEY`
     - `AI_API`
     - `JWT_SECRET`
     - `ARCJET_KEY`

2. **Start the services**:
   ```bash
   docker-compose up -d
   ```

3. **Run database migrations**:
   ```bash
   docker-compose exec api npx prisma migrate deploy
   ```

4. **Access the application**:
   - API: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs
   - Queue Dashboard: http://localhost:3000/admin/queues

## Services

The Docker setup includes:

- **api**: Main Express.js application
- **workers**: Background job processors
- **postgres**: PostgreSQL database
- **redis**: Redis for job queues

## Development

For development with hot reload:

```bash
# Start only dependencies
docker-compose up postgres redis -d

# Run the app locally
npm run dev

# Run workers locally
npm run workers:dev
```

## Production Deployment

1. Set `ARCJET_ENV=production` in your environment
2. Use proper secrets for production
3. Consider using external managed databases
4. Set up proper logging and monitoring

## Database Management

```bash
# Generate Prisma client
docker-compose exec api npx prisma generate

# Run migrations
docker-compose exec api npx prisma migrate deploy

# Reset database (development only)
docker-compose exec api npx prisma migrate reset

# Access database directly
docker-compose exec postgres psql -U ecmp_user -d ecmp
```

## Troubleshooting

### Check service logs
```bash
docker-compose logs api
docker-compose logs workers
docker-compose logs postgres
docker-compose logs redis
```

### Restart services
```bash
docker-compose restart api
docker-compose restart workers
```

### Clean rebuild
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```