/**
 * Created by WebStorm.
 * User: Zishan
 * Date: 03 Sep 2025
 * Time: 11:10 AM
 * Email: zishan.softdev@gmail.com
 */

// src/widget.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "./pages/chat-widget/ChatWidget.jsx";

(function initChatWidget() {
    // Avoid multiple instances
    if (window.ChatWidgetMounted) return;
    window.ChatWidgetMounted = true;

    // Create a container div
    let root = document.getElementById("chat-widget-root");
    if (!root) {
        root = document.createElement("div");
        root.id = "chat-widget-root";
        document.body.appendChild(root);
    }

    // Render the React widget
    const rootInstance = ReactDOM.createRoot(root);
    rootInstance.render(<ChatWidget />);
})();


