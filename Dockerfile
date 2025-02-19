# Build Stage
FROM node:20-alpine3.19 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine3.19
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
# Copy the compiled code from the build stage (assuming it's in the "dist" folder)
COPY --from=builder /app/dist ./dist

# Run the compiled server
CMD ["node", "dist/server.js"]
