import { Component, For } from 'solid-js';
import { A } from '@solidjs/router';
import type { PostMetadata } from '../utils/postLoader';
import { formatDate } from '../utils/postLoader';

interface BlogListProps {
  posts: PostMetadata[];
}

const BlogList: Component<BlogListProps> = (props) => {
  return (
    <div class="grid gap-8">
      <For each={props.posts}>
        {(post) => (
          <article class="bg-white rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-100">
            <A href={`/blog/${post.slug}`} class="block group">
              <h2 class="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                {post.title}
              </h2>
              <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <time datetime={post.date}>{formatDate(post.date)}</time>
                {post.author && (
                  <>
                    <span>•</span>
                    <span>{post.author}</span>
                  </>
                )}
              </div>
              <p class="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              <span class="text-gray-700 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Read more 
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </A>
          </article>
        )}
      </For>
    </div>
  );
};

export default BlogList;
