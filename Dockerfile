FROM node:alpine3.15
 
COPY . .

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

CMD ["npm", "run", "production"]
