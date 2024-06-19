# Stage 1: Build the React frontend
FROM node:16-alpine AS build-stage

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install

COPY client/ .

RUN npm run build

# Stage 2: Setup the backend and integrate the built frontend
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY --from=build-stage /app/client/build /app/public

EXPOSE 3000

# Start the server
CMD ["npm", "start"]