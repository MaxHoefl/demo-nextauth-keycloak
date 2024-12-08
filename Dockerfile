# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force && \
    npm config set registry https://registry.npmjs.org/ && \
    npm install

# Copy the entire application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the built application
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/tailwind.config.js ./
COPY --from=builder /app/postcss.config.mjs ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/jsconfig.json ./

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
