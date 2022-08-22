FROM node:latest
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
ENV EXPOSE $PORT
CMD ["npm","start"]