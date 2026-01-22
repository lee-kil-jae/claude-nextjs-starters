'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { navigationConfig } from '@/config/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Container } from './container';
import { ThemeToggle } from '@/components/theme/theme-toggle';

// 모바일 네비게이션 (Sheet 기반 햄버거 메뉴)
export function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/60 md:hidden">
            <Container className="flex h-16 items-center justify-between">
                {/* 로고 */}
                <Link href="/" className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                        <span className="font-bold text-white">N</span>
                    </div>
                    <span className="font-bold">Next.js</span>
                </Link>

                {/* 오른쪽 섹션: 테마 토글 + 메뉴 버튼 */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-md md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">메뉴 열기</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-3/4 sm:w-1/3">
                            <div className="space-y-4 py-4">
                                <h2 className="px-2 text-lg font-semibold">메뉴</h2>
                                <nav className="space-y-2">
                                    {navigationConfig.mainNav.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block px-2 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                                            onClick={() => setOpen(false)}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </Container>
        </div>
    );
}
