import { Component, onMount, onCleanup } from 'solid-js';

interface HtmlRendererProps {
  htmlContent: string;
}

const HtmlRenderer: Component<HtmlRendererProps> = (props) => {
  let containerRef: HTMLDivElement | undefined;
  const injectedElements: (HTMLStyleElement | HTMLLinkElement | HTMLScriptElement)[] = [];

  onMount(() => {
    if (!containerRef) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(props.htmlContent, 'text/html');

    const styleElements = doc.querySelectorAll('style');
    styleElements.forEach((style) => {
      const newStyle = document.createElement('style');
      newStyle.textContent = style.textContent;
      document.head.appendChild(newStyle);
      injectedElements.push(newStyle);
    });

    const linkElements = doc.querySelectorAll('link');
    linkElements.forEach((link) => {
      const newLink = document.createElement('link');
      Array.from(link.attributes).forEach((attr) => {
        newLink.setAttribute(attr.name, attr.value);
      });
      document.head.appendChild(newLink);
      injectedElements.push(newLink);
    });

    const bodyContent = doc.body.innerHTML;
    containerRef.innerHTML = bodyContent;

    const scriptElements = doc.querySelectorAll('script');
    scriptElements.forEach((script) => {
      const newScript = document.createElement('script');
      
      if (script.src) {
        newScript.src = script.src;
        Array.from(script.attributes).forEach((attr) => {
          if (attr.name !== 'src') {
            newScript.setAttribute(attr.name, attr.value);
          }
        });
      } else {
        newScript.textContent = script.textContent;
      }

      if (script.type) {
        newScript.type = script.type;
      }

      document.body.appendChild(newScript);
      injectedElements.push(newScript);
    });
  });

  onCleanup(() => {
    injectedElements.forEach((element) => {
      element.remove();
    });
    injectedElements.length = 0;
  });

  return <div ref={containerRef} />;
};

export default HtmlRenderer;
