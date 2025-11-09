import { Component, createSignal, For, Show, onMount } from 'solid-js';
import { A } from '@solidjs/router';
import Fuse from 'fuse.js';
import type { PostMetadata } from '../utils/postLoader';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: PostMetadata[];
}

const SearchModal: Component<SearchModalProps> = (props) => {
  const [searchQuery, setSearchQuery] = createSignal('');
  const [searchResults, setSearchResults] = createSignal<PostMetadata[]>([]);
  let inputRef: HTMLInputElement | undefined;

  const fuse = () => new Fuse(props.posts, {
    keys: ['title', 'excerpt', 'author'],
    threshold: 0.4,
    includeScore: true
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = fuse().search(query);
    setSearchResults(results.map(result => result.item));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      props.onClose();
    }
  };

  onMount(() => {
    if (props.isOpen && inputRef) {
      inputRef.focus();
    }
  });

  return (
    <Show when={props.isOpen}>
      <div 
        class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-start justify-center pt-20 px-4"
        onClick={props.onClose}
      >
        <div 
          class="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[70vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div class="p-6 border-b border-gray-200">
            <div class="relative">
              <svg 
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search blog posts..."
                class="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={searchQuery()}
                onInput={(e) => handleSearch(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-6">
            <Show when={searchQuery() && searchResults().length === 0}>
              <p class="text-gray-500 text-center py-8">No results found</p>
            </Show>

            <Show when={!searchQuery()}>
              <p class="text-gray-400 text-center py-8">Start typing to search...</p>
            </Show>

            <div class="space-y-4">
              <For each={searchResults()}>
                {(post) => (
                  <A
                    href={`/blog/${post.slug}`}
                    class="block p-4 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={props.onClose}
                  >
                    <h3 class="font-semibold text-lg text-gray-900 mb-1">{post.title}</h3>
                    <p class="text-sm text-gray-500 mb-2">{post.date}</p>
                    <p class="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                  </A>
                )}
              </For>
            </div>
          </div>

          <div class="p-4 border-t border-gray-200 text-sm text-gray-500 text-center">
            Press <kbd class="px-2 py-1 bg-gray-100 rounded">ESC</kbd> to close
          </div>
        </div>
      </div>
    </Show>
  );
};

export default SearchModal;
