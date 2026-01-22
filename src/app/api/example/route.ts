import { NextRequest, NextResponse } from 'next/server';
import { ExampleController } from '@/lib/controllers/example.controller';
import { ExampleService } from '@/lib/services/example.service';
import { ExampleRepository } from '@/lib/repositories/example.repository';
import { CreateExampleDto, UpdateExampleDto } from '@/lib/types/dto';

// 의존성 주입: Repository → Service → Controller
const repository = new ExampleRepository();
const service = new ExampleService(repository);
const controller = new ExampleController(service);

// GET: 모든 항목 조회
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (id) {
            // 특정 ID로 조회
            const response = await controller.handleGetById(id);
            return NextResponse.json(response);
        } else {
            // 모든 항목 조회
            const response = await controller.handleGetAll();
            return NextResponse.json(response);
        }
    } catch (error) {
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

// POST: 항목 생성
export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as CreateExampleDto;
        const response = await controller.handleCreate(body);

        if (response.success) {
            return NextResponse.json(response, { status: 201 });
        } else {
            return NextResponse.json(response, { status: 400 });
        }
    } catch (error) {
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

// PUT: 항목 수정
export async function PUT(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'ID는 필수입니다',
                },
                { status: 400 }
            );
        }

        const body = await request.json() as UpdateExampleDto;
        const response = await controller.handleUpdate(id, body);

        if (response.success) {
            return NextResponse.json(response);
        } else {
            return NextResponse.json(response, { status: 404 });
        }
    } catch (error) {
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

// DELETE: 항목 삭제
export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'ID는 필수입니다',
                },
                { status: 400 }
            );
        }

        const response = await controller.handleDelete(id);

        if (response.success) {
            return NextResponse.json(response);
        } else {
            return NextResponse.json(response, { status: 404 });
        }
    } catch (error) {
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
