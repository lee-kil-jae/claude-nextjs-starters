import React from 'react';
import Link from 'next/link';
import { navigationConfig } from '@/config/navigation';
import { Container } from './container';
import { Separator } from '@/components/ui/separator';

// 푸터 컴포넌트
export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
            <Container className="py-12">
                {/* 푸터 네비게이션 */}
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
                    {navigationConfig.footerNav.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold">{section.title}</h3>
                            <ul className="mt-4 space-y-2">
                                {section.items.map((item) => (
                                    <li key={item.title}>
                                        <Link
                                            href={item.href}
                                            className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="my-8" />

                {/* 저작권 정보 */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        © 2026. 모든 권리 보유.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="#"
                            className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                        >
                            개인정보보호
                        </Link>
                        <Link
                            href="#"
                            className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                        >
                            이용약관
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
