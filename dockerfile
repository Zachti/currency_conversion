FROM node:18.16.1-alpine as builder

WORKDIR /home/node

COPY package*.json /home/node/

RUN npm install

COPY . /home/node/

RUN npm run build

FROM node:18.16.1-alpine as currencyConvertor

WORKDIR /home/app

COPY --from=builder /home/node/dist/apps/currencyConvertor/package*.json /home/app/

COPY --from=builder /home/node/dist/ /home/app/dist/

RUN npm ci --ignore-scripts

RUN apk --no-cache add curl

CMD ["sh", "-c", "npm run start:dev"]
