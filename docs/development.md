# AI-blog 开发文档

## 项目架构

### 技术栈
- **前端框架**：Next.js 15 (React 19)
- **样式**：Tailwind CSS
- **内容管理**：MDX (Markdown + JSX)
- **状态管理**：React Hooks
- **静态类型**：TypeScript
- **字体**：Inter 和 Noto Sans SC (中文支持)
- **动画**：Framer Motion

### 目录结构

```
├── src/                      # 源代码目录
│   ├── app/                  # Next.js 应用路由
│   │   ├── about/            # 关于页面
│   │   ├── api/              # API 路由
│   │   ├── posts/            # 博文页面
│   │   ├── projects/         # 项目页面
│   │   ├── rss/              # RSS 订阅
│   │   ├── globals.css       # 全局样式
│   │   ├── layout.tsx        # 应用布局组件
│   │   └── page.tsx          # 首页组件
│   ├── components/           # 组件目录
│   │   ├── layout/           # 布局相关组件
│   │   ├── mdx/              # MDX 相关组件
│   │   └── post/             # 文章相关组件
│   ├── lib/                  # 实用工具和辅助函数
│   │   ├── config/           # 配置文件
│   │   ├── mdx.ts            # MDX 处理逻辑
│   │   ├── posts.ts          # 博文处理逻辑
│   │   ├── rss.ts            # RSS 生成逻辑
│   │   ├── storage.ts        # 存储相关功能
│   │   └── utils.ts          # 通用工具函数
│   └── types/                # TypeScript 类型定义
│       ├── common.ts         # 通用类型
│       ├── post.ts           # 博文相关类型
│       └── project.ts        # 项目相关类型
├── content/                  # 内容目录
│   ├── posts/                # 博文内容 (MDX格式)
│   └── projects/             # 项目内容
├── public/                   # 静态资源
└── docs/                     # 文档
```

## 核心功能模块

### 内容管理
- **文件位置**: `src/lib/posts.ts`, `src/lib/mdx.ts`
- **功能描述**: 处理 MDX 文件的读取、解析和渲染
- **主要函数**:
  - `getAllPosts()`: 获取所有文章列表
  - `getPostBySlug()`: 获取单篇文章详情
  - `getAllCategories()`: 获取所有分类
  - `getAllTags()`: 获取所有标签

### 页面路由
- **文件位置**: `src/app/*`
- **功能描述**: 定义网站的页面路由和视图
- **主要页面**:
  - 首页: `src/app/page.tsx`
  - 文章列表: `src/app/posts/page.tsx`
  - 文章详情: `src/app/posts/[slug]/page.tsx`
  - 项目列表: `src/app/projects/page.tsx`

### 组件系统
- **文件位置**: `src/components/*`
- **功能描述**: 可复用的 UI 组件
- **主要组件**:
  - 导航栏: `src/components/layout/Navbar.tsx`
  - 页脚: `src/components/layout/Footer.tsx`
  - MDX 组件: `src/components/mdx/*`

### RSS 订阅
- **文件位置**: `src/lib/rss.ts`, `src/app/rss/route.ts`
- **功能描述**: 生成 RSS 订阅源

## 开发指南

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

### 添加新文章

1. 在 `content/posts` 目录下创建新的 `.mdx` 文件
2. 你可以复制 `content/posts/_template.mdx` 作为起点
3. 添加 Front Matter 元数据:

```mdx
---
title: "文章标题"
date: "2023-01-01"
excerpt: "文章摘要"
category: "分类"
tags: ["标签1", "标签2"]
author:
  name: "作者名"
  avatar: "/images/avatar.jpg"
readingTime: 5
---

文章内容...
```

### 添加新项目

1. 在 `content/projects` 目录下创建新的 `.mdx` 文件
2. 你可以复制 `content/projects/_template.mdx` 作为起点
3. 添加 Front Matter 元数据:

```mdx
---
title: "项目标题"
date: "2023-01-01"
excerpt: "项目摘要"
coverImage: "/images/projects/cover.jpg"
technologies: ["技术1", "技术2"]
githubUrl: "https://github.com/username/project"
demoUrl: "https://demo.example.com"
---

项目描述...
```

### 样式开发

项目使用 Tailwind CSS 进行样式开发。全局样式定义在 `src/app/globals.css` 中。

### 类型定义

所有类型定义位于 `src/types` 目录下:

- `post.ts`: 博文相关类型
- `project.ts`: 项目相关类型
- `common.ts`: 通用类型

### 构建生产版本

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 运行生产版本

```bash
npm run start
# 或
yarn start
# 或
pnpm start
```

## 贡献指南

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 代码规范

- 使用 ESLint 和 Prettier 保持代码风格一致
- 组件使用 PascalCase 命名
- 工具函数使用 camelCase 命名
- 添加 JSDoc 注释说明函数用途

## 测试

待添加测试指南。

## 部署

本项目可以部署到 Vercel、Netlify 等支持 Next.js 的平台。详细部署指南请参考 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying)。 