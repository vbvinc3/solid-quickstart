import { Component, createSignal, createResource } from 'solid-js';
import { A } from '@solidjs/router';
import Menu from './Menu';
import SearchModal from './SearchModal';
import { getAllPosts } from '../utils/postLoader';

const Header: Component = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const [isSearchOpen, setIsSearchOpen] = createSignal(false);
  const [posts] = createResource(getAllPosts);

  return (
    <>
      <header class="fixed top-0 left-0 right-0 bg-white shadow-sm z-30 h-16">
        <div class="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
          <A href="/" class="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="/images/logo.svg" 
              alt="Logo" 
              class="h-10 w-auto"
            />
          </A>

          <div class="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <svg 
                class="w-6 h-6 text-gray-700" 
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
            </button>

            <button
              onClick={() => setIsMenuOpen(true)}
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <svg 
                class="w-6 h-6 text-gray-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <Menu isOpen={isMenuOpen()} onClose={() => setIsMenuOpen(false)} />
      <SearchModal 
        isOpen={isSearchOpen()} 
        onClose={() => setIsSearchOpen(false)} 
        posts={posts() || []} 
      />
    </>
  );
};

export default Header;
