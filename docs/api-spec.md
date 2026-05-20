# 3주차 API 명세서

> 기준 화면: 홈, 마이페이지 리뷰 작성, 미션 목록 조회, 미션 성공, 회원가입

## 1. 회원가입 API

- **Method:** `POST`
- **Endpoint:** `/api/v1/users/signup`
- **Request Header:**
  | Key | Value |
  |---|---|
  | Content-Type | application/json |

- **Request Body:**
```json
  {
    "name": "홍길동",
    "email": "hong@example.com",
    "password": "password123",
    "address": "서울시 강남구",
    "phoneNumber": "010-1234-5678"
  }
```

- **Response (201):**
```json
  {
    "isSuccess": true,
    "code": 201,
    "message": "회원가입 성공",
    "result": {
      "userId": 1,
      "name": "홍길동",
      "email": "hong@example.com"
    }
  }
```

## 2. 홈 화면 - 가게 목록 조회 API

- **Method:** `GET`
- **Endpoint:** `/api/v1/stores`
- **Request Header:**
  | Key | Value |
  |---|---|
  | Authorization | Bearer {accessToken} |

- **Query String:**
  | Key | 설명 | 예시 |
  |---|---|---|
  | region | 지역 필터 | `서울` |
  | page | 페이지 번호 | `1` |
  | size | 페이지 당 개수 | `10` |

- **Response (200):**
```json
  {
    "isSuccess": true,
    "code": 200,
    "message": "가게 목록 조회 성공",
    "result": {
      "storeList": [
        {
          "storeId": 1,
          "storeName": "맛있는 식당",
          "address": "서울시 강남구",
          "score": 4.5
        }
      ],
      "totalPage": 5,
      "totalElements": 50,
      "isFirst": true,
      "isLast": false
    }
  }
```

---

## 3. 미션 목록 조회 API (진행중 / 진행완료)

- **Method:** `GET`
- **Endpoint:** `/api/v1/users/{userId}/missions`
- **Request Header:**
  | Key | Value |
  |---|---|
  | Authorization | Bearer {accessToken} |

- **Path Variable:**
  | Key | 설명 |
  |---|---|
  | userId | 조회할 유저 ID |

- **Query String:**
  | Key | 설명 | 예시 |
  |---|---|---|
  | status | 미션 상태 | `ongoing` / `complete` |
  | page | 페이지 번호 | `1` |

- **Response (200):**
```json
  {
    "isSuccess": true,
    "code": 200,
    "message": "미션 목록 조회 성공",
    "result": {
      "missionList": [
        {
          "missionId": 1,
          "storeName": "맛있는 식당",
          "missionContent": "음료 포함 15,000원 이상 주문",
          "reward": 500,
          "status": "ongoing"
        }
      ],
      "totalPage": 2,
      "isLast": false
    }
  }
```

---

## 4. 미션 성공 누르기 API

- **Method:** `PATCH`
- **Endpoint:** `/api/v1/users/{userId}/missions/{missionId}`
- **Request Header:**
  | Key | Value |
  |---|---|
  | Authorization | Bearer {accessToken} |
  | Content-Type | application/json |

- **Path Variable:**
  | Key | 설명 |
  |---|---|
  | userId | 유저 ID |
  | missionId | 완료할 미션 ID |

- **Request Body:**
```json
  {
    "status": "complete"
  }
```

- **Response (200):**
```json
  {
    "isSuccess": true,
    "code": 200,
    "message": "미션 완료 처리 성공",
    "result": {
      "missionId": 1,
      "status": "complete"
    }
  }
```

---

## 5. 마이페이지 - 리뷰 작성 API

- **Method:** `POST`
- **Endpoint:** `/api/v1/stores/{storeId}/reviews`
- **Request Header:**
  | Key | Value |
  |---|---|
  | Authorization | Bearer {accessToken} |
  | Content-Type | application/json |

- **Path Variable:**
  | Key | 설명 |
  |---|---|
  | storeId | 리뷰를 작성할 가게 ID |

- **Request Body:**
```json
  {
    "userId": 1,
    "score": 4.5,
    "content": "음식이 정말 맛있었어요!"
  }
```

- **Response (201):**
```json
  {
    "isSuccess": true,
    "code": 201,
    "message": "리뷰 작성 성공",
    "result": {
      "reviewId": 1,
      "storeName": "맛있는 식당",
      "score": 4.5
    }
  }
```