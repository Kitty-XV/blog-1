import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'
import { ArrowUpRight } from 'lucide-react'

export default async function Home() {
  // 获取最新的2篇文章
  const latestPosts = await getAllPosts()
  const posts = latestPosts.slice(0, 2)

  return (
    <div className="min-h-screen">
      {/* 主视觉区域 */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* 背景图片 */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/bg.jpg"
            alt="Background"
            fill
            className="object-cover object-center transition-transform duration-[3s] ease-out hover:scale-105"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/40 to-white backdrop-blur-[2px] transition-opacity duration-1000" />
        </div>

        {/* 装饰元素 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-primary-400/10 blur-3xl animate-float-1" />
          <div className="absolute right-[15%] top-[30%] h-32 w-32 rounded-full bg-accent-300/10 blur-2xl animate-float-2" />
          <div className="absolute bottom-[25%] left-[20%] h-36 w-36 rounded-full bg-primary-300/10 blur-2xl animate-float-3" />
        </div>

        {/* 主要内容 */}
        <div className="relative z-10 px-6 text-center">
          <h1 className="animate-fade-in-up font-serif text-7xl font-light tracking-tight text-foreground opacity-0 animation-delay-200 sm:text-8xl md:text-9xl">
            Hi, I&apos;m Renne
          </h1>
          <p className="mx-auto mt-12 max-w-lg text-lg font-light tracking-wider text-foreground/80 opacity-0 animate-fade-in-up animation-delay-400 sm:text-xl md:text-2xl">
            Welcome to my tea party
          </p>
          
          {/* <div className="mt-12 opacity-0 animate-fade-in-up animation-delay-600">
            <Link 
              href="/posts" 
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary-200 bg-white/50 px-6 py-3 text-sm font-light text-primary-700 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-soft-md hover:shadow-primary-300/20"
            >
              <span>浏览全部文章</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-100/0 via-primary-100/30 to-primary-100/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </Link>
          </div> */}
        </div>
        
        {/* 滚动提示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* 内容过渡区域 */}
      <div className="relative h-24 bg-gradient-to-b from-transparent to-background" />

      {/* 最新文章区域 */}
      <section className="relative bg-background py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <span className="mb-4 block text-sm font-light tracking-[0.2em] text-primary-600/80">LATEST WRITINGS</span>
              <h2 className="font-serif text-4xl font-light tracking-wide text-foreground/80">
                最新文章
              </h2>
            </div>
            <Link
              href="/posts"
              className="group relative inline-flex items-center gap-2 py-2 text-sm font-light tracking-wider text-foreground/40 transition-colors hover:text-foreground"
            >
              <span className="relative">浏览全部文章</span>
              <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          
          <div className="grid gap-12 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative hover-card-effect rounded-xl border border-primary-100/20 bg-white/80 p-6 backdrop-blur-sm"
              >
                <Link href={`/posts/${post.slug}`} className="block space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm font-light">
                      <time className="text-primary-600/80">
                        {format(new Date(post.date), 'yyyy.MM.dd')}
                      </time>
                      <span className="h-px w-8 bg-primary-200/50" />
                      <span className="text-primary-600/80">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-light leading-normal text-foreground/80 transition-colors duration-300 ease-out group-hover:text-foreground">
                      {post.title}
                    </h3>
                  </div>
                  <p className="text-base font-light leading-relaxed text-foreground/60">
                    {post.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-light text-primary-600/80 transition-colors duration-300 group-hover:text-primary-600">
                    <span>阅读全文</span>
                    <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/posts?tag=${tag}`}
                      className="rounded-full bg-primary-50 px-3 py-1 text-sm font-light text-primary-600 transition-colors duration-150 ease-out hover:bg-primary-100"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
          
          {/* 装饰元素 */}
          <div className="pointer-events-none absolute -bottom-16 left-0 right-0 -z-10 flex justify-between">
            <div className="h-64 w-64 rounded-full bg-primary-100/30 blur-3xl animate-float-3"></div>
            <div className="h-48 w-48 rounded-full bg-accent-100/30 blur-3xl animate-float-2"></div>
          </div>
        </div>
      </section>
      
      {/* 个人介绍区域 */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-diagonal from-primary-50/50 to-accent-50/30"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-4xl font-light text-foreground/80 mb-12">关于我</h2>
          
          <div className="glassmorphism rounded-xl p-8">
            <div className="mb-8 flex justify-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white/80 shadow-soft-md">
                <Image
                  src="/images/avatar/avatar.jpg"
                  alt="Renne"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <p className="mb-6 text-lg font-light leading-relaxed text-foreground/70">
              嗨，我是 Renne，一名热爱AI技术和产品创造的开发者。这个博客是我分享想法、记录学习心得和展示项目的地方。
            </p>
            
            {/* <p className="mb-8 text-lg font-light leading-relaxed text-foreground/70">
              欢迎来到我的茶会，希望你能在这里找到有趣的内容！
            </p> */}
            
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-primary-600 transition-colors duration-300 hover:text-primary-700"
            >
              <span>了解更多</span>
              <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
