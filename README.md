<h1 align="center">AI-blog-1</h1>
<h3 align="center">开源个人博客系统 1</h3>

<p align="center">
  <b>一个高性能、美观的个人博客平台</b><br>
  基于 Next.js 15 和 MDX 构建，支持丰富的交互体验
</p>

<p align="center">
  <a href="#特性">特性</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#使用指南">使用指南</a> •
  <a href="#自定义">自定义</a> •
  <a href="#开发文档">开发文档</a> •
  <a href="#贡献">贡献</a> •
  <a href="#许可证">许可证</a>
</p>

<hr />

## 特性

✨ **现代设计**：简约而优雅的用户界面，专注于内容展示  
📱 **响应式布局**：完美适配从手机到桌面的各种设备  
🚀 **高性能**：基于 Next.js 15 构建，支持服务器组件和流式渲染  
📝 **MDX 支持**：在 Markdown 中使用 React 组件  
🌙 **暗色模式**：支持亮/暗主题切换  
🔍 **SEO 友好**：优化的元标签和结构化数据  
📊 **分析集成**：集成常用分析工具（可选）  
📰 **RSS 订阅**：自动生成 RSS 订阅源  
⚡ **静态生成**：快速加载和出色的性能表现  
🌐 **国际化支持**：多语言支持  
🔄 **增量静态再生成**：内容更新时自动重新生成页面  

## 快速开始

### 前提条件

- Node.js 18.x 或更高版本
- npm、yarn 或 pnpm

### 安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/AI-blog.git
cd AI-blog

# 安装依赖
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发

```bash
# 启动开发服务器
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 http://localhost:3000 查看您的网站。

### 构建和部署

```bash
# 构建生产版本
npm run build
# 或
yarn build
# 或
pnpm build

# 启动生产服务器
npm run start
# 或
yarn start
# 或
pnpm start
```

## 使用指南

### 添加文章

1. 在 `content/posts` 目录下创建一个 `.mdx` 文件
2. 可以直接复制 `content/posts/_template.mdx` 模板文件并修改
3. 添加 front matter 元数据:

```mdx
---
title: "我的文章标题"
date: "2024-03-20"
excerpt: "这是文章的摘要，会显示在文章列表中"
category: "技术"
tags: ["Next.js", "React", "Web开发"]
author:
  name: "作者名称"
  avatar: "/images/avatars/author.jpg"
readingTime: 5
---

这里是文章的正文内容...
```

4. 编写您的 Markdown 内容
5. 保存文件后，文章将自动出现在您的博客中

### 添加项目

1. 在 `content/projects` 目录下创建一个 `.mdx` 文件
2. 可以直接复制 `content/projects/_template.mdx` 模板文件并修改
3. 添加 front matter 元数据:

```mdx
---
title: "项目标题"
date: "2024-03-20"
excerpt: "项目摘要"
coverImage: "/images/projects/cover.jpg"
technologies: ["Next.js", "React", "TypeScript"]
githubUrl: "https://github.com/username/project"
demoUrl: "https://demo.example.com"
---

项目详细描述...
```

## 自定义

### 主题和样式

- 全局样式定义在 `src/app/globals.css` 中
- Tailwind 配置在 `tailwind.config.ts` 中

### 网站元数据

编辑 `src/app/layout.tsx` 中的 `metadata` 对象来自定义网站的元数据:

```typescript
export const metadata: Metadata = {
  title: "网站标题",
  description: "网站描述",
  // 其他元数据...
};
```

### 自定义组件

- 布局组件位于 `src/components/layout` 目录
- MDX 组件位于 `src/components/mdx` 目录
- 文章相关组件位于 `src/components/post` 目录

## 开发文档

更详细的开发文档可以在 [docs/development.md](docs/development.md) 中找到，包含:

- 项目架构详解
- 核心模块说明
- 开发指南
- 贡献指南
- 代码规范
- 部署方法

## 贡献

我们欢迎任何形式的贡献！请参阅 [贡献指南](docs/development.md#贡献指南) 了解如何参与项目开发。

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。
