// 상수 정의

// API 엔드포인트
export const API_ENDPOINTS = {
    EXAMPLES: '/api/example',
};

// 기본 설정값
export const DEFAULTS = {
    PAGE_SIZE: 10,
    TIMEOUT: 5000,
};

// 정규 표현식 패턴
export const REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^[0-9-]{10,}$/,
    URL: /^https?:\/\/.+/,
};

// 상태 코드
export const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};

// 에러 메시지
export const ERROR_MESSAGES = {
    VALIDATION_ERROR: '유효성 검사 오류',
    NOT_FOUND: '항목을 찾을 수 없습니다',
    UNAUTHORIZED: '인증이 필요합니다',
    FORBIDDEN: '접근 권한이 없습니다',
    SERVER_ERROR: '서버 오류 발생',
    NETWORK_ERROR: '네트워크 오류 발생',
};

// 성공 메시지
export const SUCCESS_MESSAGES = {
    CREATE: '항목 생성 성공',
    UPDATE: '항목 수정 성공',
    DELETE: '항목 삭제 성공',
    FETCH: '데이터 조회 성공',
};
