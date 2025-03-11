'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ChevronRight } from 'lucide-react'

// 项目分类
const categories = [
  { id: 'all', name: '全部', nameEn: 'ALL' },
  { id: 'web', name: 'Web开发', nameEn: 'WEB' },
  { id: 'ai', name: 'AI百分百', nameEn: 'AI' },
  { id: 'blockchain', name: '区块链', nameEn: 'BLOCKCHAIN' },
  { id: 'useful', name: '实用主义', nameEn: 'USEFUL' },
  { id: 'game', name: '游戏开发', nameEn: 'GAME' },
  { id: 'tool', name: '工具集', nameEn: 'TOOLS' },
  { id: 'other', name: '其他', nameEn: 'OTHERS' }
]

// 项目数据接口
interface Project {
  id: number
  slug: string
  title: string
  description: string
  category: string
  image: string
  link: string
  tech: string[]
}

// 移除空的接口继承
type ApiResponse = Project[]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [projects, setProjects] = useState<Project[]>([])
  const [activeCategories, setActiveCategories] = useState<string[]>(['all'])

  useEffect(() => {
    // 获取项目数据
    fetch('/api/projects')
      .then(res => res.json())
      .then((data: ApiResponse) => {
        setProjects(data)
        // 获取所有实际使用的分类
        const usedCategories = new Set(data.map(project => project.category))
        // 始终包含 'all' 分类
        setActiveCategories(['all', ...Array.from(usedCategories)])
      })
  }, [])

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-slate-50/30">
      <section className="relative pt-24 pb-16 sm:py-24">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50/50 to-transparent opacity-60" />
        
        {/* 装饰元素 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full bg-violet-100/30 blur-3xl animate-float-1" />
          <div className="absolute right-[20%] top-[40%] h-24 w-24 rounded-full bg-violet-100/30 blur-2xl animate-float-2" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          {/* 页面标题 */}
          <div className="mb-16 text-center">
            <h1 className="font-serif text-4xl font-light tracking-tight text-slate-800">
              项目展示
            </h1>
            <p className="mt-4 text-base font-light leading-relaxed text-slate-600">
              人生来就是需要去创造点什么的
            </p>
          </div>

          {/* 分类选择器 */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories
                .filter(category => activeCategories.includes(category.id))
                .map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative px-6 py-2 transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'text-violet-600'
                      : 'text-slate-600 hover:text-violet-500'
                  }`}
                >
                  <span className="relative z-10 text-sm font-light tracking-wide">
                    {category.name}
                  </span>
                  {selectedCategory === category.id && (
                    <motion.div
                      layoutId="categoryHighlight"
                      className="absolute inset-0 rounded-full bg-violet-50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 项目网格 */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/60 shadow-sm transition-all duration-300 group-hover:shadow-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  
                  {/* 渐变遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  
                  {/* 项目信息 */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="translate-y-4 transition-all duration-300 group-hover:translate-y-0">
                      {/* 技术标签 */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-light text-white backdrop-blur-sm shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* 标题和描述 */}
                      <h3 className="mb-2 text-xl font-light text-white drop-shadow-lg">
                        {project.title}
                      </h3>
                      <p className="mb-4 text-sm font-light text-white drop-shadow-md">
                        {project.description}
                      </p>
                      
                      {/* 按钮组 */}
                      <div className="flex gap-3">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-light text-white drop-shadow-md transition-all duration-300 hover:text-white hover:gap-2"
                        >
                          了解更多
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                        {project.link && (
                          <>
                            <div className="h-5 w-px bg-white/30" />
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-light text-white drop-shadow-md transition-all duration-300 hover:text-white hover:gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              访问链接
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 