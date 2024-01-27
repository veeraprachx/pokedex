#1 Node.js runtime
FROM node:latest

#2 Set the working directory in the container
WORKDIR /app

#3: Copy the package.json files and install dependencies
COPY package*.json ./
RUN npm install

#4 Copy the source code
COPY . .

#5 Build the app
RUN npm run build

#6 Expose port
EXPOSE 3000

#7 Execution
CMD ["node", "build"]
