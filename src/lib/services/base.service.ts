// 기본 Service 추상 클래스
import { BaseRepository } from '@/lib/repositories/base.repository';
import { ID, BaseEntity } from '@/lib/types';

export abstract class BaseService<T extends BaseEntity> {
    protected repository: BaseRepository<T>;

    constructor(repository: BaseRepository<T>) {
        this.repository = repository;
    }

    // 모든 항목 조회
    async getAll(): Promise<T[]> {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw new Error(`항목 조회 실패: ${error}`);
        }
    }

    // ID로 항목 조회
    async getById(id: ID): Promise<T | null> {
        try {
            if (!id) {
                throw new Error('ID는 필수입니다');
            }
            return await this.repository.findById(id);
        } catch (error) {
            throw new Error(`항목 조회 실패: ${error}`);
        }
    }

    // 항목 개수 조회
    async getCount(): Promise<number> {
        try {
            return await this.repository.count();
        } catch (error) {
            throw new Error(`개수 조회 실패: ${error}`);
        }
    }
}
