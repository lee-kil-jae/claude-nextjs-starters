'use client';

import React from 'react';
import Link from 'next/link';
import { navigationConfig } from '@/config/navigation';
import { Container } from './container';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';

// 데스크톱 네비게이션 헤더
export function Header() {
    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/60">
            <Container className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    {/* 로고 */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                            <span className="font-bold text-white">N</span>
                        </div>
                        <span className="hidden font-bold sm:inline-block">
                            Next.js
                        </span>
                    </Link>

                    {/* 네비게이션 메뉴 (데스크톱) */}
                    <nav className="hidden gap-6 md:flex">
                        {navigationConfig.mainNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* 오른쪽 섹션: 테마 토글 */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </Container>
        </header>
    );
}
