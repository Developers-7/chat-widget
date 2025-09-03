/**
 * Created by WebStorm.
 * User: Zishan
 * Date: 03 Sep 2025
 * Time: 11:10 AM
 * Email: zishan.softdev@gmail.com
 */

import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "./pages/chat-widget/ChatWidget"; // adjust import if needed
import "./index.css"; // make sure Tailwind is included

// Create a container div if not already present
function initWidget() {
    if (document.getElementById("chat-widget-root")) return;

    const container = document.createElement("div");
    container.id = "chat-widget-root";
    document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);
    root.render(<ChatWidget />);
}

// Expose initWidget globally
window.ChatWidget = { init: initWidget };
