import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

// 소개 페이지
export default function About() {
    return (
        <div className="min-h-screen py-12 sm:py-20">
            <Container>
                {/* 제목 섹션 */}
                <div className="mb-16 max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                        프로덕션 준비 스타터킷
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        현대적이고 확장 가능한 웹 애플리케이션을 빌드하기 위한 완전한 템플릿입니다.
                    </p>
                </div>

                {/* 기술 스택 */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8">
                        기술 스택
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">프론트엔드</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Next.js 16.1.4</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            최신 App Router 기반 프레임워크
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">React 19.2.3</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            최신 리액트 기능 지원
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">TypeScript</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            완벽한 타입 안전성
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">스타일링 & UI</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Tailwind CSS v4</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            유틸리티 기반 CSS 프레임워크
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">shadcn/ui</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            고급 UI 컴포넌트 라이브러리
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Radix UI</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            접근성 있는 컴포넌트
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* 아키텍처 */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8">
                        레이어드 아키텍처
                    </h2>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold">
                                    1
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-slate-50">
                                        Controller
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        HTTP 요청/응답 처리
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="text-2xl text-slate-400 dark:text-slate-600">↓</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-600 dark:bg-purple-500 flex items-center justify-center text-white font-bold">
                                    2
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-slate-50">
                                        Service
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        비즈니스 로직 및 유효성 검사
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="text-2xl text-slate-400 dark:text-slate-600">↓</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-600 dark:bg-orange-500 flex items-center justify-center text-white font-bold">
                                    3
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-slate-50">
                                        Repository
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        데이터 접근 및 저장소
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 핵심 기능 */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8">
                        핵심 기능
                    </h2>
                    <ul className="space-y-3">
                        {[
                            '다크모드 지원 (next-themes)',
                            '반응형 네비게이션 (데스크톱/모바일)',
                            'TypeScript 타입 안전성',
                            'React Hook Form + Zod 폼 검증',
                            '레이어드 아키텍처 (Controller → Service → Repository)',
                            'API 라우트 예제',
                            '컴포넌트 기반 구조',
                            '접근성 고려 설계',
                        ].map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        시작할 준비가 되셨나요?
                    </h2>
                    <p className="mb-6 text-blue-100">
                        연락처 양식을 통해 프로젝트를 논의해봅시다.
                    </p>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/contact">
                            연락 양식 작성하기
                        </Link>
                    </Button>
                </div>
            </Container>
        </div>
    );
}
