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

// Immediately run when script is loaded
(function init() {
    // Check if we already injected the widget
    let container = document.getElementById("chat-widget-root");
    if (!container) {
        container = document.createElement("div");
        container.id = "chat-widget-root";

        // Position fixed in bottom-right
        container.style.position = "fixed";
        container.style.bottom = "20px";
        container.style.right = "20px";
        container.style.zIndex = "9999";

        document.body.appendChild(container);
    }

    // Mount React widget into isolated container
    const root = ReactDOM.createRoot(container);
    root.render(<ChatWidget />);
})();



