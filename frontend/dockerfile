FROM node:12


RUN yarn add craco-alias @craco/craco


FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# root 에 app 폴더를 생성
RUN mkdir /app

# work dir 고정
WORKDIR /app

# work dir 에 build 폴더 생성 /app/build
RUN mkdir ./build

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
ADD ./build ./build

# # # nginx 의 default.conf 를 삭제
# RUN rm/etc/nginx/conf.d/default.conf

# # # host pc 의 nginx.conf 를 아래 경로에 복사
# COPY ./nginx.conf /etc/nginx/conf.d

# 80 포트 오픈
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



# container 실행 시 자동으로 실행할 command. nginx 시작함
# CMD ["nginx", "-g", "daemon off;"]


# # nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
# FROM nginx

# RUN npm update 

# RUN yarn install

# RUN yarn add craco-alias @craco/craco

# # root 에 app 폴더를 생성
# RUN mkdir /app

# # work dir 고정
# WORKDIR /app

# # work dir 에 build 폴더 생성 /app/build
# RUN mkdir ./build


# # host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
# ADD ./build ./build

# # nginx 의 default.conf 를 삭제
# RUN rm/etc/nginx/conf.d/default.conf

# # host pc 의 nginx.conf 를 아래 경로에 복사
# COPY ./nginx.conf /etc/nginx/conf.d

# # 80 포트 오픈
# EXPOSE 80



# container 실행 시 자동으로 실행할 command. nginx 시작함
# CMD ["nginx", "-g", "daemon off;"]