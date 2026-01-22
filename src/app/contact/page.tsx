'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

// 폼 검증 스키마
const contactFormSchema = z.object({
    name: z
        .string()
        .min(2, '이름은 최소 2자 이상이어야 합니다')
        .max(50, '이름은 50자 이하여야 합니다'),
    email: z
        .string()
        .email('유효한 이메일 주소를 입력해주세요'),
    subject: z
        .string()
        .min(3, '제목은 최소 3자 이상이어야 합니다')
        .max(100, '제목은 100자 이하여야 합니다'),
    message: z
        .string()
        .min(10, '메시지는 최소 10자 이상이어야 합니다')
        .max(1000, '메시지는 1000자 이하여야 합니다'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// 연락처 페이지
export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

    const onSubmit = async (values: ContactFormValues) => {
        try {
            // 실제로는 API 호출을 하겠지만, 여기서는 시뮬레이션만 합니다
            console.log('Form submitted:', values);

            // 성공 표시
            setIsSubmitted(true);
            form.reset();

            // 3초 후 성공 메시지 숨기기
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        } catch (error) {
            console.error('폼 제출 오류:', error);
        }
    };

    return (
        <div className="min-h-screen py-12 sm:py-20">
            <Container>
                {/* 제목 섹션 */}
                <div className="mb-16 max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                        연락하기
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        질문이나 제안이 있으신가요? 언제든 연락주세요. 빠르게 답변해드리겠습니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* 왼쪽: 연락처 정보 */}
                    <div className="md:col-span-1 space-y-6">
                        {/* 이메일 */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    <CardTitle>이메일</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 dark:text-slate-400">
                                    contact@example.com
                                </p>
                            </CardContent>
                        </Card>

                        {/* 전화 */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    <CardTitle>전화</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 dark:text-slate-400">
                                    +82 (0) 10-0000-0000
                                </p>
                            </CardContent>
                        </Card>

                        {/* 주소 */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    <CardTitle>주소</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 dark:text-slate-400">
                                    서울시 강남구<br />
                                    대한민국
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 오른쪽: 연락처 양식 */}
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>메시지 보내기</CardTitle>
                                <CardDescription>
                                    아래 양식을 작성하여 메시지를 보내주세요.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isSubmitted && (
                                    <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                        <p className="text-green-800 dark:text-green-200">
                                            ✓ 메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.
                                        </p>
                                    </div>
                                )}

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        {/* 이름 필드 */}
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>이름</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="홍길동"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

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
                                                            placeholder="user@example.com"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* 제목 필드 */}
                                        <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>제목</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="무엇에 대해 연락하시나요?"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* 메시지 필드 */}
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>메시지</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="여기에 메시지를 입력해주세요..."
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        최소 10자, 최대 1000자
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* 제출 버튼 */}
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full"
                                            disabled={form.formState.isSubmitting}
                                        >
                                            {form.formState.isSubmitting
                                                ? '전송 중...'
                                                : '메시지 전송'}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    );
}
