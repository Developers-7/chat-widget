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

(function init() {
    let root = document.getElementById("chat-widget-root");

    if (!root) {
        root = document.createElement("div");
        root.id = "chat-widget-root";
        document.body.appendChild(root);
    }

    const rootInstance = ReactDOM.createRoot(root);
    rootInstance.render(<ChatWidget />);
})();

