FROM node:20-alpine as builder

WORKDIR '/app'
RUN npm install --global nx@latest
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html