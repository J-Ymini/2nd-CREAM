# 🍦Team CREAM

## ✅ 프로젝트 소개

- 프로젝트 개요: CREAM(Code Rules Everything Around me) 팀의 KREAM 클론 코딩

- 프로젝트 기간: 2021.05.24 ~ 2021.06.04

<br>

## 🎯 기획 목표

- 한정판 중고 **의류품 거래**를 위한 **중개 플랫폼**

- 가격별 제품 **오름**차순, **내림**차순

- 브랜드, 사이즈, 색상 및 컬렉션별 제품 **필터링**

- 단순 구매 및 판매 + **입찰 시스템** 구현

- 입찰 및 체결 거래 **데이터 실시간 그래프화**

<br>

## 🎯 프로젝트 목표

### Frontend

- **React function component, React Hooks** 사용을 통한 컴포넌트 관리

- **styled-component** 사용을 통한 스타일링

- **관련 라이브러리 사용 경험** 쌓기

- **AWS** 사용을 통한 사이트 배포

- 백엔드-프론트엔드 커뮤니케이션 및 통신으로 **협업 경험 쌓기**

<br>

## 👥 팀원 구성

- **Frontend**

  - 김수연 [Github](https://github.com/ksy4568) / [블로그](https://velog.io/@syeon02)
  - 권오재 [Github](https://github.com/geborenik) / [블로그](https://velog.io/@geborenik)

  - 전용민 [Github](https://github.com/J-Ymini) / [블로그](https://velog.io/@dydalsdl1414)

  **Backend**

  - 양미화 [Github](https://github.com/hwaya2828) / [블로그](https://velog.io/@hwaya2828)
  - 김하민(PM) [Github](https://github.com/HaMin-Kim) / [블로그](https://velog.io/@khmin1017)

    <br>

## 🎥 시연 영상

업로드 예정입니다.

<br>

## 👨‍💻 적용 기술

- Frontend: JavaScript, React, React-Router, React-hooks, styled-component, CRA

- Backend: Python, Django

- 협업 tool: Trello, Git & Github, Slack, AWS

<br>

## 🖊 주 구현 기능

- 소셜 로그인 기능

- 메인 페이지

- 제품 상세 페이지

- 구매 및 판매 결제 진행 페이지

- 마이페이지

<br>

## 💻 팀원별 상세 구현 기능

## Frontend

- 공통: styled-component 사용하여 페이지, 컴포넌트 및 담당 페이지별 레이아웃 구현

**전용민**

- 로그인 페이지

  - 카카오 소셜 로그인 API (JavaScript SDK) 사용을 통한 소셜 로그인 기능 및 CREAM 사이트 전용 JWT 발행 기능 구현

- 마이 페이지

  - fetch(GET)함수를 통해, 카카오 소셜 로그인 api 사용으로부터 받은 회원 정보 및 포인트 확인 기능 구현

- 구매 및 판매 결제 진행 페이지

  - path parameter를 사용하여 제품 상세 페이지와의 동적 라우팅 기능 구현

  - Query parameter, fetch(GET) 를 사용하여 해당 제품의 사이즈별 가격 (즉시 거래, 입찰 데이터) 확인 기능 구현

  - fetch(POST)를 사용하여 거래 (즉시 거래, 입찰) 가격 지정 기능 구현
