import fm from 'front-matter';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  })
);



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
            document.title = `${attributes.title} | Blog Post`;
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
    document.title = `${attributes.title} | Blog Post`;
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
  if (postContent) {
    buildTOC(postContent);
    formatCode(postContent);
    formatImages(postContent);
  };

}

function formatCode(root: Element) {
  const blocks = root.querySelectorAll('pre > code');

  blocks.forEach(code => {
    const pre = code.parentElement!;
    
    // if already formatted
    if (pre.parentElement?.classList.contains('code-blocks')) return;

    const langClass = Array.from(code.classList).find(c => c.startsWith('language-'));
    const lang = langClass ? langClass.replace('language-', '') : '';

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';

    pre.replaceWith(wrapper);
    wrapper.appendChild(pre);

    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';
    toolbar.innerHTML = `
      <button class="code-copy-btn" type="button">Copy</button>
      ${lang && lang !== 'plaintext' ? `<span class="code-lang-label">${lang}</span>` : ''}
    `;
    wrapper.appendChild(toolbar);
  });
}

function formatImages(root: Element) {
  const imgs = root.querySelectorAll('img[title]');

  imgs.forEach(img => {
    const caption = img.getAttribute('title');
    if (!caption) return;
    if (img.parentElement?.tagName === 'FIGURE') return; // already wrapped

    const figure = document.createElement('figure');
    figure.className = 'post-figure';

    img.replaceWith(figure);
    figure.appendChild(img);

    const figCaption = document.createElement('figcaption');
    figCaption.textContent = caption;
    // alert(figCaption.innerHTML);
    figure.appendChild(figCaption);

    img.removeAttribute('title'); // avoid duplicate native tooltip on hover
  });
}

// event delegation — bind once, works for every post you load afterward
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest('.code-copy-btn') as HTMLButtonElement | null;
  if (!btn) return;

  const codeEl = btn.closest('.code-block')?.querySelector('pre > code');
  if (!codeEl) return;

  navigator.clipboard.writeText(codeEl.textContent ?? '').then(() => {
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 1200);
  });
});


