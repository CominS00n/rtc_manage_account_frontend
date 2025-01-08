# Use a more recent version of Node.js
FROM node:20-alpine

# Install curl
RUN apk add --no-cache curl

# Set working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the application
RUN yarn build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the app
CMD ["sh", "-c", "yarn preview --host 0.0.0.0 --port 3000 & sleep 10 && curl -f http://backend:8000/api/v2 || exit 1"]