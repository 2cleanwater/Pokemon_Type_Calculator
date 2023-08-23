# Pokemon_Type_Calculator

## 프로젝트 소개

( Jul 2023 - Aug 2023 )

✔ 포켓몬고에서 상대방의 상성에 맞는 **포켓몬 상성을 빠르게 추천**해주는 간단한 페이지입니다.

## 프로젝트 목표

1. **바닐라 자바스크립트**만 이용해 개발한다. 
2. **돔 선택**을 돕는 라이브러리를 **사용하지 않는다**. (JQuery, useRef 등)
3. 페이지의 동작에는 새로고침 없이 **SPA 방식**을 고수한다.
4. **JSON**으로 받아온 데이터를 기반으로 동작하게 한다.
5. 프로젝트 구현 시 **부족했던 부분** ( class 다중선택, dom 선택자 등)에 대한 실력을 기른다.

## 기술 스택

- Javascript

## 주요 기능

## 1. JSON으로 제공되는 Type별 상성 변환

![2023-08-23 14 49 11.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/27f97977-a3b6-4766-833a-7027c0f25230/2023-08-23_14_49_11.png)

- 효과 없음(0), 효과 미미함(1), 일반 (2), 효과가 좋음(3)으로 표현된 **JSON 파일**을 이용
- 각 **Type 별 상성을 계산**해 기호로 표시
- 타입 선택 시 **하이라이트**

## 2. 타입별 상성 추천 시스템

![2023-08-23 14 49 04.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c7fb3694-0a4a-4af7-8b71-438704a46899/2023-08-23_14_49_04.png)

- 선택된 타입, 공격과 방어 별 2가지를 JSON 데이터를 기반으로 **최적의 상성을 추천**함.
- 포켓몬 고의 **기본 상성 공식** 따름.
    - 효과가 좋음 * 효과가 좋음 = 매우 효과가 좋음
    - 효과가 좋음 * 기본 = 효과가 좋음
    - 효과가 좋음 * 효과가 미미함 = 기본
    - 기본 * 기본 = 기본
    - 기본 * 효과 미미함 = 효과 미미함
    - 효과 미미함 * 효과 미미함 = 효과 없음
- 함수 내에 Dom을 변환하여 상성이 변경되는 즉시 추천 상성도 **실시간으로 변경**되도록 설계

## 타 프로젝트와의 차별점

![IMG_6270.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7066bf43-d0ea-4614-8d5a-c19bdf3a17d0/IMG_6270.png)

- SPA 방식으로 페이지 리로드 없이 사용이 가능하다.
- 전체 상성에 대한 표를 같이 제공하여 데이터를 한 눈에 볼 수 있다.
- JSON 파일을 기초로 하여 제공되기 때문에 데이터의 변경 작업이 단순하다.
