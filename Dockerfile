# Frontend Dockerfile (for Next.js)

# Step 1: Use an official Node.js image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the application code
COPY . .

# Step 5: Build the Next.js application
RUN npm run build

# Step 6: Expose the port Next.js will run on (default: 3000)
EXPOSE 3000

# Step 7: Start the Next.js application
CMD ["npm", "start"]
