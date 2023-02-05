FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV NODE_ENV=production
RUN npm ci --only=production
COPY . .
RUN npm run build:prod
EXPOSE 8080
CMD ["node","dist/server.js"]