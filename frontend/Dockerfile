FROM node:21-slim

WORKDIR /app

COPY . .

RUN npm i

COPY .env.docker .env.local

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]