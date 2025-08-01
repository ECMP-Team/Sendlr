# Use Node.js 18 LTS as base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and generate client
COPY prisma/ ./prisma/
RUN npx prisma generate

# Copy application code
COPY . .

# Expose port
EXPOSE 3000


# Start the application
CMD ["npm", "start"]