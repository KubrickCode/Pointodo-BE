FROM node:18.16.0

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN npm install -g pm2 

RUN yarn install --immutable --immutable-cache --check-cache

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["pm2-runtime", "start", "dist/main.js"]
