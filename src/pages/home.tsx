import { Component, createResource, Show, Suspense, For } from 'solid-js';
import { A } from '@solidjs/router';
import { getAllPosts } from '../utils/postLoader';
import { formatDate } from '../utils/postLoader';

const Home: Component = () => {
  const [posts] = createResource(getAllPosts);

  return (
    <div class="max-w-6xl mx-auto">
      <section class="text-center mb-16">
        <h1 class="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
          Welcome to My Blog
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
          A minimalist space for sharing thoughts, ideas, and stories about web development, design, and technology.
        </p>
        <A 
          href="/blog" 
          class="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Explore Articles
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </A>
      </section>

      <section class="mb-16">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Latest Posts</h2>
          <A href="/blog" class="text-gray-600 hover:text-gray-900 font-medium">
            View all →
          </A>
        </div>

        <Suspense fallback={<div class="text-center py-12 text-gray-500">Loading posts...</div>}>
          <Show when={posts() && posts()!.length > 0}>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <For each={posts()!.slice(0, 3)}>
                {(post) => (
                  <article class="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-100">
                    <A href={`/blog/${post.slug}`} class="block group">
                      <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                        {post.title}
                      </h3>
                      <time datetime={post.date} class="text-sm text-gray-500 block mb-3">
                        {formatDate(post.date)}
                      </time>
                      <p class="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                      <span class="text-gray-700 font-medium inline-flex items-center gap-2">
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
          </Show>
        </Suspense>
      </section>

      <section class="bg-gray-100 rounded-lg p-8 md:p-12 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
        <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe to get notified about new posts and updates. Join our community of readers interested in web development and technology.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="your@email.com" 
            class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button class="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
