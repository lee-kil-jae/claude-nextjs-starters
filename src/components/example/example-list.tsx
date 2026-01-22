'use client';

import React, { useEffect, useState } from 'react';
import { ExampleCard } from './example-card';
import { ExampleResponseDto } from '@/lib/types/dto';
import { siteConfig } from '@/config/site';

// 예제 목록 컴포넌트: API 호출
export function ExampleList() {
    const [items, setItems] = useState<ExampleResponseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${siteConfig.apiUrl}/example`);
                const data = await response.json();

                if (data.success) {
                    setItems(data.data);
                    setError(null);
                } else {
                    setError(data.message || '데이터를 불러올 수 없습니다');
                }
            } catch (err) {
                setError(String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return (
            <div className="text-center text-slate-500 dark:text-slate-400">
                로드 중...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 dark:text-red-400">
                오류: {error}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center text-slate-500 dark:text-slate-400">
                항목이 없습니다.
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <ExampleCard key={item.id} item={item} />
            ))}
        </div>
    );
}
