FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN apt-get update && apt-get install -y netcat-traditional
COPY . .

RUN npm run build


EXPOSE 3000

CMD [ "npm", "run" , "start:dev" ]