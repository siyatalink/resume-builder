# Backend Dockerfile

# Step 1: Use an official Node.js image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the backend code
COPY . .

# Step 5: Expose the port the backend will run on (default: 3005 or your custom port)
EXPOSE 3005

# Step 6: Start the backend server
CMD ["npm", "start"]
