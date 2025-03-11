import Link from 'next/link'
import { PostMeta } from '@/types/post'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Eye, ArrowUpRight } from 'lucide-react'

interface PostCardProps {
  post: PostMeta
  views?: number
}

export function PostCard({ post, views = 0 }: PostCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-primary-100/30 bg-white/70 p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:bg-white hover:shadow-soft-md">
      <Link href={`/posts/${post.slug}`} className="block space-y-5">
        {/* 文章元信息 */}
        <div className="flex items-center gap-4 text-xs font-light">
          <time className="text-primary-600/70">
            {format(new Date(post.date), 'PPP', { locale: zhCN })}
          </time>
          <span className="h-1 w-1 rounded-full bg-primary-200" />
          <span className="text-primary-600/70">{post.category}</span>
        </div>
        
        {/* 文章标题 */}
        <h2 className="font-serif text-xl font-light leading-relaxed text-foreground/80 transition-all duration-300 ease-out group-hover:text-foreground md:text-2xl">
          {post.title}
        </h2>
        
        {/* 文章摘要 */}
        <p className="line-clamp-2 text-sm font-light leading-relaxed text-foreground/60">
          {post.excerpt}
        </p>
        
        {/* 阅读量和阅读更多 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-light text-foreground/50">
            <Eye className="h-3 w-3" />
            <span>{views} 次阅读</span>
          </div>
          
          <div className="inline-flex items-center gap-1 text-xs font-light text-primary-600 transition-colors duration-300 group-hover:text-primary-700">
            <span>阅读更多</span>
            <ArrowUpRight className="h-3 w-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
      
      {/* 标签列表 */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2 border-t border-primary-100/30 pt-5">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/posts?tag=${encodeURIComponent(tag)}`}
              className="rounded-full bg-primary-50/70 px-3 py-1 text-xs font-light text-primary-600 transition-colors duration-200 hover:bg-primary-100/70"
              onClick={(e) => e.stopPropagation()}
            >
              #{tag}
            </Link>
          ))}
          {post.tags.length > 3 && (
            <span className="rounded-full bg-secondary-100/50 px-2 py-1 text-xs font-light text-secondary-600">
              +{post.tags.length - 3}
            </span>
          )}
        </div>
      )}
      
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  )
} 