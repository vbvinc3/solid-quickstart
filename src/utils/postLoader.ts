export interface PostMetadata {
  title: string;
  date: string;
  author?: string;
  slug: string;
  excerpt: string;
}

export interface Post extends PostMetadata {
  content: string;
}

const postModules = import.meta.glob('/public/posts/*.html', { 
  query: '?raw', 
  import: 'default' 
});

function extractMetadata(html: string, filename: string): PostMetadata {
  const slug = filename.replace('.html', '').toLowerCase().replace(/\s+/g, '-');
  
  const metadataMatch = html.match(/<!--\s*metadata:(.*?)-->/s);
  let title = '';
  let date = '';
  let author = '';
  
  if (metadataMatch) {
    const metadataContent = metadataMatch[1];
    const titleMatch = metadataContent.match(/title:\s*([^\n,]+)/);
    const dateMatch = metadataContent.match(/date:\s*([^\n,]+)/);
    const authorMatch = metadataContent.match(/author:\s*([^\n,]+)/);
    
    if (titleMatch) title = titleMatch[1].trim();
    if (dateMatch) date = dateMatch[1].trim();
    if (authorMatch) author = authorMatch[1].trim();
  }
  
  if (!title) {
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    title = h1Match ? h1Match[1].replace(/<[^>]*>/g, '') : filename.replace('.html', '');
  }
  
  if (!date) {
    date = new Date().toISOString().split('T')[0];
  }
  
  const textContent = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
  
  return {
    title: title.trim(),
    date: date.trim(),
    author: author.trim() || undefined,
    slug,
    excerpt
  };
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  const posts: PostMetadata[] = [];
  
  for (const path in postModules) {
    const filename = path.split('/').pop() || '';
    const content = await postModules[path]() as string;
    const metadata = extractMetadata(content, filename);
    posts.push(metadata);
  }
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  for (const path in postModules) {
    const filename = path.split('/').pop() || '';
    const postSlug = filename.replace('.html', '').toLowerCase().replace(/\s+/g, '-');
    
    if (postSlug === slug) {
      const content = await postModules[path]() as string;
      const metadata = extractMetadata(content, filename);
      return {
        ...metadata,
        content
      };
    }
  }
  
  return null;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
