'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { PostList } from '@/components/post/PostList'
import { AnimatedTagCloud } from '@/components/post/AnimatedTagCloud'
import { PostsHeader } from '@/components/post/PostsHeader'
import { PostSearch } from '@/components/post/PostSearch'
import { Pagination } from '@/components/post/Pagination'
import type { PostMeta } from '@/types/post'

const POSTS_PER_PAGE = 10

// 提取文章列表组件
function PostsContent() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [filteredPosts, setFilteredPosts] = useState<PostMeta[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const tag = searchParams.get('tag')
    if (tag) {
      setSelectedTag(tag)
      setSearchQuery('')
    }
  }, [searchParams])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/posts')
        const data = await response.json()
        
        if (response.ok) {
          setPosts(data.posts)
          setTags(data.tags)
          
          // 如果有选中的标签，过滤文章
          if (selectedTag) {
            const taggedPosts = data.posts.filter((post: PostMeta) =>
              post.tags.includes(selectedTag)
            )
            setFilteredPosts(taggedPosts)
          } else {
            setFilteredPosts(data.posts)
          }
        } else {
          console.error('Failed to fetch posts:', data.error)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [selectedTag])

  // 处理搜索
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSelectedTag('')
    setCurrentPage(1)
    
    if (!query.trim()) {
      setFilteredPosts(posts)
      return
    }

    const searchResults = posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
    setFilteredPosts(searchResults)
  }

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
    setSearchQuery('')
    setCurrentPage(1)
    
    const taggedPosts = posts.filter(post =>
      post.tags.includes(tag)
    )
    setFilteredPosts(taggedPosts)
  }

  // 计算分页数据
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  // 计算标签使用次数
  const tagCounts = tags.map(tag => ({
    name: tag,
    count: posts.filter(post => post.tags.includes(tag)).length
  }))

  return (
    <div className="animate-fade-in">
      {/* 当前选中的标签提示 */}
      {selectedTag && (
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-100/60 px-4 py-2 text-sm font-light text-primary-700 shadow-soft-sm">
            当前标签：{selectedTag}
            <button
              onClick={() => {
                setSelectedTag('')
                setFilteredPosts(posts)
              }}
              className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-200/50 text-primary-600 transition-colors hover:bg-primary-200 hover:text-primary-700"
              aria-label="清除标签过滤"
            >
              ×
            </button>
          </span>
        </div>
      )}

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* 文章列表区域 */}
        <div className="flex-1">
          {/* 搜索框 */}
          <PostSearch onSearch={handleSearch} />
          
          {/* 加载状态 */}
          {isLoading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-pulse-slow rounded-full border-2 border-primary-300 border-t-transparent" style={{ animationDuration: '1s' }}></div>
                <div className="text-sm font-light text-foreground/60">加载中...</div>
              </div>
            </div>
          ) : (
            <>
              {/* 文章列表 */}
              <PostList posts={paginatedPosts} />
              
              {/* 分页 */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}

              {/* 无搜索结果提示 */}
              {(searchQuery || selectedTag) && filteredPosts.length === 0 && (
                <div className="glassmorphism mt-12 rounded-xl p-8 text-center">
                  <p className="mb-2 text-lg font-light text-foreground/60">没有找到相关文章</p>
                  <p className="text-sm text-foreground/50">
                    {searchQuery 
                      ? `没有找到与"${searchQuery}"相关的文章` 
                      : `没有找到标签为"${selectedTag}"的文章`}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedTag('')
                      setSearchQuery('')
                      setFilteredPosts(posts)
                    }}
                    className="mt-4 rounded-full bg-primary-100/50 px-4 py-2 text-sm font-light text-primary-600 transition-colors hover:bg-primary-100"
                  >
                    清除筛选条件
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* 右侧边栏 */}
        <div className="lg:w-80">
          <div className="sticky top-24 space-y-8">
            {/* 标签云 */}
            <div className="glassmorphism overflow-hidden rounded-xl p-6">
              <h3 className="mb-4 font-serif text-lg font-light text-foreground/70">文章标签</h3>
              <AnimatedTagCloud tags={tagCounts} onTagClick={handleTagClick} />
            </div>
            
            {/* 分类统计 */}
            <div className="glassmorphism overflow-hidden rounded-xl p-6">
              <h3 className="mb-4 font-serif text-lg font-light text-foreground/70">统计信息</h3>
              <ul className="space-y-3 text-sm font-light">
                <li className="flex items-center justify-between">
                  <span className="text-foreground/60">文章总数：</span>
                  <span className="text-primary-600">{posts.length}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-foreground/60">标签总数：</span>
                  <span className="text-primary-600">{tags.length}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 主页面组件
export default function PostsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-50/50 via-white to-white">
      {/* 装饰背景 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      
      {/* 装饰元素 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[5%] top-[10%] h-64 w-64 rounded-full bg-primary-200/20 blur-3xl animate-float-1" />
        <div className="absolute right-[10%] top-[20%] h-48 w-48 rounded-full bg-accent-200/20 blur-2xl animate-float-2" />
        <div className="absolute bottom-[30%] left-[20%] h-40 w-40 rounded-full bg-primary-100/20 blur-2xl animate-float-3" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        {/* 页面标题 */}
        <PostsHeader />

        {/* 使用 Suspense 包装使用 useSearchParams 的组件 */}
        <Suspense fallback={
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-pulse-slow rounded-full border-2 border-primary-300 border-t-transparent" style={{ animationDuration: '1s' }}></div>
              <div className="text-sm font-light text-foreground/60">加载中...</div>
            </div>
          </div>
        }>
          <PostsContent />
        </Suspense>
      </div>
    </div>
  )
} 