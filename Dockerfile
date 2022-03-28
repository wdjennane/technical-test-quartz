# Dockerfile

# Use node alpine as it's a small node image
FROM node:14.17-alpine

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY . /app

# Install dependencies in /app
RUN yarn install

# Run yarn dev, as we would via the command line
CMD ["yarn", "dev"]
