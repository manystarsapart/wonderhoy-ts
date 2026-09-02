import fm from 'front-matter';
import type { BlogPost } from './types';

const menuContainer = document.getElementById('blog-menu')!;
const blogContainer = document.getElementById('blog-list')!;
// const screenWidth: number = window.innerWidth;


// gets all markdowns in blog/posts
const modules = import.meta.glob('./posts/*.md', {
  query: '?raw', import: 'default'
})

const pinnedModules = import.meta.glob('./pinnedposts/*.md', {
  query: '?raw', import: 'default'
})

// input path/slug.md --> output slug
function slugFromPath(path: string) {
  return path.split('/').pop()!.replace('.md', '')
}

function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-GB', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

let posts: BlogPost[] = []
let pinnedPosts: BlogPost[] = [];
let selectedTags: Set<string> = new Set();

// console.log(posts)
// console.log(modules)

for (const path in modules) {
  const raw = await modules[path]();
  const { attributes, body } = fm<any>(raw as string);
  posts.push({
    slug: slugFromPath(path),
    title: attributes.title,
    pubDate: attributes.pubDate,
    author: attributes.author,
    license: attributes.license,
    description: attributes.description,
    tags: attributes.tags,
    image: attributes.image,
    content: body
  });
 
}

for (const path in pinnedModules) {
  const raw = await pinnedModules[path]();
  const { attributes, body } = fm<any>(raw as string);
  pinnedPosts.push({
    slug: slugFromPath(path),
    title: attributes.title,
    pubDate: attributes.pubDate,
    author: attributes.author,
    license: attributes.license,
    description: attributes.description,
    tags: attributes.tags,
    image: attributes.image,
    content: body
  });
 
}

// console.log(posts)

posts.sort( // default latest first
  (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
);

pinnedPosts.sort( // by order of number in first char of file name. example: 1-README; 2-TOOLS
  (a, b) => Number(String(b.slug).slice(0, 1)) - Number(String(a.slug).slice(0, 1))
)

console.log(pinnedPosts)

function getAllUniqueTags(): string[] {
  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

function renderMenu() {
  const allTags = getAllUniqueTags();
  
  menuContainer.innerHTML = `
    <ul>
      <li><button id="sort-newest">Sort by Date (Newest)</button></li>
      <li><button id="sort-oldest">Sort by Date (Oldest)</button></li>
      <li>
        <strong>Filter by Tags:</strong>
        <ul id="tag-filters">
          ${allTags.map(tag => `
            <li>
              <label>
                <input type="checkbox" class="tag-filter" value="${tag}">
                ${tag}
              </label>
            </li>
          `).join('')}
        </ul>
      </li>
    </ul>
    <a href="https://notbyai.fyi/" target="_blank"><img id="not-by-ai" src="/assets/not-ai.png" style="float:right; scale: 0.8;" alt="Organic content by human, not AI."></a>
  `;
  
  document.getElementById('sort-newest')?.addEventListener('pointerdown', () => {
    
    posts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    renderPosts();
  });
  
  document.getElementById('sort-oldest')?.addEventListener('pointerdown', () => {
    posts.sort((a, b) => new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime());
    renderPosts();
  });
  
  document.querySelectorAll('.tag-filter').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      
      const target = e.target as HTMLInputElement;
      if (target.checked) {
        selectedTags.add(target.value);
      } else {
        selectedTags.delete(target.value);
      }
      renderPosts();
    });
  });
}

function renderPosts() {
  // showLoadingOverlay();

  let filteredPosts = posts;
  
  // console.log("filtered:");
  // console.log(filteredPosts);

  if (selectedTags.size > 0) { // if tags selected
    filteredPosts = posts.filter(post => 
      post.tags?.some(tag => selectedTags.has(tag))
    );
  }
  
  pinnedPosts.forEach(post => filteredPosts = [post, ...filteredPosts]);


  blogContainer.innerHTML = filteredPosts.map(post => `
              <a href="/blog/post.html?slug=${post.slug}">
    <article class="post-card">
      <div class="post-content">
        <h2 style="margin-bottom:-0.2rem">

            ${post.title}

        </h2>
        <span>---</span>
        <p style="margin-top:-0.2rem">
        ${formatDate(post.pubDate)}
        <br \>
        <i>${post.description ?? ''}</i>
        </p>
        ${post.tags ? `
          <ul class="tags"><li>
            ${post.tags.map((t: string) => `${t}`).join(', ')}
          </li></ul>
        ` : ''}
      </div>
      ${post.image ? ` 
        <img
          src="${post.image.url}"
          alt="${post.image.alt ?? post.title}"
          loading="lazy"
          class="post-thumbnail"
        />
      ` : ''}
    </article>
    </a>
  `).join('')

  // console.log(posts);
  // console.log(filteredPosts);

  // setTimeout(() => {
  //   hideLoadingOverlay();
  // }, 50); 
}

renderMenu();
renderPosts();



// =========================================================

// function showLoadingOverlay() {
//   const overlay = document.getElementById('loading-overlay');
//   overlay?.classList.add('active');
// }

// function hideLoadingOverlay() {
//   const overlay = document.getElementById('loading-overlay');
//   overlay?.classList.remove('active');
// }
