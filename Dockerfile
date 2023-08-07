# Use the official Node.js image (Alpine-based)
FROM node:20-alpine3.17

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the rest of the application code into the container
COPY app/ .

RUN npm install

# Command to run the Node.js application
CMD [ "node", "index.js" ]