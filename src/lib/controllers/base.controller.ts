// 기본 Controller 추상 클래스
import { ApiResponse } from '@/lib/types/api';

export abstract class BaseController {
    // 성공 응답
    protected successResponse<T>(
        data: T,
        message: string = '성공'
    ): ApiResponse<T> {
        return {
            success: true,
            message,
            data,
        };
    }

    // 에러 응답
    protected errorResponse<T = null>(
        error: string,
        message: string = '오류 발생'
    ): ApiResponse<T> {
        return {
            success: false,
            message,
            error,
        };
    }
}
