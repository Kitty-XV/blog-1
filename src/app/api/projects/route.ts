import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface ProjectData {
  id: number
  slug: string
  date: string
  title: string
  description: string
  category: string
  tech: string[]
  coverImage: string
  link: string
  github: string
  image: string
}

// 获取所有项目数据
async function getProjects(): Promise<ProjectData[]> {
  try {
    const projectsDirectory = path.join(process.cwd(), 'content/projects')
    
    if (!fs.existsSync(projectsDirectory)) {
      console.error(`Directory not found: ${projectsDirectory}`)
      return []
    }
    
    const files = fs.readdirSync(projectsDirectory)
    console.log('Found project files:', files)
    
    const projects = files
      .filter(file => file.endsWith('.mdx'))
      .map((file, index) => {
        try {
          const fullPath = path.join(projectsDirectory, file)
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          const { data } = matter(fileContents)
          const slug = file.replace(/\.mdx$/, '')
          
          const project: ProjectData = {
            id: index + 1,
            slug,
            title: data.title,
            description: data.description,
            date: data.date,
            category: data.category,
            tech: data.tech,
            coverImage: data.coverImage,
            link: data.link,
            github: data.github,
            image: data.coverImage
          }
          
          return project
        } catch (error) {
          console.error(`Error processing file ${file}:`, error)
          return null
        }
      })
      .filter((project): project is ProjectData => project !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return projects
  } catch (error) {
    console.error('Error in getProjects:', error)
    throw error
  }
}

export async function GET() {
  try {
    const projects = await getProjects()
    console.log('Returning projects:', projects.map(p => p.slug))
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error in GET handler:', error)
    return NextResponse.json(
      { error: '获取项目列表失败' },
      { status: 500 }
    )
  }
} 