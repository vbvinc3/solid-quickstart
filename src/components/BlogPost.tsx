import { Component, Show, onMount } from 'solid-js';
import { A } from '@solidjs/router';
import type { Post } from '../utils/postLoader';
import { formatDate } from '../utils/postLoader';

interface BlogPostProps {
  post: Post;
}

const BlogPost: Component<BlogPostProps> = (props) => {
  let iframeRef: HTMLIFrameElement | undefined;

  const adjustIframeHeight = () => {
    if (!iframeRef || !iframeRef.contentWindow) return;
    
    try {
      const iframeDocument = iframeRef.contentWindow.document;
      const height = iframeDocument.documentElement.scrollHeight;
      iframeRef.style.height = height + 'px';
    } catch (error) {
      console.error('Error adjusting iframe height:', error);
    }
  };

  onMount(() => {
    if (iframeRef) {
      iframeRef.addEventListener('load', adjustIframeHeight);
      
      const resizeObserver = new ResizeObserver(() => {
        adjustIframeHeight();
      });
      
      if (iframeRef.contentWindow?.document.body) {
        resizeObserver.observe(iframeRef.contentWindow.document.body);
      }
    }
  });

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

      <iframe
        ref={iframeRef}
        src={`/posts/${props.post.slug}.html`}
        title={props.post.title}
        class="w-full border-0 min-h-[500px]"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        style="display: block;"
      />
    </article>
  );
};

export default BlogPost;
