export interface Author {
  name: string;
  avatar: string;
  bio?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: Author;
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
} 