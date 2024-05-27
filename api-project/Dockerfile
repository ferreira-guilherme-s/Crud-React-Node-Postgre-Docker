FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN apt-get update && apt-get install -y netcat-traditional
COPY . .

RUN npm run build

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3000

CMD [ "npm", "run" , "start:dev" ]