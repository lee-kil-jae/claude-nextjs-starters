// 예제 Controller
import { BaseController } from './base.controller';
import { ExampleService } from '@/lib/services/example.service';
import { CreateExampleDto, UpdateExampleDto } from '@/lib/types/dto';
import { ApiResponse } from '@/lib/types/api';
import { ID } from '@/lib/types';

export class ExampleController extends BaseController {
    private exampleService: ExampleService;

    constructor(service: ExampleService) {
        super();
        this.exampleService = service;
    }

    // GET: 모든 항목 조회
    async handleGetAll(): Promise<ApiResponse<any>> {
        try {
            const data = await this.exampleService.getAll();
            return this.successResponse(data, '항목 조회 성공');
        } catch (error) {
            return this.errorResponse(
                String(error),
                '항목 조회 실패'
            );
        }
    }

    // GET: ID로 항목 조회
    async handleGetById(id: ID): Promise<ApiResponse<any>> {
        try {
            const data = await this.exampleService.getById(id);
            if (!data) {
                return this.errorResponse('항목을 찾을 수 없습니다', '404');
            }
            return this.successResponse(data, '항목 조회 성공');
        } catch (error) {
            return this.errorResponse(
                String(error),
                '항목 조회 실패'
            );
        }
    }

    // POST: 항목 생성
    async handleCreate(dto: CreateExampleDto): Promise<ApiResponse<any>> {
        try {
            const data = await this.exampleService.create(dto);
            return this.successResponse(data, '항목 생성 성공');
        } catch (error) {
            return this.errorResponse(
                String(error),
                '항목 생성 실패'
            );
        }
    }

    // PUT: 항목 수정
    async handleUpdate(id: ID, dto: UpdateExampleDto): Promise<ApiResponse<any>> {
        try {
            const data = await this.exampleService.update(id, dto);
            if (!data) {
                return this.errorResponse('항목을 찾을 수 없습니다', '404');
            }
            return this.successResponse(data, '항목 수정 성공');
        } catch (error) {
            return this.errorResponse(
                String(error),
                '항목 수정 실패'
            );
        }
    }

    // DELETE: 항목 삭제
    async handleDelete(id: ID): Promise<ApiResponse<any>> {
        try {
            const success = await this.exampleService.delete(id);
            if (!success) {
                return this.errorResponse('항목을 찾을 수 없습니다', '404');
            }
            return this.successResponse({ deleted: true }, '항목 삭제 성공');
        } catch (error) {
            return this.errorResponse(
                String(error),
                '항목 삭제 실패'
            );
        }
    }
}
