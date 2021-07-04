FROM node:lts-alpine

COPY . /app
WORKDIR /app

RUN npm install && \
	npm run lint && \
	npm run build && \
	npm install --prune=production

EXPOSE 3000
ENV NODE_ENV production
CMD [ "npm", "start" ]