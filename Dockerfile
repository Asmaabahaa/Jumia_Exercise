FROM node:18.12-alpine3.15 as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

FROM nginx:1.20.1
COPY --from=build-step /app/dist/jumia_assigmenet /usr/share/nginx/html
EXPOSE 4200:80