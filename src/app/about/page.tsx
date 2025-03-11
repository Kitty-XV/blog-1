'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function About() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const timelineItems = [
    {
      date: '2025.01',
      title: '博客上线',
      description: '感谢Cursor对本人提供的技术支持',
      image: '/images/milestones/blog.png'
    },
    {
      date: '2024.10',
      title: '国际密码学奥林匹克竞赛NSUCRYPTO',
      description: '2024：个人赛（Diploma），团队赛（铜牌）',
      image: '/images/milestones/nsucrypto.jpg'
    },
    {
      date: '2023.06',
      title: '莫斯科国立大学本科毕业',
      description: '应用数学与计算机科学',
      image: '/images/milestones/msu.png'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* 主要内容区域 */}
      <section className="relative pt-24 pb-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* 个人信息部分 */}
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="relative mb-8 h-32 w-32 overflow-hidden rounded-full ring-2 ring-blue-500/10">
              <Image
                src="/images/avatar/avatar.jpg"
                alt="Renne"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h1 className="font-serif text-4xl font-light tracking-tight text-slate-800">
              Renne
            </h1>
            <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-slate-600">
              相信的心就是你的魔法。
            </p>
          </div>

          {/* 技能与兴趣部分 */}
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-slate-800">技术栈</h2>
              <div className="flex flex-wrap gap-2">
                {['Crypto', 'C++/C', 'Python', 'AI'].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-3 py-1 text-sm font-light text-blue-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-medium text-slate-800">兴趣</h2>
              <div className="flex flex-wrap gap-2">
                {['烹饪', '钢琴', '摄影', '旅行', '阅读', '古典乐'].map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-violet-50 px-3 py-1 text-sm font-light text-violet-600"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 个人经历部分 */}
          <div className="mt-16">
            <h2 className="text-lg font-medium text-slate-800 mb-4">我</h2>
            <p className="text-base font-light leading-relaxed text-slate-600">
              技术不仅仅是解决问题的工具，更是创造价值的媒介。在这个博客中，我会分享我的技术见解、学习心得以及生活感悟。
            </p>
          </div>

          {/* 成就时间线 - 带图片展示 */}
          <div className="mt-16">
            <h2 className="text-lg font-medium text-slate-800 mb-8">时间线</h2>
            <div className="grid grid-cols-1 md:grid-cols-[1fr,400px] gap-12">
              {/* 左侧时间线 */}
              <div className="space-y-12">
                {timelineItems.map((item, index) => (
                  <div key={index}>
                    <div 
                      className={`relative pl-8 border-l-2 cursor-pointer
                        ${expandedIndex === index ? 'border-blue-400' : 'border-blue-100 hover:border-blue-300'}
                        transition-colors duration-300`}
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    >
                      <div className={`absolute left-0 top-0 w-2 h-2 rounded-full -translate-x-[5px]
                        ${expandedIndex === index ? 'bg-blue-400 scale-150' : 'bg-blue-400'}
                        transition-all duration-300`} 
                      />
                      <time className="text-sm text-slate-500">{item.date}</time>
                      <h3 className="mt-1 text-lg font-medium text-slate-800">{item.title}</h3>
                      <p className="mt-1 text-slate-600 font-light">{item.description}</p>
                    </div>
                    
                    {/* 移动端图片展示 */}
                    <div className={`md:hidden mt-4 overflow-hidden transition-all duration-500
                      ${expandedIndex === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="relative h-[200px] w-full rounded-xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 右侧图片展示（桌面端） */}
              <div className="relative hidden md:block">
                <div className="sticky top-32 h-[300px]">
                  {timelineItems.map((item, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 rounded-xl overflow-hidden transition-all duration-500
                        ${expandedIndex === index 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}
                    >
                      <div className="relative w-full h-full group">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h4 className="text-xl font-light text-white">{item.title}</h4>
                          <time className="text-sm text-white/80">{item.date}</time>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 