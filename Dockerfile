FROM node:18-alpine3.18

WORKDIR /wihire-app/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn prisma generate

EXPOSE 5000

CMD ["yarn", "start:docker"]
