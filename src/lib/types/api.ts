// API 응답 타입 정의

// 기본 API 응답 형식
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

// 페이지네이션 응답
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// 페이지네이션이 포함된 API 응답
export interface ApiPaginatedResponse<T>
    extends ApiResponse<PaginatedResponse<T>> { }
