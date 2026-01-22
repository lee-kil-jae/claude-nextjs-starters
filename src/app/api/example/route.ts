/**
 * Example API Route Handler
 *
 * 레이어드 아키텍처 패턴을 사용한 RESTful API 엔드포인트입니다.
 * Controller → Service → Repository 계층을 통해 비즈니스 로직을 처리합니다.
 *
 * 지원하는 HTTP 메서드:
 * - GET: 전체 목록 조회 또는 특정 ID로 단일 항목 조회
 * - POST: 새로운 항목 생성
 * - PUT: 기존 항목 수정
 * - DELETE: 항목 삭제
 *
 * 모든 응답은 ApiResponse<T> 형식을 따릅니다.
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/route-handlers}
 */

import { NextRequest, NextResponse } from 'next/server';
import { ExampleController } from '@/lib/controllers/example.controller';
import { ExampleService } from '@/lib/services/example.service';
import { ExampleRepository } from '@/lib/repositories/example.repository';
import { CreateExampleDto, UpdateExampleDto } from '@/lib/types/dto';

/**
 * 의존성 주입 (Dependency Injection)
 *
 * 레이어드 아키텍처의 각 계층을 초기화하고 의존성을 주입합니다.
 * Repository → Service → Controller 순서로 생성되며,
 * 각 계층은 하위 계층에만 의존합니다.
 *
 * 이 패턴을 통해 각 계층을 독립적으로 테스트하고 교체할 수 있습니다.
 */
const repository = new ExampleRepository();
const service = new ExampleService(repository);
const controller = new ExampleController(service);

/**
 * GET 요청 핸들러 - 항목 조회
 *
 * 쿼리 파라미터 'id'의 존재 여부에 따라 전체 목록 또는 단일 항목을 조회합니다.
 *
 * @param {NextRequest} request - Next.js 요청 객체
 * @returns {Promise<NextResponse>} JSON 형식의 응답 (ApiResponse<ExampleResponseDto | ExampleResponseDto[]>)
 *
 * @example
 * ```typescript
 * // 전체 목록 조회
 * GET /api/example
 * // Response: { success: true, data: [...], message: "조회 성공" }
 *
 * // 특정 ID 조회
 * GET /api/example?id=1
 * // Response: { success: true, data: {...}, message: "조회 성공" }
 * ```
 *
 * @throws {Error} 예상치 못한 서버 오류 시 500 상태코드 반환
 */
export async function GET(request: NextRequest) {
    try {
        // URL 쿼리 파라미터 추출
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            // ID가 제공된 경우: 특정 항목 조회
            const response = await controller.handleGetById(id);
            return NextResponse.json(response);
        } else {
            // ID가 없는 경우: 전체 목록 조회
            const response = await controller.handleGetAll();
            return NextResponse.json(response);
        }
    } catch (error) {
        // 예상치 못한 에러 처리 (컨트롤러에서 처리되지 않은 오류)
        return NextResponse.json(
            {
                success: false,
                message: '요청 처리 중 오류 발생',
                error: String(error),
            },
            { status: 500 }
        );
    }
}

/**
 * POST 요청 핸들러 - 새로운 항목 생성
 *
 * 요청 본문(body)에서 CreateExampleDto 데이터를 받아 새로운 항목을 생성합니다.
 * 생성 성공 시 201 Created, 검증 실패 시 400 Bad Request를 반환합니다.
 *
 * @param {NextRequest} request - Next.js 요청 객체 (본문에 CreateExampleDto 포함)
 * @returns {Promise<NextResponse>} JSON 형식의 응답 (ApiResponse<ExampleResponseDto>)
 *
 * @example
 * ```typescript
 * POST /api/example
 * Content-Type: application/json
 *
 * {
 *   "title": "새 항목",
 *   "description": "항목 설명"
 * }
 *
 * // 성공 응답 (201):
 * { success: true, data: {...}, message: "생성 성공" }
 *
 * // 실패 응답 (400):
 * { success: false, message: "검증 실패", error: "..." }
 * ```
 *
 * @throws {Error} JSON 파싱 실패 또는 서버 오류 시 500 상태코드 반환
 */
