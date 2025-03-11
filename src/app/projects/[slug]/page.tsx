import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

// 项目数据接口
interface Project {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tech: string[]
  coverImage: string
  link: string
  chromeLink?: string
  edgeLink?: string
  github?: string
  images?: string[]
  content: string
}

// 获取所有项目的slug
export async function generateStaticParams() {
  const projectsDirectory = path.join(process.cwd(), 'content/projects')
  const files = fs.readdirSync(projectsDirectory)
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace(/\.mdx$/, '')
    }))
}

// 获取项目数据
async function getProject(slug: string): Promise<Project | null> {
  const projectsDirectory = path.join(process.cwd(), 'content/projects')
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`)
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      content,
      ...(data as Omit<Project, 'slug' | 'content'>)
    }
  } catch (error) {
    console.error('Error reading project file:', error)
    return null
  }
}

// 设置该页面为动态渲染
export const dynamic = 'force-dynamic'

// 使用 any 类型来解决 Next.js 15 的类型问题
export default async function ProjectPage(props: any) {
  const project = await getProject(props.params.slug)
  
  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50/30">
      <div className="relative">
        {/* 顶部封面图 */}
        <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* 返回按钮 */}
          <div className="absolute left-6 top-6 z-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-light text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              返回项目
            </Link>
          </div>
          
          {/* 项目标题 */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="mx-auto max-w-5xl">
              <h1 className="mb-4 font-serif text-4xl font-light tracking-tight text-white">
                {project.title}
              </h1>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-white/80">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="mx-auto max-w-5xl px-6 py-12">
          {/* 技术标签 */}
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="rounded-full bg-violet-50 px-3 py-1 text-sm font-light text-violet-600"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* 链接按钮 */}
          <div className="mb-12 flex flex-wrap gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-stone-600 px-6 py-2.5 text-sm font-light text-white/90 transition-all duration-300 hover:bg-stone-500"
              >
                访问项目
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.chromeLink && (
              <a
                href={project.chromeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-light text-white/90 transition-all duration-300 hover:bg-emerald-600"
              >
                Chrome 插件
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.edgeLink && (
              <a
                href={project.edgeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sky-700 px-6 py-2.5 text-sm font-light text-white/90 transition-all duration-300 hover:bg-sky-600"
              >
                Edge 插件
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-700 px-6 py-2.5 text-sm font-light text-white/90 transition-all duration-300 hover:bg-zinc-600"
              >
                源代码
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* 项目内容 */}
          <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-light prose-p:font-light">
            <MDXRemote source={project.content} />
          </div>

          {/* 项目截图 */}
          {project.images && project.images.length > 0 && (
            <div className="mt-16 space-y-8">
              <h2 className="font-serif text-2xl font-light tracking-tight text-slate-800">
                项目截图
              </h2>
              <div className="grid gap-8 sm:grid-cols-2">
                {project.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 