# 个人博客系统设计文档

## 1. 项目概述
想要开发一个现代化的个人博客，采用简约，现代而优雅但高级的设计风格，使用一些高级的效果和动画，注重用户体验和阅读体验，专注于内容创作和展示。

## 2. 系统架构

### 2.1 技术栈

#### 前端
- **框架**: Next.js 14
- **UI 框架**: Tailwind CSS
- **状态管理**: React Query
- **动画效果**: Framer Motion
- **编辑器**: MDX

#### 后端
- **框架**: Node.js + Express.js
- **数据库**: MongoDB
- **搜索引擎**: Elasticsearch
- **缓存**: Redis
- **对象存储**: AWS S3/阿里云 OSS

#### 部署
- **容器化**: Docker
- **CI/CD**: GitHub Actions
- **服务器**: 云服务器
- **CDN**: Cloudflare

## 3. 功能模块

### 3.1 博客核心功能
- **文章管理**
  - 博客阅读
  - 文章分类和标签管理
  
- **搜索功能**
  - 全文搜索
  - 按标签搜索
  - 按分类搜索
  
- **其他功能**
  - 文章阅读量统计
  - 文章分享
  - RSS 订阅
  - 站点地图

### 3.2 项目展示功能

#### 项目列表页面功能
- 项目卡片网格展示
- 分类筛选功能
  - 按技术栈筛选
  - 按项目类型筛选
  - 按完成状态筛选
- 搜索和排序
- 列表/网格视图切换
- 无限滚动加载

#### 项目详情页面功能
- 项目概览
  - 封面图展示
  - 项目标题和简介
  - 技术栈标签
  - 项目时间线
- 项目内容展示
- 相关链接
- 项目进展时间线
- 相关项目推荐

## 4. 页面结构

### 4.1 主要页面
- **首页（Home）**
  - 文章预览列表
  - 置顶文章展示
  - 个人简介卡片
  - 分类导航

  

- **博客详情页（Post）**
  - 博客列表
  - 搜索功能

- **文章详情页（Post）**
  - 文章完整内容
  - 目录导航
  - 相关文章推荐
  
- **项目展示页（Projects）**
  - 项目列表/网格视图
  - 项目详情展示
  - 项目筛选和搜索
  
- **分类和标签页**
  - 文章分类展示
  - 标签云
  - 统计信息
  
- **关于页（About）**
  - 个人介绍
  - 联系方式
  - 项目经历

## 5. 数据结构

### 5.1 项目信息结构
```typescript
interface Project {
  id: string;
  slug: string;                 // URL 友好的项目标识
  title: string;               // 项目名称
  description: string;         // 项目简介
  coverImage: string;          // 封面图片
  technologies: string[];      // 使用的技术栈
  demoUrl?: string;           // 演示地址
  githubUrl?: string;         // GitHub 仓库地址
  startDate: Date;            // 开始时间
  endDate?: Date;            // 结束时间（可选）
  highlights: string[];       // 项目亮点
  category: string;          // 项目分类
  status: 'completed' | 'in-progress' | 'planned';
  screenshots: {
    url: string;
    caption: string;
  }[];
  role: string;             // 担任角色
  responsibilities: string[]; // 主要职责
}
```

## 6. 目录结构
```
blog/
├── src/                      # 源代码目录
│   ├── app/                  # Next.js 13+ App Router
│   │   ├── (auth)/          # 认证相关路由
│   │   ├── (main)/          # 主要路由组
│   │   │   ├── page.tsx     # 首页
│   │   │   ├── posts/       # 文章相关页面
│   │   │   ├── projects/    # 项目相关页面
│   │   │   ├── categories/  # 分类页面
│   │   │   ├── tags/        # 标签页面
│   │   │   └── about/       # 关于页面
│   │   ├── api/             # API 路由
│   │   ├── layout.tsx       # 根布局
│   │   └── providers.tsx    # 全局 Provider
│   │
│   ├── components/          # 可复用组件
│   │   ├── ui/             # 基础 UI 组件
│   │   ├── common/         # 通用业务组件
│   │   ├── posts/          # 文章相关组件
│   │   ├── projects/       # 项目相关组件
│   │   └── layout/         # 布局组件
│   │
│   ├── lib/                # 工具库
│   │   ├── utils/         # 通用工具函数
│   │   ├── hooks/         # 自定义 Hooks
│   │   ├── config/        # 配置文件
│   │   └── api/           # API 请求封装
│   │
│   ├── styles/            # 样式文件
│   │   ├── globals.css    # 全局样式
│   │   └── themes/        # 主题相关样式
│   │
│   └── types/             # TypeScript 类型定义
│       ├── post.ts
│       ├── project.ts
│       └── common.ts
│
├── content/               # 内容目录
│   ├── posts/            # 文章 MDX 文件
│   │   └── assets/       # 文章资源文件
│   ├── projects/         # 项目展示内容
│   └── authors/          # 作者信息
│
├── public/               # 静态资源
│   ├── images/          # 图片资源
│   ├── fonts/           # 字体文件
│   └── icons/           # 图标资源
│
├── scripts/             # 构建脚本和工具
├── tests/              # 测试文件
├── docs/               # 文档
└── .env.example        # 环境变量示例
```

## 7. 设计风格

### 7.1 视觉设计
- **配色方案**
  - 主色调：深蓝色 (#1a365d)
  - 辅助色：浅灰色 (#f7fafc)
  - 强调色：金色 (#d4af37)
  
- **字体选择**
  - 中文：思源黑体
  - 英文：Inter
  - 代码：JetBrains Mono
  
- **布局设计**
  - 响应式网格布局
  - 留白充足
  - 模块化设计

### 7.2 交互设计
- 平滑的页面过渡动画
- 无限滚动加载
- 返回顶部按钮
- 暗黑模式支持
- 阅读进度指示器

## 8. 性能优化
- 图片懒加载
- 代码分割
- 静态页面生成（SSG）
- 资源预加载
- 缓存策略优化

## 9. SEO 优化
- Meta 标签优化
- 结构化数据
- 站点地图
- 移动端适配
- URL 优化

## 10. 安全性考虑
- HTTPS 加密
- XSS 防护
- SQL 注入防护
- 敏感信息加密

## 11. 开发规范

### 11.1 命名规范
- 文件夹：全部小写，连字符连接
- React 组件：PascalCase
- 工具函数：camelCase
- 样式文件：kebab-case


## 12. 开发流程
1. 环境搭建
2. 基础框架开发
3. 核心功能实现
4. UI/UX 优化
5. 测试与调试
6. 部署上线
7. 维护更新 