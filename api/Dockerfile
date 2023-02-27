FROM node:18-alpine as base
WORKDIR /app
COPY . .
RUN npm install

FROM base

ENV NODE_ENV=production
ENV PORT=4000
ENTRYPOINT ["/usr/local/bin/npm", "run", "start:migrate:prod"]
EXPOSE 4000
