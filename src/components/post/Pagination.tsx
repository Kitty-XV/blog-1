'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

type PageItem = number | '...'

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // 显示当前页码附近的页码
  const getVisiblePages = () => {
    const delta = 1; // 当前页前后显示的页码数
    const rangeWithDots: PageItem[] = [];

    // 始终显示第一页
    rangeWithDots.push(1);

    // 计算显示范围
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    // 添加省略号和中间页码
    if (start > 2) {
      rangeWithDots.push('...');
    }

    // 添加中间的页码
    for (let i = start; i <= end; i++) {
      rangeWithDots.push(i);
    }

    // 添加最后的省略号和最后一页
    if (end < totalPages - 1) {
      rangeWithDots.push('...');
    }
    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-8 flex items-center justify-center gap-2"
    >
      {/* 首页按钮 */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="group relative rounded-lg p-2 transition-all hover:bg-purple-50/30 dark:hover:bg-purple-900/20 disabled:opacity-50 backdrop-blur-sm"
        aria-label="首页"
      >
        <ChevronsLeft className="h-4 w-4 text-purple-600/70 dark:text-purple-300/70 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* 上一页按钮 */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="group relative rounded-lg p-2 transition-all hover:bg-purple-50/30 dark:hover:bg-purple-900/20 disabled:opacity-50 backdrop-blur-sm"
        aria-label="上一页"
      >
        <ChevronLeft className="h-4 w-4 text-purple-600/70 dark:text-purple-300/70 transition-transform group-hover:-translate-x-0.5" />
      </button>

      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === currentPage || page === '...'}
            className={cn(
              'min-w-[2rem] rounded-md px-3 py-1.5 text-sm font-medium transition-all',
              page === currentPage
                ? 'bg-purple-100/70 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100 shadow-sm backdrop-blur-sm before:absolute before:inset-0 before:rounded-lg before:ring-1 before:ring-purple-500/20 dark:before:ring-purple-300/10 before:transition-all after:absolute after:inset-0 after:rounded-lg after:ring-2 after:ring-purple-500/10 dark:after:ring-purple-300/5 after:transition-all hover:before:ring-purple-500/30 dark:hover:before:ring-purple-300/20 hover:after:ring-purple-500/20 dark:hover:after:ring-purple-300/10'
                : page === '...'
                ? 'cursor-default text-purple-400 dark:text-purple-500'
                : 'text-purple-700/70 dark:text-purple-300/70 hover:bg-purple-50/30 dark:hover:bg-purple-900/20 backdrop-blur-sm hover:text-purple-900 dark:hover:text-purple-100'
            )}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 下一页按钮 */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="group relative rounded-lg p-2 transition-all hover:bg-purple-50/30 dark:hover:bg-purple-900/20 disabled:opacity-50 backdrop-blur-sm"
        aria-label="下一页"
      >
        <ChevronRight className="h-4 w-4 text-purple-600/70 dark:text-purple-300/70 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* 末页按钮 */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="group relative rounded-lg p-2 transition-all hover:bg-purple-50/30 dark:hover:bg-purple-900/20 disabled:opacity-50 backdrop-blur-sm"
        aria-label="末页"
      >
        <ChevronsRight className="h-4 w-4 text-purple-600/70 dark:text-purple-300/70 transition-transform group-hover:translate-x-0.5" />
      </button>
    </motion.div>
  )
} 