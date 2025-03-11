import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Post, PostMeta } from '@/types/post'

// 确保这些函数只在服务器端运行
if (typeof window !== 'undefined') {
  throw new Error('This module should only be used on the server side')
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

// 获取所有文章的元数据
export async function getAllPosts(): Promise<PostMeta[]> {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      // 移除文件扩展名来获取 slug
      const slug = fileName.replace(/\.mdx$/, '')

      // 读取 MDX 文件内容
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // 使用 gray-matter 解析文章元数据
      const { data } = matter(fileContents)

      return {
        slug,
        ...(data as Omit<PostMeta, 'slug'>),
      }
    })

  // 按日期排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// 获取单篇文章的完整内容
export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 使用 gray-matter 解析文章元数据和内容
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    ...(data as Omit<Post, 'slug' | 'content'>),
  }
}

// 获取所有文章的 slug
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, '')
      }
    }
  })
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  return Array.from(new Set(posts.map(post => post.category)))
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = posts.flatMap(post => post.tags)
  return Array.from(new Set(tags))
}

// 按分类获取文章
export async function getPostsByCategory(category: string): Promise<PostMeta[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.category === category)
}

// 按标签获取文章
export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.tags.includes(tag))
} 