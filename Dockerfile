FROM node:16.15.1

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -g expo@cli-5.4.11

COPY . .

CMD [ "node", "start" ]

