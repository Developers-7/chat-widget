/**
 * Standalone Chat Widget for embedding on any website
 * This version includes all necessary components inline to avoid external dependencies
 */
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Inline components to avoid external dependencies
const Button = ({ children, onClick, disabled, className = "", size = "default" }) => {
    const sizeClasses = {
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8",
        sm: "h-9 px-3"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 ${sizeClasses[size]} ${className}`}
            style={{
                backgroundColor: disabled ? '#94a3b8' : '#0f172a',
                color: '#f8fafc',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer'
            }}
        >
            {children}
        </button>
    );
};

const Textarea = ({ placeholder, value, onChange, onKeyDown, disabled, rows = 2, className = "" }) => {
    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            disabled={disabled}
            rows={rows}
            className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${className}`}
            style={{
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '12px',
                fontSize: '14px',
                resize: 'none'
            }}
        />
    );
};

// Simple Dialog components
const Dialog = ({ children }) => {
    return <>{children}</>;
};

const DialogTrigger = ({ asChild, children }) => {
    return children;
};

const DialogContent = ({ children, className = "" }) => {
    return (
        <div
            className={`fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 ${className}`}
            style={{
                position: 'fixed',
                bottom: '5.5rem',
                right: '1.5rem',
                width: '100%',
                maxWidth: '92vw',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                zIndex: 999999
            }}
        >
            {children}
        </div>
    );
};

// MessageCircle icon component
const MessageCircle = ({ className = "", size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
);

// Toast notification system
const toast = {
    error: (message) => {
        console.error('Chat Widget Error:', message);
        // Simple alert fallback - you can enhance this
        alert('Error: ' + message);
    }
};

// Markdown component
const MarkdownWithSyntax = ({ content }) => (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
            code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                    <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                    >
                        {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                ) : (
                    <code className={className} {...props}>
                        {children}
                    </code>
                );
            },
            a: ({ ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }} />
            ),
        }}
    >
        {content}
    </ReactMarkdown>
);

// API call function - configurable endpoint
const makeApiCall = async (prompt, apiEndpoint) => {
    // Use configured endpoint or fallback
    const API_ENDPOINT = apiEndpoint || window.CHAT_WIDGET_API_ENDPOINT || 'YOUR_API_ENDPOINT_HERE';

    if (API_ENDPOINT === 'YOUR_API_ENDPOINT_HERE') {
        // Return a mock response for demo purposes
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        candidates: [
                            {
                                content: {
                                    parts: [
                                        {
                                            text: `This is a demo response to: "${prompt}"\n\nTo connect this widget to your actual API, please configure the API endpoint when initializing the widget or set window.CHAT_WIDGET_API_ENDPOINT.`
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                });
            }, 1000);
        });
    }

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "gemini-2.5-flash",
                contents: [{ parts: [{ text: prompt }] }],
            }),
        });

        const data = await response.json();
        return {
            data: {
                candidates: [
                    {
                        content: {
                            parts: [
                                {
                                    text: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI"
                                }
                            ]
                        }
                    }
                ]
            }
        };
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

const StandaloneChatWidget = ({ apiEndpoint, ...otherConfig }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const chatEndRef = useRef(null);

    // Scroll to bottom on new message
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) {
            toast.error("Please enter a message.");
            return;
        }

        // Add user message
        const userMessage = { role: "user", content: input.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const prompt = input.trim();
            const res = await makeApiCall(prompt, apiEndpoint);

            const aiMessageContent =
                res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

            const aiMessage = { role: "assistant", content: aiMessageContent };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            toast.error("Failed to get AI response.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!isLoading) sendMessage();
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Open chat"
                        style={{
                            position: 'fixed',
                            bottom: '24px',
                            right: '24px',
                            zIndex: 999999,
                            borderRadius: '50%',
                            backgroundColor: '#0891b2',
                            color: 'white',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                            border: 'none',
                            width: '56px',
                            height: '56px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#0e7490';
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#0891b2';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        <MessageCircle size={28} />
                    </button>
                </DialogTrigger>

                {isOpen && (
                    <DialogContent
                        className="p-0 w-full max-w-[92vw] sm:max-w-md bottom-[5.5rem] right-6 left-auto top-auto translate-x-0 translate-y-0"
                        style={{
                            position: 'fixed',
                            bottom: '5.5rem',
                            right: '1.5rem',
                            width: '100%',
                            maxWidth: '400px',
                            height: '70vh',
                            maxHeight: '600px'
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'white', borderRadius: '8px' }}>
                            <header style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', fontWeight: 'bold', fontSize: '18px', color: '#0891b2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>AI Chat Code Assistant</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        fontSize: '20px',
                                        cursor: 'pointer',
                                        color: '#6b7280'
                                    }}
                                >
                                    ×
                                </button>
                            </header>

                            <main style={{ flex: 1, overflowY: 'auto', padding: '16px', backgroundColor: '#f9fafb' }}>
                                {messages.length === 0 && (
                                    <div style={{ color: '#9ca3af', textAlign: 'center', marginTop: '40px', userSelect: 'none' }}>
                                        Start the conversation by typing your question below...
                                    </div>
                                )}

                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            maxWidth: '85%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-words',
                                            marginBottom: '16px',
                                            ...(msg.role === "user"
                                                ? {
                                                    marginLeft: 'auto',
                                                    backgroundColor: '#06b6d4',
                                                    color: 'white',
                                                    borderBottomRightRadius: '0'
                                                }
                                                : {
                                                    marginRight: 'auto',
                                                    backgroundColor: 'white',
                                                    border: '1px solid #d1d5db',
                                                    borderBottomLeftRadius: '0'
                                                })
                                        }}
                                    >
                                        {msg.role === "assistant" ? (
                                            <MarkdownWithSyntax content={msg.content} />
                                        ) : (
                                            <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{msg.content}</pre>
                                        )}
                                    </div>
                                ))}

                                <div ref={chatEndRef} />
                            </main>

                            <footer style={{ padding: '16px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '8px' }}>
                                <Textarea
                                    placeholder="Type your message here..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={isLoading}
                                    rows={2}
                                    style={{ flex: 1 }}
                                />
                                <Button onClick={sendMessage} disabled={isLoading || !input.trim()} size="lg">
                                    {isLoading ? "Generating..." : "Send"}
                                </Button>
                            </footer>
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
};

export default StandaloneChatWidget;
