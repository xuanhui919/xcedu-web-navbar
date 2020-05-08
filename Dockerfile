FROM nginx:1.17

LABEL maintainer="Xuanhui <541951523@qq.com>"
LABEL description="晓窗教育一体化平台通用模块"

COPY ./dist /usr/share/nginx/html/space
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
