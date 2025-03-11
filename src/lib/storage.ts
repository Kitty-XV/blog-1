import fs from 'fs'
import path from 'path'

const STORAGE_DIR = path.join(process.cwd(), '.local')
const VIEWS_FILE = path.join(STORAGE_DIR, 'views.json')

// 确保存储目录存在
function ensureStorageDir() {
  try {
    if (!fs.existsSync(STORAGE_DIR)) {
      console.log(`Creating storage directory: ${STORAGE_DIR}`)
      fs.mkdirSync(STORAGE_DIR, { recursive: true })
    }
    // 测试目录是否可写
    const testFile = path.join(STORAGE_DIR, '.test')
    fs.writeFileSync(testFile, 'test')
    fs.unlinkSync(testFile)
    console.log('Storage directory is writable')
  } catch (error) {
    console.error('Error ensuring storage directory:', error)
    throw error
  }
}

// 读取本地存储的阅读量数据
export function loadLocalViews(): Record<string, number> {
  try {
    ensureStorageDir()
    console.log('Current working directory:', process.cwd())
    console.log('Views file path:', VIEWS_FILE)
    
    if (fs.existsSync(VIEWS_FILE)) {
      console.log(`Reading views from: ${VIEWS_FILE}`)
      const data = fs.readFileSync(VIEWS_FILE, 'utf-8')
      try {
        const views = JSON.parse(data)
        console.log('Current views:', views)
        return views
      } catch (parseError) {
        console.error('Error parsing views file:', parseError)
        // 如果文件损坏，创建新的
        const newViews = {}
        saveLocalViews(newViews)
        return newViews
      }
    } else {
      console.log(`Views file does not exist: ${VIEWS_FILE}`)
      // 创建空的视图文件
      const newViews = {}
      saveLocalViews(newViews)
      return newViews
    }
  } catch (error) {
    console.error('Error loading local views:', error)
    return {}
  }
}

// 保存阅读量数据到本地存储
export function saveLocalViews(views: Record<string, number>) {
  try {
    ensureStorageDir()
    console.log(`Saving views to: ${VIEWS_FILE}`, views)
    const data = JSON.stringify(views, null, 2)
    
    // 先写入临时文件
    const tempFile = `${VIEWS_FILE}.tmp`
    fs.writeFileSync(tempFile, data, 'utf-8')
    
    // 然后重命名，这样更安全
    fs.renameSync(tempFile, VIEWS_FILE)
    
    console.log('Views saved successfully')
    // 验证保存是否成功
    const savedData = fs.readFileSync(VIEWS_FILE, 'utf-8')
    const savedViews = JSON.parse(savedData)
    console.log('Verified saved views:', savedViews)
  } catch (error) {
    console.error('Error saving local views:', error)
    throw error
  }
}

// 更新特定文章的阅读量
export function updateLocalViews(slug: string): number {
  console.log(`Updating views for slug: ${slug}`)
  try {
    const views = loadLocalViews()
    // 每次增加 0.5，这样两次调用实际只会增加一次
    views[slug] = Math.round((views[slug] || 0) + 0.5)
    console.log(`New view count for ${slug}:`, views[slug])
    saveLocalViews(views)
    return views[slug]
  } catch (error) {
    console.error(`Error updating views for ${slug}:`, error)
    throw error
  }
}

// 获取特定文章的阅读量
export function getLocalViews(slug: string): number {
  console.log(`Getting views for slug: ${slug}`)
  try {
    const views = loadLocalViews()
    const count = views[slug] || 0
    console.log(`View count for ${slug}:`, count)
    return count
  } catch (error) {
    console.error(`Error getting views for ${slug}:`, error)
    return 0
  }
}

// 批量获取文章阅读量
export function getBatchLocalViews(slugs: string[]): Record<string, number> {
  console.log(`Getting batch views for slugs:`, slugs)
  try {
    const views = loadLocalViews()
    const result = slugs.reduce((acc, slug) => {
      acc[slug] = views[slug] || 0
      return acc
    }, {} as Record<string, number>)
    console.log('Batch views result:', result)
    return result
  } catch (error) {
    console.error('Error getting batch views:', error)
    return {}
  }
}

// 获取所有阅读量统计
export function getLocalViewStats() {
  console.log('Getting view stats')
  try {
    const views = loadLocalViews()
    const viewCounts = Object.values(views)
    
    const stats = {
      totalViews: viewCounts.reduce((sum, count) => sum + count, 0),
      averageViews: Math.round(
        viewCounts.reduce((sum, count) => sum + count, 0) / 
        Math.max(viewCounts.length, 1)
      ),
      topPosts: Object.entries(views)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([slug, count]) => ({ slug, count }))
    }
    
    console.log('View stats:', stats)
    return stats
  } catch (error) {
    console.error('Error getting view stats:', error)
    return {
      totalViews: 0,
      averageViews: 0,
      topPosts: []
    }
  }
}

// 获取文章的点赞数
export function getLocalLikes(slug: string): number {
  console.log(`Getting likes for slug: ${slug}`)
  try {
    const likes = loadLocalLikes()
    const count = likes[slug] || 0
    console.log(`Like count for ${slug}:`, count)
    return count
  } catch (error) {
    console.error(`Error getting likes for ${slug}:`, error)
    return 0
  }
}

// 更新文章的点赞数
export function updateLocalLikes(slug: string, increment: boolean): number {
  console.log(`Updating likes for slug: ${slug}, increment: ${increment}`)
  try {
    const likes = loadLocalLikes()
    likes[slug] = (likes[slug] || 0) + (increment ? 1 : -1)
    if (likes[slug] < 0) likes[slug] = 0
    console.log(`New like count for ${slug}:`, likes[slug])
    saveLocalLikes(likes)
    return likes[slug]
  } catch (error) {
    console.error(`Error updating likes for ${slug}:`, error)
    throw error
  }
}

// 读取本地存储的点赞数据
function loadLocalLikes(): Record<string, number> {
  try {
    ensureStorageDir()
    const likesFile = path.join(STORAGE_DIR, 'likes.json')
    
    if (fs.existsSync(likesFile)) {
      const data = fs.readFileSync(likesFile, 'utf-8')
      try {
        const likes = JSON.parse(data)
        return likes
      } catch (parseError) {
        console.error('Error parsing likes file:', parseError)
        const newLikes = {}
        saveLocalLikes(newLikes)
        return newLikes
      }
    } else {
      const newLikes = {}
      saveLocalLikes(newLikes)
      return newLikes
    }
  } catch (error) {
    console.error('Error loading local likes:', error)
    return {}
  }
}

// 保存点赞数据到本地存储
function saveLocalLikes(likes: Record<string, number>) {
  try {
    ensureStorageDir()
    const likesFile = path.join(STORAGE_DIR, 'likes.json')
    const data = JSON.stringify(likes, null, 2)
    
    const tempFile = `${likesFile}.tmp`
    fs.writeFileSync(tempFile, data, 'utf-8')
    fs.renameSync(tempFile, likesFile)
  } catch (error) {
    console.error('Error saving local likes:', error)
    throw error
  }
} 