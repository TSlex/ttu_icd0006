FROM nginx:latest

COPY ./au/au-artnetwork/dist /usr/share/nginx/html/aurelia-app
COPY ./vue/vue-artnetwork/dist /usr/share/nginx/html/vue-app

COPY index.html /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf

