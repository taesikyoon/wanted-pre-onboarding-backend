# 주요 구성

1. NestJS
1. TypeORM
1. MySQL

# 준비 사항

_실행환경은 MAC_OS입니다._

1. 데이터베이스 "wanted-pre-onboarding-backend"를 미리 생성해주세요.
1. 최상위 루트에 있는 .env.sample을 .local.env로 변경하고 환경변수를 채워주세요.
1. start.sh을 실행시키면 모든 api를 이용할 환경이 구성됩니다.

## 실행 방법

### 서버 환경 구성 및 서버 실행

- 셀 스크립트 실행

```
sh start.sh
```

- 쉘 실행 내용 요약

```
1. 데이터베이스 테이블을 생성합니다.
2. 각 테이블에 테스트를 위한 seed data를 삽입합니다.
3. NestJS Server를 실행시킵니다.

```

### 테스트 실행

- 셀 스크립트 실행

```

```

- 쉘 실행 내용 요약

```

```

## API Docs - localhost:4010

### 1. 채용공고 생성

- POST : /job-postings
- Request Body
  ```
  {
    "companyId":2,
    "position":"백엔드 개발자 테스트",
    "compensation":10000,
    "technicalStack":"NestJS",
    "description":"테스트"
  }
  ```
- Response
  ```
  {
    "success": true,
    "message": "채용공고 등록에 성공하셨습니다.",
    "data": {
        "companyId": 2,
        "position": "백엔드 개발자 테스트",
        "compensation": 10000,
        "technicalStack": "NestJS",
        "description": "테스트",
        "id": "30"
    }
  }
  ```

### 2. 채용공고 리스트 조회

- GET : /job-postings?page=1&items=10&sort=DESC
- Request Body
  - 없음
- Response
  ```
  {
    "success": true,
    "message": "채용공고 리스트를 조회했습니다.",
    "data": [
        {
            "id": "20",
            "position": "Vue 프론트 개발자",
            "compensation": 100000000,
            "technicalStack": "Vue",
            "companyId": "5",
            "companyName": "원티드코리아",
            "country": "한국",
            "region": "서울"
        },
        {
            "id": "19",
            "position": "백엔드 주니어 개발자",
            "compensation": 150000000,
            "technicalStack": "NestJS",
            "companyId": "4",
            "companyName": "원티드랩",
            "country": "한국",
            "region": "전주"
        }, ... ]
  }
  ```

### 3. 채용공고 수정

- PATCH : /job-postings/:id
- Request Body

  ```
  # id를 제외한 모든 부분 수정 가능( 부분 수정도 가능 )
  {
    "position": "Django 백엔드 개발자",
    "compensation": 100000000,
    "description": "장고 백엔드 개발자 환영합니다!",
    "technicalStack": "Django",

    OR

    "technicalStack": "Python" // 입력함
  }
  ```

- Response
  ```
  {
    "success": true,
    "message": "채용공고를 정상적으로 수정했습니다.",
    "data": {
        "id": "17",
        "position": "Django 백엔드 개발자",
        "compensation": 100000000,
        "description": "장고 백엔드 개발자 환영합니다!",
        "technicalStack": "Python", // 수정됨
        "companyId": "2"
        }
    }
  ```

### 4. 채용공고 상세조회

- GET : /job-postings/:id
- Request Body

  - 없음

- Response
  ```
  {
    "success": true,
    "message": "채용공고 상세조회에 성공했습니다.",
    "data": {
        "id": "17",
        "position": "Django 백엔드 개발자",
        "compensation": 100000000,
        "description": "장고 백엔드 개발자 환영합니다!",
        "technicalStack": "Python",
        "companyId": "2",
        "otherJobPostings": ["2", "7", "12"]
        }
    }
  ```

### 5. 채용공고 삭제

- DELETE : /job-postings/:id
- Request Body
  - 없음
- Response
  ```
  {
    "success": true,
    "message": "채용공고를 정상적으로 삭제했습니다."
  }
  ```

### 6. 채용공고 검색

- POST : /job-postings/search?keyword=원티드
- Request Body
  - 없음
- Response
  ```
  {
    "success": true,
    "message": "키워드로 채용공고 리스트를 조회했습니다.",
    "data": [
        {
            "id": "1",
            "position": "백엔드 주니어 개발자",
            "compensation": 150000000,
            "technicalStack": "NestJS",
            "companyId": "1",
            "companyName": "원티드",
            "country": "한국",
            "region": "대구"
        },
        {
            "id": "4",
            "position": "백엔드 주니어 개발자",
            "compensation": 150000000,
            "technicalStack": "NestJS",
            "companyId": "4",
            "companyName": "원티드랩",
            "country": "한국",
            "region": "전주"
        },
        {
            "id": "5",
            "position": "Vue 프론트 개발자",
            "compensation": 100000000,
            "technicalStack": "Vue",
            "companyId": "5",
            "companyName": "원티드코리아",
            "country": "한국",
            "region": "서울"
        }, ... ]
  }
  ```

### 7. 채용공고 지원

- POST : /job-postings/:id/apply
- Request Body
  - 없음
- Response

  ```
  {
    "success": true,
    "message": "채용공고에 지원에 성공했습니다.",
    "data": {
    "id": "3",
    "userId": "1",
    "jobPostingId": "5"
    }
  }
  ```

### 10월 7일 이후 추가할 내역 리스트

1. 테스트 코드 작성
1. docker를 이용한 실행환경 구축
