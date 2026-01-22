// DTO (Data Transfer Object) 타입 정의

// 예제 DTO: 생성 요청
export interface CreateExampleDto {
    title: string;
    description: string;
    status: 'active' | 'inactive';
}

// 예제 DTO: 수정 요청
export interface UpdateExampleDto {
    title?: string;
    description?: string;
    status?: 'active' | 'inactive';
}

// 예제 DTO: 응답
export interface ExampleResponseDto {
    id: string;
    title: string;
    description: string;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}
