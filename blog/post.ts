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
function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

const slug = new URLSearchParams(location.search).get('slug')
const container = document.getElementById('post-container')!

if (!slug) {
  container.innerHTML = 'No post specified'
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
            <a href="/blog/" style="font-size:2rem;">Back</a>
            <br \>
            <small>${formatDate(attributes.pubDate) ?? ''}</small>

            <div class="post-content">
                ${marked.parse(body)}
            </div>
            `
        }
  } else {
    const raw = await entry[1]()
    const { attributes, body } = fm<any>(raw as string)

    container.innerHTML = `
      <a href="/blog/" style="font-size:2rem;">Back</a>
      <br \>
      <small>${formatDate(attributes.pubDate) ?? ''}</small>

      <div class="post-content">
        ${marked.parse(body)}
      </div>
    `
  }
}
