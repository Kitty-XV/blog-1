export interface Project {
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