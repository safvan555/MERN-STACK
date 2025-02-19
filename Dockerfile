# Use official Node.js image as base
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the application port (change if needed)
EXPOSE 5000

# Command to start the application
CMD ["npm", "start"]