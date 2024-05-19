# 🍎심심한 사과

심심한 사과: 문해력 상승을 위한 다섯 가지 유형의 사용자 맞춤 문해력 학습 및 실시간 어휘 퀴즈 대결 플랫폼
<img width="200" src="https://lab.ssafy.com/s10-final/S10P31A508/tree/main/docs/logo.png">

> https://k10a508.p.ssafy.io/

## 📅 진행 기간

2024.04.11 ~ 2024.05.20

## 🤝 팀원 소개

SSAFY 10기 자율 프로젝트 A508

| 팀장  <br>이종재 | 팀원  <br>강지헌   | 팀원  <br>권정훈                                           | 팀원  <br>이지원                              | 팀원  <br>최정윤 | 팀원  <br>하재률                  |
| ----------- | ------------- | ----------------------------------------------------- | ---------------------------------------- | ----------- | ---------------------------- |
| BE <br>학습서버,<br>오늘의학습<br>스케쥴링     | BE/Infra<br>CI,CD<br>문장유사도<br>MMR<br>유저서버 | FE <br>소셜로그인, <br> 회원가입, <br> 오늘의학습, <br>간이테스트,<br>알림 | FE <br> 소개페이지, <br>, 어휘퀴즈<br> 마이페이지<br>-학습일지 | BE <br> 소셜 회원가입<br>소셜로그인<br>게임 서버 | FE <br>어휘퀴즈, <br>마이페이지<br>-분석보고서 |

## 🌍 프로젝트 소개

`"'심심한 사과? 더 화나'… 문맹률 논란까지 번진 사과문"`

`"우리나라의 기본 문맹률은 1%에 가깝지만, OECD 조사에 따르면 읽은 문장의 뜻을 정확하게 파악하지 못하는 실질 문맹률은 75%에 달하는 것으로 나타났다."`

길다 싶으면 세 줄 요약부터 찾고.. 한 문장을 읽고 또 읽고 계시진 않으신가요? 지인들과 대화할 때 대충 이런 말이겠거니 넘어가신 적은 없으신가요?

이런 문해력 고민을 '**심심한 사과**'에서 해결해보세요 !

## 🎶 주요 기능

## 간편 문해력 테스트

<img width="650" src="https://lab.ssafy.com/s10-final/S10P31A508/tree/main/docs/ga-gif/간이 테스트.gif">

- 12문제로 이루어진 간편한 테스트로 나의 문해력 수준 확인

- SNS, 링크를 통해 친구, 지인들과 점수 공유

### 매일 새로운 개인 맞춤 학습

- 학습 유형, 학습 요소, 수준에 따른 개인화된 일일 세 가지의 맞춤 학습 추천
- 인지 능력, 추론 능력 등을 기를 수있는 5가지 유형의 다양한 문제
- AI가 요약한 모범 답안을 확인하고, 내 답안과 유사도 분석

### 나의 능력치와 학습 기록 확인

<img width="650" src="https://lab.ssafy.com/s10-final/S10P31A508/tree/main/docs/ga-gif/활동 기록.gif">

- 그래프를 통한 내 능력치와 강점&약점 분석 피드백
- 달력에서 바로 확인하는 내 학습 기록

### 실시간 대결을 통한 재미있는 어휘 학습
<img width="650" src="https://lab.ssafy.com/s10-final/S10P31A508/tree/main/docs/ga-gif/게임-방만들기.gif">
<img width="650" src="https://lab.ssafy.com/s10-final/S10P31A508/tree/main/docs/ga-gif/게임-입장하기.gif">
<img width="650" src="https://lab.ssafy.com/s10-final/S10P31A508/tree/main/docs/ga-gif/게임-정답맞추기.gif">
<img width="650" src="https://lab.ssafy.com/s10-final/S10P31A508/tree/main/docs/ga-gif/게임-힌트및결과.gif">

- 문해력의 기초가 되는 어휘력을 재미있게 학습

- 실시간 대결

- 랭킹 시스템을 통한 경쟁력 제고

## 🏛️ 프로젝트 구조도

## 💻 주요 기술

[](https://ko.legacy.reactjs.org/)[](https://spring.io/projects/spring-boot)[](https://www.oracle.com/java/)[](https://mysql.com/)[](https://redis.io/)

[](https://tanstack.com/query/v4/docs/framework/react/overview)[](https://tailwindcss.com/)[](https://developers.kakao.com/product/kakaoPay)

[](https://git-scm.com/)[](https://about.gitlab.com/)[](https://www.notion.so/)[](https://www.atlassian.com/software/jira)[](https://mattermost.com/)

[](https://www.jetbrains.com/idea/)[](https://developer.android.com/studio)[![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-1.85.1-blue.svg?style=flat&logo=visual-studio-code)](https://code.visualstudio.com/)

[](https://aws.amazon.com/ec2/)[](https://www.docker.com/)[](https://aws.amazon.com/s3/)[](https://ubuntu.com/)

### Backend - 메인

- Spring Boot 3.2.3
- Spring Data JPA
- Spring Security
- Spring Web
- Spring Cloud AWS
- MySQL
- QueryDSL
- Redis
- Jwt
- AWS S3

### Backend - 추천

- Flask
- PySpark
- MySQL
- schedular
- sklearn

### Frontend

- Typescript
- React
- Next.js
- Vite
- Tailwind
- Zustand
- React Query
- axios
- React Router DOM
- Sweetalert2
- react-calendar
- react-chartjs
- react-howler
- eslint
- prettier

### 배포

- AWS Lightsail
- AWS S3
- AWS RDS
- Nginx
- Jenkins
- Docker

## 📁 프로젝트 파일 구조

### Frontend - Next.js (app-router)

```
client

├─app
│  ├─(intro)
│  │  ├─(about)
│  │  ├─login
│  │  │  └─authentication
│  │  ├─quiz
│  │  │  ├─result
│  │  │  └─solve
│  │  └─signup
│  │      ├─interest
│  │      ├─learning-time
│  │      └─nickname
│  ├─(main)
│  │  ├─(game)
│  │  │  └─game
│  │  │      ├─@modal
│  │  │      │  ├─(.)create
│  │  │      │  └─[...modal]
│  │  │      ├─create
│  │  │      └─rooms
│  │  │           └─[roomId]
│  │  ├─(home)
│  │  │  ├─home
│  │  │  └─mypage
│  │  │      ├─analysis
│  │  │      └─record
│  │  ├─(learn)
│  │       └─learn
│  │           ├─insert
│  │           │  └─result
│  │           ├─order
│  │           │  └─result
│  │           ├─read
│  │           │  └─result
│  │           ├─summary
│  │           │  └─result
│  │           └─word
│  │                └─result
│  └─_common
├─queries
├─stores
├─types
└─utilsomponents
│  └─_common
├─queries
├─stores
├─types
└─utils
```

## 📃 명세서

- [프로젝트 노션](https://www.notion.so/righthun/A508-ecb5fc538a3d42a688426adc027018e4)

- [API 명세서](https://www.notion.so/righthun/API-597c2ee08c834f42a891ba7c5229979f)

## 📊 ERD 다이어그램

## 🎨 와이어프레임

[와이어 프레임](https://www.figma.com/design/M3ctxc9hK3CKVki96xl8He/A508-Project?node-id=0-1&t=nVQpFUxc7wdfevD7-0)

## 💻포팅 메뉴얼
