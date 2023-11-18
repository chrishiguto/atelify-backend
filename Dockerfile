FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate
RUN npm run build
EXPOSE 1337
CMD ["node", "dist/server.js"]