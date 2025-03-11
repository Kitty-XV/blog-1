import { Feed } from 'feed'
import { getAllPosts, getPostBySlug } from './posts'
import { marked } from 'marked'

export async function generateRssFeed() {
  const posts = await getAllPosts()
  const siteURL = 'https://blog.kitty15.top'
  const date = new Date()
  
  const author = {
    name: "Renne",
    email: "zhzh02190775@gmail.com",
    link: "https://github.com/Kitty-XV"
  }

  // 创建 feed
  const feed = new Feed({
    title: "Renne's blog",
    description: "Welcome to my tea party",
    id: siteURL,
    link: siteURL,
    language: "zh-CN",
    image: `${siteURL}/images/avatar/avatar.jpg`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Renne`,
    updated: date,
    generator: "Next.js using Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author
  })

  // 添加文章到 feed
  for (const post of posts) {
    const url = `${siteURL}/posts/${post.slug}`
    
    // 获取完整的文章内容
    const fullPost = await getPostBySlug(post.slug)
    
    // 将MDX内容转换为HTML
    const htmlContent = await marked(fullPost.content)
    
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: htmlContent,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
      // 添加分类信息
      category: post.tags.map(tag => ({
        name: tag,
        term: tag,
      })),
    })
  }

  return {
    rss2: feed.rss2(),
    atom: feed.atom1(),
    json: feed.json1()
  }
} 