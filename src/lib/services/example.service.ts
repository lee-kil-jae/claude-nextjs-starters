// 예제 Service
import { ExampleRepository } from '@/lib/repositories/example.repository';
import { CreateExampleDto, UpdateExampleDto, ExampleResponseDto } from '@/lib/types/dto';
import { ID } from '@/lib/types';

interface ExampleEntity {
    id: string;
    title: string;
    description: string;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}

export class ExampleService {
    private exampleRepository: ExampleRepository;

    constructor(repository: ExampleRepository) {
        this.exampleRepository = repository;
    }

    // DTO 변환: 엔티티 → 응답
    private toResponseDto(entity: ExampleEntity): ExampleResponseDto {
        return {
            id: entity.id,
            title: entity.title,
            description: entity.description,
            status: entity.status,
            createdAt: entity.createdAt.toISOString(),
            updatedAt: entity.updatedAt.toISOString(),
        };
    }

    // 모든 항목 조회
    async getAll(): Promise<ExampleResponseDto[]> {
        const items = await this.exampleRepository.findAll();
        return items.map((item) => this.toResponseDto(item));
    }

    // ID로 항목 조회
    async getById(id: ID): Promise<ExampleResponseDto | null> {
        const item = await this.exampleRepository.findById(id);
        return item ? this.toResponseDto(item) : null;
    }

    // 항목 생성
    async create(dto: CreateExampleDto): Promise<ExampleResponseDto> {
        // 유효성 검사
        if (!dto.title || !dto.description) {
            throw new Error('제목과 설명은 필수입니다');
        }

        const entity = await this.exampleRepository.create(dto);
        return this.toResponseDto(entity);
    }

    // 항목 수정
    async update(id: ID, dto: UpdateExampleDto): Promise<ExampleResponseDto | null> {
        const entity = await this.exampleRepository.update(id, dto);
        return entity ? this.toResponseDto(entity) : null;
    }

    // 항목 삭제
    async delete(id: ID): Promise<boolean> {
        return await this.exampleRepository.delete(id);
    }
}
