FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env .env

RUN npm install --only=production

COPY . .

RUN npm run build
RUN npx prisma generate
RUN npx prisma migrate deploy

EXPOSE 5000

CMD ["node", "dist/src/index.js"]