# filepath: /D:/rct_user_mangement/frontend/Dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# ติดตั้ง bash, curl, และ yarn (ตรวจสอบสถานะก่อนติดตั้ง yarn)
RUN apk add --no-cache bash curl \
    && curl -o- -L https://yarnpkg.com/install.sh | bash \
    && export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

# Copy package files และ install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the project
COPY . .
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Copy built files จาก Stage 1
COPY --from=builder /app/dist .

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Port และ Start Nginx
EXPOSE 82
CMD ["nginx", "-g", "daemon off;"]