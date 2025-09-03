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
import "./index.css";

function initWidget() {
    if (document.getElementById("chat-widget-root")) return;

    const container = document.createElement("div");
    container.id = "chat-widget-root";
    document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);
    root.render(<ChatWidget />);
}

// Expose globally
window.ChatWidget = { init: initWidget };

// 🚀 Auto-init on script load
initWidget();

