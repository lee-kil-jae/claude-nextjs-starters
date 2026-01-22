'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// 로그인 폼 검증 스키마
const loginSchema = z.object({
    email: z
        .string()
        .min(1, '이메일을 입력해주세요')
        .email('유효한 이메일 주소를 입력해주세요'),
    password: z
        .string()
        .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
        .max(100, '비밀번호는 100자 이하여야 합니다'),
    rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// 로그인 페이지
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = (values: LoginFormValues) => {
        // 콘솔에 로그인 데이터 출력
        console.log('로그인 데이터:', values);

        // TODO: 추후 API 연동 시 여기에 fetch 호출 추가
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Container>
                <div className="w-full max-w-md mx-auto">
                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl">로그인</CardTitle>
                            <CardDescription>
                                계정에 로그인하세요
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-6"
                                >
                                    {/* 이메일 필드 */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>이메일</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="example@email.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* 비밀번호 필드 */}
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>비밀번호</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={
                                                                showPassword
                                                                    ? 'text'
                                                                    : 'password'
                                                            }
                                                            placeholder="비밀번호를 입력하세요"
                                                            {...field}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword
                                                                )
                                                            }
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                                                            aria-label={
                                                                showPassword
                                                                    ? '비밀번호 숨기기'
                                                                    : '비밀번호 보기'
                                                            }
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff size={20} />
                                                            ) : (
                                                                <Eye size={20} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* 로그인 상태 유지 체크박스 */}
                                    <FormField
                                        control={form.control}
                                        name="rememberMe"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="font-normal cursor-pointer">
                                                        로그인 상태 유지
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {/* 로그인 버튼 */}
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full"
                                        disabled={form.formState.isSubmitting}
                                    >
                                        {form.formState.isSubmitting
                                            ? '로그인 중...'
                                            : '로그인하기'}
                                    </Button>
                                </form>
                            </Form>

                            {/* 회원가입 링크 */}
                            <div className="mt-6 text-center text-sm">
                                <span className="text-slate-600 dark:text-slate-400">
                                    계정이 없으신가요?{' '}
                                </span>
                                <Link
                                    href="/signup"
                                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    회원가입
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </div>
    );
}
