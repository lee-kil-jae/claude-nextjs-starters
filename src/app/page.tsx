import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExampleList } from '@/components/example/example-list';
import { ArrowRight, Sparkles, Code, Palette } from 'lucide-react';

// 홈 페이지
export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
            {/* 히어로 섹션 */}
            <section className="py-20 sm:py-32">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                            <Sparkles className="w-3 h-3" />
                            Next.js 스타터킷
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6">
                            프로덕션 준비가 된 <br />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                웹 앱 스타터킷
                            </span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                            다크모드, 반응형 네비게이션, 레이어드 아키텍처를 포함한 완전한 스타터 템플릿입니다.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="group">
                                <Link href="/about">
                                    시작하기
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/contact">
                                    연락하기
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 기능 섹션 */}
            <section className="py-16 sm:py-24 border-y border-slate-200 dark:border-slate-800">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                            핵심 기능
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            현대적이고 확장 가능한 웹 애플리케이션을 빌드하기 위한 모든 것
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* 기능 카드 1 */}
                        <Card>
                            <CardHeader>
                                <Palette className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                                <CardTitle>다크모드 지원</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    next-themes를 사용한 완벽한 다크모드 지원으로 사용자 경험을 향상시킵니다.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* 기능 카드 2 */}
                        <Card>
                            <CardHeader>
                                <Code className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                                <CardTitle>레이어드 아키텍처</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Controller → Service → Repository 패턴으로 확장 가능한 구조를 제공합니다.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* 기능 카드 3 */}
                        <Card>
                            <CardHeader>
                                <Sparkles className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
                                <CardTitle>타입 안전성</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    TypeScript와 Zod를 활용한 완벽한 타입 안전성으로 버그를 사전에 방지합니다.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </section>

            {/* 예제 섹션 */}
            <section className="py-16 sm:py-24">
                <Container>
                    <div className="mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                            API 예제
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            레이어드 아키텍처로 구현된 예제 API
                        </p>
                    </div>
                    <ExampleList />
                </Container>
            </section>

            {/* CTA 섹션 */}
            <section className="py-16 sm:py-24 bg-slate-900 dark:bg-slate-950 text-white">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            지금 시작하세요
                        </h2>
                        <p className="text-lg text-slate-300 mb-8">
                            프로덕션 준비가 된 템플릿으로 프로젝트를 시작하세요.
                        </p>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/contact">
                                연락처 양식 작성하기
                            </Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </div>
    );
}
