// 예제 Repository: 메모리 기반 데이터 저장소
import { BaseRepository } from './base.repository';
import { ID } from '@/lib/types';

interface ExampleEntity {
    id: string;
    title: string;
    description: string;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}

export class ExampleRepository extends BaseRepository<ExampleEntity> {
    // 메모리 저장소
    private static storage: ExampleEntity[] = [
        {
            id: '1',
            title: '첫 번째 예제',
            description: '이것은 첫 번째 예제입니다.',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            title: '두 번째 예제',
            description: '이것은 두 번째 예제입니다.',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    // 모든 항목 조회
    async findAll(): Promise<ExampleEntity[]> {
        return ExampleRepository.storage;
    }

    // ID로 항목 조회
    async findById(id: ID): Promise<ExampleEntity | null> {
        const item = ExampleRepository.storage.find((item) => item.id === String(id));
        return item || null;
    }

    // 항목 생성
    async create(
        data: Omit<ExampleEntity, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<ExampleEntity> {
        const newItem: ExampleEntity = {
            id: String(Date.now()),
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        ExampleRepository.storage.push(newItem);
        return newItem;
    }

    // 항목 수정
    async update(
        id: ID,
        data: Partial<ExampleEntity>
    ): Promise<ExampleEntity | null> {
        const index = ExampleRepository.storage.findIndex(
            (item) => item.id === String(id)
        );
        if (index === -1) return null;

        const updated: ExampleEntity = {
            ...ExampleRepository.storage[index],
            ...data,
            updatedAt: new Date(),
        };
        ExampleRepository.storage[index] = updated;
        return updated;
    }

    // 항목 삭제
    async delete(id: ID): Promise<boolean> {
        const index = ExampleRepository.storage.findIndex(
            (item) => item.id === String(id)
        );
        if (index === -1) return false;

        ExampleRepository.storage.splice(index, 1);
        return true;
    }

    // 항목 개수 조회
    async count(): Promise<number> {
        return ExampleRepository.storage.length;
    }
}
