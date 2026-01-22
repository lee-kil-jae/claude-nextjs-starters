// 공통 타입 정의

// 기본 ID 타입
export type ID = string | number;

// 기본 엔티티 인터페이스
export interface BaseEntity {
    id: ID;
    createdAt: Date;
    updatedAt: Date;
}
