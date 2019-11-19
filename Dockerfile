FROM node:12.2.0

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

WORKDIR /src/app

ENV PATH /src/app/node_modules/.bin:$PATH

COPY package.json /src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

COPY . /src/app

CMD ng serve --host 0.0.0.0

# FROM node:8.11.2-alpine as node

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx:1.13.12-alpine

# COPY --from=node /usr/src/app/dist/angular-docker /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# FROM node:alpine AS builder

# WORKDIR /app

# COPY . .

# RUN npm install 

# RUN npm install -g @angular/cli@7.3.9

# RUN npm run build

# FROM nginx:alpine

# COPY --from=builder /app/dist/* /usr/share/nginx/html/


