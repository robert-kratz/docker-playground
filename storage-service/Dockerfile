FROM node

WORKDIR /app/storage-service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]