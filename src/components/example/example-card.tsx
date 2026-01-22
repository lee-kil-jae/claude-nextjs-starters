import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExampleResponseDto } from '@/lib/types/dto';

interface ExampleCardProps {
    item: ExampleResponseDto;
}

// 예제 카드 컴포넌트
export function ExampleCard({ item }: ExampleCardProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </div>
                    <Badge
                        variant={item.status === 'active' ? 'default' : 'secondary'}
                        className="ml-2"
                    >
                        {item.status === 'active' ? '활성' : '비활성'}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                    <p>생성일: {new Date(item.createdAt).toLocaleDateString('ko-KR')}</p>
                    <p>수정일: {new Date(item.updatedAt).toLocaleDateString('ko-KR')}</p>
                </div>
            </CardContent>
        </Card>
    );
}
