FROM node:16
WORKDIR /usr/src/Task-Server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3005
CMD [ "node", "app.js" ]