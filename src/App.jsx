import React from 'react';
import ChatWidget from "./pages/chat-widget/ChatWidget.jsx";
import {Toaster} from "sonner";

const App = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="relative">
                <ChatWidget/>
            </div>
            <Toaster position="top-right"/>
        </div>
    );
};

export default App;