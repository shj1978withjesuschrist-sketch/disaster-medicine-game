# Firebase Realtime Database 보안 규칙 적용 안내

## 적용 방법

1. https://console.firebase.google.com/project/cirecourse/database/cirecourse-default-rtdb/rules 접속
2. 좌측 **규칙(Rules)** 탭 선택
3. `firebase-rules.json` 파일 내용 전체 복사 → 에디터 붙여넣기
4. **게시(Publish)** 클릭

## 주요 보안 정책

### 학생 세션 (`live/{version}/students/{sid}`)
- **읽기**: 누구나 가능 (실시간 리더보드/대시보드용)
- **쓰기**: nickname 필수 + 30자 이내 + 숫자 필드 범위 검증
- **알 수 없는 필드 차단**: `$other → validate: false`

### 답변/모드 결과 (`answers`, `mode_results`)
- **읽기**: 가능 / **쓰기**: 스키마 검증 후 허용
- 문자열·숫자 길이 제한으로 페이로드 폭탄 방어
- `correct` 필드는 boolean만 허용 (조작 어려움)

### 팀 설정 (`config/{version}/teams`)
- **읽기만 허용**, 쓰기는 서버(백엔드)에서만 가능 → 학생이 팀 임의 변경 불가

### 그 외 모든 경로
- `$other` 규칙으로 **읽기·쓰기 모두 차단** (기본 deny 정책)

## 적용 후 확인

```bash
# 비정상 데이터 입력 시도 (실패해야 정상)
curl -X PUT 'https://cirecourse-default-rtdb.firebaseio.com/live/kr/students/test.json' \
  -d '{"malicious": "x"}'
# Expected: HTTP 400 — Permission denied
```

## 주의사항

- 학생들이 익명으로 접속하므로 `read: true`는 의도된 설계 (점수판 공개 목적)
- 개인 식별 정보(실명·이메일 등)는 절대 닉네임에 포함시키지 말 것 → 인트로에서 안내
- 추후 인증 도입 시 `auth != null && auth.uid === $sid` 형태로 강화 가능
