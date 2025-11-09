import { Suspense, type Component } from 'solid-js';
import Header from './components/Header';

const App: Component = (props: { children: Element }) => {
  return (
    <div class="min-h-screen bg-gray-50">
      <Header />
      
      <main class="pt-24 px-4 pb-16">
        <Suspense>{props.children}</Suspense>
      </main>
    </div>
  );
};

export default App;
