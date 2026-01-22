// 기본 Repository 추상 클래스
import { ID, BaseEntity } from '@/lib/types';

export abstract class BaseRepository<T extends BaseEntity> {
    // 모든 항목 조회
    abstract findAll(): Promise<T[]>;

    // ID로 항목 조회
    abstract findById(id: ID): Promise<T | null>;

    // 항목 생성
    abstract create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;

    // 항목 수정
    abstract update(id: ID, data: Partial<T>): Promise<T | null>;

    // 항목 삭제
    abstract delete(id: ID): Promise<boolean>;

    // 항목 개수 조회
    abstract count(): Promise<number>;
}
