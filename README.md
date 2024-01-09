![nav](https://github.com/codeit-sprint-team1/Taskify/assets/101549519/21470f01-b6a2-4c8c-9902-c1c88640c6bc)

# Taskify

칸반보드를 활용한 일정 정리 서비스

## 배포 주소

<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

### <a href="https://taski-fy.vercel.app/" target="_blank" rel="noopener noreferrer">Taskify</a>

## 개발 기간

> 2023.12.18 ~ 2024.1.5

## 개발 기록

### <a href="https://github.com/codeit-sprint-team1/Taskify/wiki" target="_blank" rel="noopener noreferrer">GitHub Wiki</a>

## 멤버 소개

| <a href="https://github.com/Accept77"> <img src='https://avatars.githubusercontent.com/u/101549519?v=4' width=150px height=150px></a> | <a href="https://github.com/orrhrr"><img src='https://avatars.githubusercontent.com/u/120437902?v=4' width=150px height=150px></a> | <a href="https://github.com/seoyoung-min"><img src='https://avatars.githubusercontent.com/u/144652458?v=4' width=150px height=150px></a> | <a href="https://github.com/wecaners"><img src='https://avatars.githubusercontent.com/u/90304025?v=4' width=150px height=150px></a> |
| :-----------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|                                                                양진수                                                                 |                                                               이승연                                                               |                                                                  민서영                                                                  |                                                               김진우                                                                |

### 🔗 이미지를 누르면 깃허브 페이지로 이동합니다

## 역할 분배

### 양진수

-   랜딩페이지 / 대시보드페이지

### 이승연

- 모달 / 로그인페이지 / 회원가입페이지

### 민서영

- 모달 / Header / Sidebar

### 김진우

-   대시보드 수정 페이지 / 계정 관리 페이지

## 📚 기술스택

<div align=center> 
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<br>
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">
</div>

# 사용 라이브러리

## 상태관리
### 상태관리 라이브러리를 도입한 이유
- prop drilling을 방지한다.
- 컴포넌트를 순수함수로 유지하여 테스트 코드 검증을 용이하게 한다.
### [Zustand](https://www.npmjs.com/package/zustand)
- 상태관리 라이브러리 중 상대적으로 러닝커브가 높지 않아, 3주 프로젝트에 적합하다.
- useStore로 불필요한 렌더링을 막아줄 수 있다.
- SSR을 간단하게 지원한다.

## 스타일링
### [Tailwind CSS](https://www.npmjs.com/package/tailwindcss)
- Preflight가 있어, reset을 따로 해주지 않아도 된다.
- CSS 파일이 별도로 필요하지 않아, 파일 개수를 줄일 수 있다.
- Next.js 설치시 함께 설치가 가능하며, Next.js의 App Routing과 호환성이 좋다.
    - Taskify에서는 App Rounting을 사용하지 않으나, 배워 둘 가치가 있다고 판단했다.
- 팀원 모두 Tailwind 사용 경험이 없어, 새롭게 배우고 싶었다.
### [Framer motion](https://www.npmjs.com/package/framer-motion)
- 직관적인 코드를 통해서 애니메이션을 사용할 수 있다.
### [React-toastify](https://www.npmjs.com/package/react-toastify)
- alert 창을 좀 더 직관적이고 예쁜 UI로 사용할 수 있게 해주며, api의 status에 따라 다른 메세지창을 연출할 수 있다.

## 비동기 통신
### [Axios](https://www.npmjs.com/package/axios)
- 기본적으로 데이터를 다루기 편하다
- axios instance를 활용해 공용 로직을 활용하기 쉽다

## 날짜 라이브러리
### [Luxon](https://www.npmjs.com/package/luxon)
- 사람들이 주로 사용하는 moment 공식문서에서도 moment는 레거시 프로젝트로 전환하고 대체 라이브러리를 소개함
- 대표적인 공식문서에서 대체 라이브러리가 luxon임

### [React-datepicker](https://www.npmjs.com/package/react-date-picker)
- 간편하게 날짜와 시간을 원하는 선택하고 원하는 포맷으로 보여주는 기능을 갖추고 있다
- css로 달력창을 커스텀할수 있다

## form 라이브러리
### [React-hook-form](https://www.npmjs.com/package/react-hook-form)
- 비제어 컴포넌트의 장점을 활용하여 리렌더링을 최소화 시킬 수 있다. 
- 작은 사이즈의 라이브러리이다