export async function POST(request: NextRequest) {
    try {
        // 요청 본문을 CreateExampleDto 타입으로 파싱
        const body = await request.json() as CreateExampleDto;

        // 컨트롤러를 통해 생성 로직 실행
        const response = await controller.handleCreate(body);

        if (response.success) {
            // 생성 성공: 201 Created 상태코드와 함께 응답
            return NextResponse.json(response, { status: 201 });
        } else {
            // 검증 실패 또는 비즈니스 로직 에러: 400 Bad Request
            return NextResponse.json(response, { status: 400 });
        }
    } catch (error) {
        // JSON 파싱 실패 또는 예상치 못한 에러 처리
        return NextResponse.json(
            {
                success: false,
                message: '요청 처리 중 오류 발생',
                error: String(error),
            },
            { status: 500 }
        );
    }
}

/**
 * PUT 요청 핸들러 - 기존 항목 수정
 *
 * 쿼리 파라미터로 받은 ID에 해당하는 항목을 UpdateExampleDto 데이터로 수정합니다.
 * ID는 필수이며, 항목이 존재하지 않으면 404 Not Found를 반환합니다.
 *
 * @param {NextRequest} request - Next.js 요청 객체 (쿼리: id, 본문: UpdateExampleDto)
 * @returns {Promise<NextResponse>} JSON 형식의 응답 (ApiResponse<ExampleResponseDto>)
 *
 * @example
 * ```typescript
 * PUT /api/example?id=1
 * Content-Type: application/json
 *
 * {
 *   "title": "수정된 제목",
 *   "description": "수정된 설명"
 * }
 *
 * // 성공 응답 (200):
 * { success: true, data: {...}, message: "수정 성공" }
 *
 * // ID 누락 (400):
 * { success: false, message: "ID는 필수입니다" }
 *
 * // 항목 없음 (404):
 * { success: false, message: "항목을 찾을 수 없습니다" }
 * ```
 *
 * @throws {Error} JSON 파싱 실패 또는 서버 오류 시 500 상태코드 반환
 */
export async function PUT(request: NextRequest) {
    try {
        // URL 쿼리 파라미터에서 ID 추출
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        // ID 필수 검증: ID가 없으면 400 Bad Request 반환
        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'ID는 필수입니다',
                },
                { status: 400 }
            );
        }

        // 요청 본문을 UpdateExampleDto 타입으로 파싱
        const body = await request.json() as UpdateExampleDto;

        // 컨트롤러를 통해 수정 로직 실행
        const response = await controller.handleUpdate(id, body);

        if (response.success) {
            // 수정 성공: 200 OK 상태코드와 함께 응답
            return NextResponse.json(response);
        } else {
            // 항목을 찾을 수 없는 경우: 404 Not Found
            return NextResponse.json(response, { status: 404 });
        }
    } catch (error) {
        // JSON 파싱 실패 또는 예상치 못한 에러 처리
        return NextResponse.json(
            {
                success: false,
                message: '요청 처리 중 오류 발생',
                error: String(error),
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE 요청 핸들러 - 항목 삭제
 *
 * 쿼리 파라미터로 받은 ID에 해당하는 항목을 삭제합니다.
 * ID는 필수이며, 항목이 존재하지 않으면 404 Not Found를 반환합니다.
 *
 * @param {NextRequest} request - Next.js 요청 객체 (쿼리: id)
 * @returns {Promise<NextResponse>} JSON 형식의 응답 (ApiResponse<void>)
 *
 * @example
 * ```typescript
 * DELETE /api/example?id=1
 *
 * // 성공 응답 (200):
 * { success: true, message: "삭제 성공" }
 *
 * // ID 누락 (400):
 * { success: false, message: "ID는 필수입니다" }
 *
 * // 항목 없음 (404):
 * { success: false, message: "항목을 찾을 수 없습니다" }
 * ```
 *
 * @throws {Error} 예상치 못한 서버 오류 시 500 상태코드 반환
 */
export async function DELETE(request: NextRequest) {
    try {
        // URL 쿼리 파라미터에서 ID 추출
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        // ID 필수 검증: ID가 없으면 400 Bad Request 반환
        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'ID는 필수입니다',
                },
                { status: 400 }
            );
        }

        // 컨트롤러를 통해 삭제 로직 실행
        const response = await controller.handleDelete(id);

        if (response.success) {
            // 삭제 성공: 200 OK 상태코드와 함께 응답
            return NextResponse.json(response);
        } else {
            // 항목을 찾을 수 없는 경우: 404 Not Found
            return NextResponse.json(response, { status: 404 });
        }
    } catch (error) {
        // 예상치 못한 에러 처리
        return NextResponse.json(
            {
                success: false,
                message: '요청 처리 중 오류 발생',
                error: String(error),
            },
            { status: 500 }
        );
    }
}
