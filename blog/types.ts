export interface BlogPost {
    slug: string // auto gen
    title: string
    pubDate: string
    author: string
    license: string

    description?: string
    tags?: string[]

    image?: {
      url: string
      alt?: string
    }
    content: string // md
  }
  