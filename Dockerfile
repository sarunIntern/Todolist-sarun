FROM node:alpine3.15

ENV NODE_ENV=production

WORKDIR /app

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

CMD ["npm", "run", "production"]