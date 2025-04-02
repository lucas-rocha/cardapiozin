FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env .env

RUN npm install

COPY . .

# RUN npm run dev
RUN npx prisma generate
RUN npx prisma migrate deploy

EXPOSE 5000

CMD ["npm", "run", "dev"]