import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { TableOfContents } from '@/components/post/TableOfContents'
import { PostActions } from '@/components/post/PostActions'
import { mdxOptions } from '@/lib/mdx'
import Link from 'next/link'
import type { Post, PostMeta } from '@/types/post'

// 生成静态页面参数
export async function generateStaticParams() {
  const posts = getAllPostSlugs()
  return posts
}

export default async function PostPage(props: any) {
  const slug = props.params.slug
  const post = await getPostBySlug(slug) as Post
  const allPosts = await getAllPosts() as PostMeta[]

  if (!post) {
    notFound()
  }

  // 获取上一篇和下一篇文章
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  // 获取相关文章（同类别或有相同标签的文章）
  const relatedPosts = allPosts
    .filter((p) => {
      if (p.slug === slug) return false
      return (
        p.category === post.category ||
        p.tags?.some((tag) => post.tags?.includes(tag))
      )
    })
    .slice(0, 3)

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-50/50 via-white to-white">
      {/* 装饰背景 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[10%] h-48 w-48 rounded-full bg-primary-100/30 blur-3xl animate-float-1" />
        <div className="absolute right-[10%] top-[15%] h-36 w-36 rounded-full bg-accent-100/30 blur-2xl animate-float-2" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        {/* 文章头部区域 */}
        <header className="mx-auto mb-16 max-w-3xl">
          {/* 文章元信息 */}
          <div className="mb-6 flex items-center justify-center gap-4 text-sm font-light">
            <time className="text-primary-600/80">
              {format(new Date(post.date), 'PPP', { locale: zhCN })}
            </time>
            <span className="h-1 w-1 rounded-full bg-primary-300/70" />
            <span className="text-primary-600/80">
              {post.category}
            </span>
          </div>

          {/* 文章标题 */}
          <h1 className="mb-8 text-center font-serif text-4xl font-light tracking-tight text-foreground/90 md:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-col items-center gap-6">
            {/* 标签 */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/posts?tag=${encodeURIComponent(tag)}`}
                    className="group rounded-full bg-primary-100/40 px-4 py-1 text-sm font-light text-primary-600 transition-all duration-200 ease-out hover:bg-primary-100/60 hover:shadow-sm backdrop-blur-sm"
                  >
                    <span className="transition-colors duration-200 group-hover:text-primary-700">#{tag}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* 文章操作 */}
            <div className="flex items-center gap-8 text-sm font-light text-foreground/60">
              <PostActions slug={slug} title={post.title} />
            </div>
          </div>

          {/* 装饰分隔线 */}
          <div className="mt-12 flex items-center justify-center">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary-300/40 to-transparent" />
          </div>
        </header>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* 主要内容区域 */}
          <article className="lg:flex-1">
            {/* 文章内容 */}
            <div className="prose prose-lg mx-auto max-w-3xl post-content 
              prose-headings:font-serif prose-headings:font-light 
              prose-p:font-light prose-p:leading-relaxed prose-p:text-foreground/80 
              prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline 
              prose-strong:font-medium prose-strong:text-foreground/90
              prose-code:text-primary-700 prose-code:bg-primary-50/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:hidden prose-code:after:hidden
              prose-pre:border prose-pre:border-primary-200/30 prose-pre:bg-white/80 prose-pre:shadow-sm prose-pre:backdrop-blur-sm
              prose-img:rounded-lg prose-img:shadow-soft-md
              prose-blockquote:border-l-primary-300 prose-blockquote:bg-primary-50/30 prose-blockquote:py-0.5 prose-blockquote:not-italic prose-blockquote:text-foreground/70 prose-blockquote:font-light">
              <MDXRemote source={post.content} components={mdxOptions.components} />
            </div>

            {/* 上一篇/下一篇导航 */}
            <nav className="mx-auto mt-16 max-w-3xl space-y-8 border-t border-primary-200/30 pt-8">
              <h3 className="mb-4 font-serif text-xl font-light text-foreground/70">继续阅读</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {prevPost && (
                  <Link
                    href={`/posts/${prevPost.slug}`}
                    className="group relative overflow-hidden rounded-xl border border-primary-100/30 bg-white/60 p-6 shadow-soft-sm backdrop-blur-sm transition-all duration-300 ease-out hover-card-effect"
                  >
                    <span className="text-sm font-light text-foreground/50">上一篇</span>
                    <h3 className="mt-2 line-clamp-2 font-serif text-lg font-light text-foreground/70 transition-colors duration-300 ease-out group-hover:text-foreground">
                      {prevPost.title}
                    </h3>
                  </Link>
                )}
                {nextPost && (
                  <Link
                    href={`/posts/${nextPost.slug}`}
                    className="group relative overflow-hidden rounded-xl border border-primary-100/30 bg-white/60 p-6 shadow-soft-sm backdrop-blur-sm transition-all duration-300 ease-out hover-card-effect"
                  >
                    <span className="text-sm font-light text-foreground/50">下一篇</span>
                    <h3 className="mt-2 line-clamp-2 font-serif text-lg font-light text-foreground/70 transition-colors duration-300 ease-out group-hover:text-foreground">
                      {nextPost.title}
                    </h3>
                  </Link>
                )}
              </div>
            </nav>
          </article>

          {/* 右侧边栏 */}
          <div className="lg:w-80">
            <div className="sticky top-24 space-y-8">
              {/* 目录 */}
              <div className="overflow-hidden rounded-xl border border-primary-100/30 bg-white/70 p-6 shadow-soft-sm backdrop-blur-sm">
                {/* <h3 className="mb-4 font-serif text-lg font-light text-foreground/70">目录</h3> */}
                <TableOfContents />
              </div>

              {/* 相关文章 */}
              {relatedPosts.length > 0 && (
                <div className="overflow-hidden rounded-xl border border-primary-100/30 bg-white/70 shadow-soft-sm backdrop-blur-sm">
                  <div className="border-b border-primary-100/30 p-6">
                    <h3 className="font-serif text-lg font-light text-foreground/70">相关文章</h3>
                  </div>
                  <div className="divide-y divide-primary-100/30">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/posts/${relatedPost.slug}`}
                        className="group block p-6 transition-colors duration-300 ease-out hover:bg-white hover-card-effect"
                      >
                        <h4 className="line-clamp-2 font-serif text-base font-light text-foreground/70 transition-colors duration-300 ease-out group-hover:text-foreground">
                          {relatedPost.title}
                        </h4>
                        <div className="mt-2 flex items-center gap-3 text-xs text-foreground/50">
                          <time>{format(new Date(relatedPost.date), 'PPP', { locale: zhCN })}</time>
                          <span className="h-1 w-1 rounded-full bg-foreground/20" />
                          <span>{relatedPost.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 