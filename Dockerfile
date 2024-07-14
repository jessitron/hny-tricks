# Use the official Node.js 14 image as the base image
FROM node:19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port (e.g., 3000) if your application listens on a specific port
EXPOSE 3000

# Define the command to run your application
CMD [ "npm", "start" ]