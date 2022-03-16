FROM nginx:latest

WORKDIR /usr/share/nginx/html
COPY /dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/nginx.vh.default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/timeout.conf /etc/nginx/conf.d/timeout.conf
