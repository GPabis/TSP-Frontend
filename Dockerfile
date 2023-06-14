FROM tiangolo/node-frontend:10 as builder

WORKDIR '/app'

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm install --global nx@latest
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf
