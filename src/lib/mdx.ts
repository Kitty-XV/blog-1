import rehypePrettyCode from 'rehype-pretty-code'
import { CodeBlock } from '@/components/mdx/CodeBlock'
import { InlineCode } from '@/components/mdx/InlineCode'

interface RehypeNode {
  children: { type: string; value: string }[]
  properties?: {
    className?: string[]
  }
}

const rehypePrettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: true,
  showLineNumbers: true,
  format: true,
  onVisitLine(node: RehypeNode) {
    // 防止空行折叠
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node: RehypeNode) {
    // 添加高亮行的样式
    node.properties?.className?.push('line--highlighted')
  },
  onVisitHighlightedWord(node: RehypeNode) {
    // 添加高亮词的样式
    if (node.properties) {
      node.properties.className = ['word--highlighted']
    }
  },
}

export const mdxOptions = {
  parseFrontmatter: true,
  components: {
    // 隐藏 MDX 内容中的一级标题，因为页面已经显示了标题
    h1: () => null,
    // 使用自定义代码块组件
    pre: CodeBlock,
    // 使用自定义内联代码组件
    code: InlineCode,
  },
  scope: {},
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
    format: 'mdx',
  },
} 