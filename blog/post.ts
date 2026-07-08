import fm from 'front-matter';
import { marked } from 'marked'

const modules = import.meta.glob('./posts/*.md', {
  query: '?raw', import: 'default'
})

const pinnedModules = import.meta.glob('./pinnedposts/*.md', {
    query: '?raw', import: 'default'
  })
  
function slugFromPath(path: string) {
  return path.split('/').pop()!.replace('.md', '')
}

// for TOC
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

function buildTOC(articleEl: Element) {
  const tocEl = document.getElementById('toc-sidebar')
  if (!tocEl) return

  const headings = Array.from(
    articleEl.querySelectorAll('h1, h2, h3, h4, h5, h6')
  ) as HTMLElement[]

  if (headings.length === 0) {
    tocEl.innerHTML = ''
    return
  }

  const usedSlugs = new Set<string>()
  const items = headings.map(h => {
    let slug = slugify(h.textContent || '')
    if (usedSlugs.has(slug)) {
      let i = 2
      while (usedSlugs.has(`${slug}-${i}`)) i++
      slug = `${slug}-${i}`
    }
    usedSlugs.add(slug)
    h.id = slug
    const level = h.tagName.toLowerCase() // h1..h6
    return `<li class="toc-${level}"><a href="#${slug}">${h.textContent}</a></li>`
  }).join('')

  tocEl.innerHTML = `<ul>${items}</ul>`
}

const slug = new URLSearchParams(location.search).get('slug')
const container = document.getElementById('post-container')!

if (!slug) {
  container.innerHTML = 'No post specified. <a href="/blog/">Back</a>'
} else {
  const entry:any = Object.entries(modules)
    .find(([path]) => slugFromPath(path) === slug)

  if (!entry) { // i really hate to nest but the pinning hierarchy is like this and i dont want to change it
    const entryPinned:any = Object.entries(pinnedModules)
        .find(([path]) => slugFromPath(path) === slug)
        if (!entryPinned) {
            container.innerHTML = 'Post not found'
        } else {
            const raw = await entryPinned[1]()
            const { attributes, body } = fm<any>(raw as string)

            container.innerHTML = `
            <div style="position:fixed">
            <a href="/blog/" style="font-size:2rem;">Back</a>
            <br \>
            <small>${formatDate(attributes.pubDate) ?? ''}</small>
            </div>
            <div class="post-content">
                ${marked.parse(body)}
            </div>
            `
        }
  } else {
    const raw = await entry[1]()
    const { attributes, body } = fm<any>(raw as string)

    container.innerHTML = `
      <div style="position:fixed">
      <a href="/blog/" style="font-size:2rem;">Back</a>
      <br \>
      <small>${formatDate(attributes.pubDate) ?? ''}</small>
      </div>

      <div class="post-content">
        ${marked.parse(body)}
      </div>
    `
  }
  const postContent = container.querySelector('.post-content')
  if (postContent) buildTOC(postContent)
}
