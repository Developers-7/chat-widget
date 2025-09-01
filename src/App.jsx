import React from 'react';
import ChatWidget from "./pages/chat-widget/ChatWidget.jsx";

const App = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-center text-3xl font-bold mb-8">Hello This is a chat widget</h1>

            <div className="relative">
                <ChatWidget/>
            </div>
        </div>
    );
};

export default App;