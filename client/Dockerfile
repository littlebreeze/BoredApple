# nginx 이미지 사용
FROM node:20-alpine

# root에 /app 폴더 생성
RUN mkdir /app

# work dir 고정
WORKDIR /app

# host pc의 현재 경로의 build 폴더를 work dir의 build 폴더로 복사
COPY . .

# 80 포트 개방
EXPOSE 80

# 443 포트 개방
EXPOSE 443

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["npm", "start"]
