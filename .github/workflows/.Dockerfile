FROM node:latest
WORKDIR /Rating-Review-API
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "server-dev"]