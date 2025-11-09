import { Component, Show, createSignal } from 'solid-js';
import { A } from '@solidjs/router';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: Component<MenuProps> = (props) => {
  return (
    <>
      <Show when={props.isOpen}>
        <div 
          class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={props.onClose}
        />
      </Show>
      
      <div 
        class="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out"
        classList={{
          'translate-x-0': props.isOpen,
          'translate-x-full': !props.isOpen
        }}
      >
        <div class="flex flex-col h-full">
          <div class="flex justify-end p-4">
            <button
              onClick={props.onClose}
              class="text-gray-600 hover:text-gray-900 text-2xl w-10 h-10 flex items-center justify-center"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          
          <nav class="flex-1 px-6">
            <ul class="space-y-4">
              <li>
                <A 
                  href="/" 
                  class="block text-lg text-gray-800 hover:text-gray-600 py-2"
                  onClick={props.onClose}
                >
                  Home
                </A>
              </li>
              <li>
                <A 
                  href="/blog" 
                  class="block text-lg text-gray-800 hover:text-gray-600 py-2"
                  onClick={props.onClose}
                >
                  Blog
                </A>
              </li>
              <li>
                <A 
                  href="/about" 
                  class="block text-lg text-gray-800 hover:text-gray-600 py-2"
                  onClick={props.onClose}
                >
                  About
                </A>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Menu;
