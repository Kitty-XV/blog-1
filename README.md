<h1 align="center">AI-blog-1</h1>



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

![博客logo](/public/images/milestones/logo.png)

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

更详细的[开发文档](docs/development.md)，包含:

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
