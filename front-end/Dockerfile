FROM node:16-alpine3.16

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

# RUN npm run build

CMD ["npm", "start"]