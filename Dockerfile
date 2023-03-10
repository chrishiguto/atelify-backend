FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm run build:prod
EXPOSE 1337
CMD ["node", "dist/server.js"]