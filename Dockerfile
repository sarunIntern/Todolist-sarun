FROM node:alpine3.15

WORKDIR /app

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

CMD ["npm", "run", "production"]