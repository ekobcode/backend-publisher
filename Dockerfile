FROM node:latest
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
EXPOSE 9010
CMD ["npm","start"]