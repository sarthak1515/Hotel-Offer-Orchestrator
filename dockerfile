FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./
COPY tsconfig.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["node", "dist/server.js"]
