// 사이트 설정 정보
export const siteConfig = {
    name: 'Next.js 스타터킷',
    description: '다크모드, 반응형 네비게이션, 레이어드 아키텍처를 포함한 프로덕션 준비 템플릿입니다.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    links: {
        github: 'https://github.com',
        twitter: 'https://twitter.com',
    },
};
