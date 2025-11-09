import { Component, createResource, Show, Suspense } from 'solid-js';
import { useParams, useNavigate } from '@solidjs/router';
import BlogPost from '../components/BlogPost';
import { getPostBySlug } from '../utils/postLoader';

const PostPage: Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post] = createResource(() => params.slug, getPostBySlug);

  return (
    <div class="max-w-4xl mx-auto">
      <Suspense fallback={<div class="text-center py-12 text-gray-500">Loading post...</div>}>
        <Show 
          when={post()} 
          fallback={
            <div class="text-center py-12">
              <h1 class="text-3xl font-bold text-gray-900 mb-4">Post not found</h1>
              <p class="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
              <button
                onClick={() => navigate('/blog')}
                class="text-gray-700 hover:text-gray-900 underline"
              >
                Back to Blog
              </button>
            </div>
          }
        >
          {(postData) => <BlogPost post={postData()} />}
        </Show>
      </Suspense>
    </div>
  );
};

export default PostPage;
