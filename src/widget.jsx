import React from 'react';
import { createRoot } from 'react-dom/client';
import StandaloneChatWidget from './StandaloneChatWidget.jsx';
import './index.css';

// Widget initialization function
const initChatWidget = (config = {}) => {
  // Create a shadow DOM container to isolate styles
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'chat-widget-container';

  // Position the container
  widgetContainer.style.cssText = `
    position: fixed !important;
    bottom: 0px !important;
    right: 0px !important;
    z-index: 999999 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
    pointer-events: none !important;
  `;

  document.body.appendChild(widgetContainer);

  // Create shadow root for style isolation
  const shadowRoot = widgetContainer.attachShadow({ mode: 'open' });

  // Create a div inside shadow root
  const shadowContainer = document.createElement('div');
  shadowContainer.style.cssText = 'pointer-events: auto !important;';
  shadowRoot.appendChild(shadowContainer);

  // Copy styles into shadow DOM
  const styleElement = document.createElement('style');
  styleElement.textContent = getWidgetStyles();
  shadowRoot.appendChild(styleElement);

  // Render React component
  const root = createRoot(shadowContainer);
  root.render(
    <React.StrictMode>
      <StandaloneChatWidget {...config} />
    </React.StrictMode>
  );

  return {
    destroy: () => {
      root.unmount();
      document.body.removeChild(widgetContainer);
    }
  };
};

// Basic CSS styles for the widget
const getWidgetStyles = () => `
  * {
    box-sizing: border-box;
  }
  
  /* Reset and base styles */
  div, button, textarea, p, h1, h2, h3, h4, h5, h6, pre, code {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  
  /* Syntax highlighting styles */
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #999;
  }
  
  .token.punctuation {
    color: #ccc;
  }
  
  .token.tag,
  .token.attr-name,
  .token.namespace,
  .token.deleted {
    color: #e2777a;
  }
  
  .token.function-name {
    color: #6196cc;
  }
  
  .token.boolean,
  .token.number,
  .token.function {
    color: #f08d49;
  }
  
  .token.property,
  .token.class-name,
  .token.constant,
  .token.symbol {
    color: #f8c555;
  }
  
  .token.selector,
  .token.important,
  .token.atrule,
  .token.keyword,
  .token.builtin {
    color: #cc99cd;
  }
  
  .token.string,
  .token.char,
  .token.attr-value,
  .token.regex,
  .token.variable {
    color: #7ec699;
  }
  
  .token.operator,
  .token.entity,
  .token.url {
    color: #67cdcc;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  /* Code block styles */
  pre {
    background: #282c34 !important;
    padding: 1rem !important;
    border-radius: 0.5rem !important;
    overflow-x: auto !important;
    margin: 0.5rem 0 !important;
  }
  
  code {
    font-family: 'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace !important;
    font-size: 0.875rem !important;
  }
`;

// Make it available globally
window.ChatWidget = {
  init: initChatWidget
};

// Auto-initialize if data attributes are present
document.addEventListener('DOMContentLoaded', () => {
  const scripts = document.querySelectorAll('script[data-chat-widget]');
  scripts.forEach(script => {
    const config = {};
    // Parse configuration from data attributes
    if (script.dataset.apiEndpoint) {
      config.apiEndpoint = script.dataset.apiEndpoint;
    }
    initChatWidget(config);
  });
});

export { initChatWidget };
