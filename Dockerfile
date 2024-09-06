# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json into the working directory
COPY package.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of your application code
COPY . .

ENV VITE_API_ENDPOINT = "https://habits-be.fly.dev"
ENV VITE_BASE_URL = "https://habits-fe.fly.dev"

# Build your application using Vite
RUN npm run build

# Use Nginx alpine image to serve the app
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy customized Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static assets over
COPY --from=0 /app/dist .

# Expose port 3000
EXPOSE 3000

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]