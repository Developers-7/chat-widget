/**
 * Created by WebStorm.
 * User: Zishan
 * Date: 03 Sep 2025
 * Time: 11:10 AM
 * Email: zishan.softdev@gmail.com
 */

import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "./pages/chat-widget/ChatWidget";
import "./index.css"; // Import styles

// Inject CSS styles into the document head
function injectStyles() {
    if (document.getElementById('chat-widget-styles')) return; // Prevent duplicate injection

    const styleElement = document.createElement('style');
    styleElement.id = 'chat-widget-styles';
    styleElement.textContent = `
        /* Widget container isolation */
        #chat-widget-root {
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            z-index: 2147483647 !important;
            font-family: system-ui, -apple-system, sans-serif !important;
        }
        
        /* Prevent conflicts with host page */
        #chat-widget-root * {
            box-sizing: border-box !important;
        }
    `;
    document.head.appendChild(styleElement);
}

// Initialize widget
(function init() {
    // Prevent multiple instances
    if (window.ChatWidgetInitialized) return;
    window.ChatWidgetInitialized = true;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }

    function initWidget() {
        // Inject styles first
        injectStyles();

        // Create container
        let container = document.getElementById("chat-widget-root");
        if (!container) {
            container = document.createElement("div");
            container.id = "chat-widget-root";
            document.body.appendChild(container);
        }

        // Mount React widget
        const root = ReactDOM.createRoot(container);
        root.render(<ChatWidget />);
    }
})();
