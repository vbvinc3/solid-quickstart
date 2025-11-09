import { Component, Show } from 'solid-js';
import { A } from '@solidjs/router';
import DOMPurify from 'dompurify';
import type { Post } from '../utils/postLoader';
import { formatDate } from '../utils/postLoader';

interface BlogPostProps {
  post: Post;
}

const BlogPost: Component<BlogPostProps> = (props) => {
  const sanitizedContent = () => {
    return DOMPurify.sanitize(props.post.content, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'strong', 'em', 'u', 'strike', 'b', 'i',
        'ul', 'ol', 'li',
        'a', 'img',
        'blockquote', 'pre', 'code',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'div', 'span', 'article', 'section',
        'figure', 'figcaption'
      ],
      ALLOWED_ATTR: [
        'href', 'src', 'alt', 'title', 'class', 'id',
        'width', 'height', 'style', 'target', 'rel'
      ]
    });
  };

  return (
    <article class="bg-white">
      <div class="mb-8 pb-8 border-b border-gray-200">
        <A 
          href="/blog" 
          class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </A>
        
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {props.post.title}
        </h1>
        
        <div class="flex items-center gap-4 text-gray-600">
          <time datetime={props.post.date}>{formatDate(props.post.date)}</time>
          <Show when={props.post.author}>
            <>
              <span>•</span>
              <span>By {props.post.author}</span>
            </>
          </Show>
        </div>
      </div>

      <div 
        class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-gray-900 prose-a:underline prose-strong:text-gray-900 prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
        innerHTML={sanitizedContent()}
      />
    </article>
  );
};

export default BlogPost;
