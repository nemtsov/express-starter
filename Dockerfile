FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./

ENV NODE_ENV production
RUN npm install

COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]
