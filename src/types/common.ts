export interface Pagination {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface MetaData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type Theme = 'light' | 'dark' | 'system';

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    twitter?: string;
  };
  author: {
    name: string;
    bio: string;
    avatar: string;
  };
} 