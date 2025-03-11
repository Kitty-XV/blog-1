import { SiteConfig } from '@/types/common';

export const siteConfig: SiteConfig = {
  name: '个人博客',
  description: '一个现代化的个人博客系统，专注于内容创作和项目展示',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/images/og.jpg',
  links: {
    github: 'https://github.com/yourusername',
  },
  author: {
    name: '博主',
    bio: '全栈开发者，热爱技术与创作',
    avatar: '/images/avatar.jpg',
  },
}; 