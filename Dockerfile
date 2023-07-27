


FROM node:18-bullseye AS builder
ARG DATABASE_URL
ARG ORIGIN
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

ENV DATABASE_URL=$DATABASE_URL
ENV ORIGIN=$ORIGIN

RUN npm run build
RUN npm prune --production

FROM node:18-bullseye
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]