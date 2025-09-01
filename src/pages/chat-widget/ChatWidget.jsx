/**
 * Created by WebStorm.
 * User: Zishan
 * Date: 01 Sep 2025
 * Time: 2:53 PM
 * Email: zishan.softdev@gmail.com
 */


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        const newMessage = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: getBotResponse(inputValue),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const getBotResponse = (userMessage) => {
        const responses = [
            "Thanks for your message! I'll get back to you shortly.",
            "That's a great question. Let me look into that for you.",
            "I understand your concern. How can I assist you further?",
            "Thank you for reaching out. Is there anything specific I can help you with?",
            "I appreciate you contacting us. Let me see how I can help.",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    if (!isOpen) {
        return (
            <div className="z-50">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 group"
                >
                    <MessageCircle size={24} className="group-hover:animate-pulse" />
                </button>
            </div>
        );
    }

    return (
        <div className="z-50">
            <div className={`bg-white rounded-lg shadow-2xl transition-all duration-300 ${
                isMinimized ? 'w-80 h-16' : 'w-80 h-96'
            }`}>
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <div>
                            <h3 className="font-semibold text-sm">Support Chat</h3>
                            <p className="text-xs text-blue-100">We're online</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="text-white hover:text-blue-200 transition-colors"
                        >
                            <Minimize2 size={16} />
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-blue-200 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {!isMinimized && (
                    <>
                        {/* Messages */}
                        <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                            message.sender === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-white text-gray-800 rounded-bl-none shadow-sm border'
                                        }`}
                                    >
                                        <p>{message.text}</p>
                                        <p className={`text-xs mt-1 ${
                                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                        }`}>
                                            {formatTime(message.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white text-gray-800 rounded-lg rounded-bl-none shadow-sm border px-3 py-2">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t bg-white rounded-b-lg">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={inputValue.trim() === ''}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg px-3 py-2 transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatWidget;