import { Component, createResource, Show, Suspense } from 'solid-js';
import BlogList from '../components/BlogList';
import { getAllPosts } from '../utils/postLoader';

const Blog: Component = () => {
  const [posts] = createResource(getAllPosts);

  return (
    <div class="max-w-4xl mx-auto">
      <div class="mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Blog</h1>
        <p class="text-xl text-gray-600">
          Thoughts, stories, and ideas
        </p>
      </div>

      <Suspense fallback={<div class="text-center py-12 text-gray-500">Loading posts...</div>}>
        <Show when={posts()} fallback={<div class="text-center py-12 text-gray-500">No posts found</div>}>
          {(postsList) => <BlogList posts={postsList()} />}
        </Show>
      </Suspense>
    </div>
  );
};

export default Blog;
