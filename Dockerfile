FROM node:8.4-alpine AS build
WORKDIR /app
COPY package* /app/
COPY .babelrc /app/
RUN npm install
COPY webpack.config.js /app
COPY src /app/src
RUN npm run build

FROM node:8.4-alpine
EXPOSE 3000
WORKDIR /app
COPY --from=build /app/dist/app.js /app/app.js
CMD node app.js