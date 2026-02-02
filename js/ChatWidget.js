
const { useState, useEffect, useRef, useLayoutEffect } = React;

// --- Icons ---
const IconChat = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const IconX = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const IconSend = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

// --- Components ---

const MessageBubble = ({ message, isMe }) => {
    const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (message.type === 'system') {
        return (
            <div className="flex justify-center my-3 animate-fade-in-up">
                <span className="bg-gray-800 border border-gray-700 text-gray-400 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {message.content}
                </span>
            </div>
        );
    }

    if (message.type === 'bot') {
        return (
            <div className="flex flex-col items-start mb-4 animate-fade-in-up">
                <div className="flex items-end gap-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] shadow-lg flex-shrink-0">
                        🤖
                    </div>
                    <div className="bg-gray-800 border-l-4 border-indigo-500 text-gray-200 rounded-lg rounded-bl-none px-4 py-3 text-sm shadow-md">
                        <p className="font-bold text-indigo-400 text-xs mb-1">DevWeek Bot</p>
                        {message.content}
                    </div>
                </div>
                <span className="text-[10px] text-gray-500 mt-1 ml-9">
                    {time}
                </span>
            </div>
        );
    }

    // Regular User Message
    return (
        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-4 animate-fade-in-up group`}>
            <div className={`flex items-end gap-2 max-w-[80%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm flex-shrink-0 ${isMe ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}>
                    {isMe ? 'ME' : message.senderId?.substring(5, 7).toUpperCase()}
                </div>

                {/* Bubble */}
                <div
                    className={`rounded-2xl px-4 py-2 text-sm shadow-md transition-all relative ${isMe
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-700 text-gray-100 rounded-bl-none'
                        }`}
                >
                    {!isMe && <p className="text-[10px] text-gray-400 mb-0.5 font-medium">{message.senderId}</p>}
                    {message.content}
                </div>
            </div>
            <span className={`text-[10px] text-gray-500 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? 'mr-9' : 'ml-9'}`}>
                {time}
            </span>
        </div>
    );
};

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [connectionStatus, setConnectionStatus] = useState('connecting');
    const wsRef = useRef(null);
    const [userId, setUserId] = useState('');

    // User List State
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);

    // Typing State
    const [typingUsers, setTypingUsers] = useState(new Set());
    const typingTimeoutRef = useRef({});
    const lastTypingSentRef = useRef(0);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Initial Setup
    useEffect(() => {
        const newUserId = 'user_' + Math.random().toString(36).substr(2, 9);
        setUserId(newUserId);
    }, []);

    // Connect
    useEffect(() => {
        if (!userId) return;

        let reconnectTimeout;

        const connect = () => {
            // Prevent duplicate connections if already open/connecting
            if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
                return;
            }

            const socket = new WebSocket('wss://devweek.onrender.com');
            wsRef.current = socket;

            socket.onopen = () => {
                console.log('Connected to Chat Server');
                setConnectionStatus('connected');
                socket.send(JSON.stringify({ type: 'join', senderId: userId }));
            };

            socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);

                    if (data.type === 'user_list') {
                        setOnlineUsers(data.users || []);
                    } else if (data.type === 'typing') {
                        handleTypingIndicator(data.senderId);
                    } else {
                        // If text message, stop typing indicator for that user
                        if (data.senderId) {
                            clearTypingIndicator(data.senderId);
                        }
                        setMessages((prev) => {
                            // Simple deduplication check based on timestamp + content + sender
                            // Ideally messages should have unique IDs from server
                            const isDuplicate = prev.some(m =>
                                m.timestamp === data.timestamp &&
                                m.content === data.content &&
                                m.senderId === data.senderId
                            );
                            return isDuplicate ? prev : [...prev, data];
                        });
                    }
                } catch (err) {
                    console.error('Error parsing message', err);
                }
            };

            socket.onclose = () => {
                console.log('Disconnected - attempting reconnect in 3s...');
                setConnectionStatus('disconnected');
                wsRef.current = null;
                reconnectTimeout = setTimeout(connect, 3000);
            };

            socket.onerror = (error) => {
                console.error('WebSocket Error:', error);
                socket.close(); // Ensure close triggers cleanup/reconnect
            };
        };

        connect();

        return () => {
            if (wsRef.current) {
                // Remove listener to prevent reconnect loop on unmount
                wsRef.current.onclose = null;
                wsRef.current.close();
                wsRef.current = null;
            }
            if (reconnectTimeout) clearTimeout(reconnectTimeout);
        };
    }, [userId]);

    // Typing Logic
    const handleTypingIndicator = (senderId) => {
        if (senderId === userId) return; // Ignore self

        setTypingUsers(prev => {
            const next = new Set(prev);
            next.add(senderId);
            return next;
        });

        // Clear existing timeout
        if (typingTimeoutRef.current[senderId]) {
            clearTimeout(typingTimeoutRef.current[senderId]);
        }

        // Set new timeout to remove indicator
        typingTimeoutRef.current[senderId] = setTimeout(() => {
            clearTypingIndicator(senderId);
        }, 3000);
    };

    const clearTypingIndicator = (senderId) => {
        setTypingUsers(prev => {
            const next = new Set(prev);
            next.delete(senderId);
            return next;
        });
        if (typingTimeoutRef.current[senderId]) {
            clearTimeout(typingTimeoutRef.current[senderId]);
            delete typingTimeoutRef.current[senderId];
        }
    };

    const handleInput = (e) => {
        setInputText(e.target.value);

        // Send typing event (throttled)
        const now = Date.now();
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && now - lastTypingSentRef.current > 2000) {
            wsRef.current.send(JSON.stringify({ type: 'typing', senderId: userId }));
            lastTypingSentRef.current = now;
        }
    };

    // Auto-scroll
    useLayoutEffect(() => {
        if (isOpen && !showUsers && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen, showUsers, typingUsers]); // Scroll when typing appears too

    // Focus input
    useEffect(() => {
        if (isOpen && !showUsers && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
        }
    }, [isOpen, showUsers]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

        const message = {
            type: 'text',
            content: inputText.trim(),
            senderId: userId
        };

        wsRef.current.send(JSON.stringify(message));
        setInputText('');
    };

    // Derived typing text
    const getTypingText = () => {
        const users = Array.from(typingUsers);
        if (users.length === 0) return null;
        if (users.length === 1) return `Un utilisateur écrit...`;
        if (users.length < 4) return `${users.length} utilisateurs écrivent...`;
        return 'Plusieurs utilisateurs écrivent...';
    };

    const typingText = getTypingText();

    return (
        <div className="font-sans antialiased">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    ${isOpen ? 'bg-red-500 hover:bg-red-600 rotate-90' : 'bg-blue-600 hover:bg-blue-700'}
                `}
            >
                <div className={`text-white transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-100'}`}>
                    {isOpen ? <IconX /> : <IconChat />}
                </div>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-20 right-4 left-4 sm:left-auto w-auto sm:w-96 h-[70vh] sm:h-[500px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-gray-700 animate-fade-in-up origin-bottom-right">

                    {/* Header */}
                    <div className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700 relative z-10">
                        <div>
                            <h3 className="text-white font-bold text-lg">Communauté</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-400 animate-pulse' :
                                    connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-red-500'
                                    }`}></span>
                                <span className="text-xs text-gray-400">
                                    {connectionStatus === 'connected' ? 'En ligne' :
                                        connectionStatus === 'connecting' ? 'Connexion...' : 'Hors ligne'}
                                </span>
                            </div>
                        </div>

                        {/* Users Toggle */}
                        <button
                            onClick={() => setShowUsers(!showUsers)}
                            className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium ${showUsers ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {onlineUsers.length}
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto bg-gray-900 custom-scrollbar relative">

                        {/* Messages View */}
                        <div className={`p-4 min-h-full transition-opacity duration-300 ${showUsers ? 'opacity-0 hidden' : 'opacity-100 block'}`}>
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-2 opacity-60 mt-20">
                                    <IconChat />
                                    <p className="text-sm">Aucun message pour le moment</p>
                                </div>
                            ) : (
                                messages.map((msg, idx) => (
                                    <MessageBubble
                                        key={idx}
                                        message={msg}
                                        isMe={msg.senderId === userId}
                                    />
                                ))
                            )}

                            {/* Typing Indicator Bubble */}
                            {typingText && (
                                <div className="flex flex-col items-start mb-4 animate-pulse">
                                    <div className="bg-gray-800 text-gray-400 rounded-2xl rounded-bl-none px-4 py-2 text-xs italic">
                                        {typingText}
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* User List View */}
                        <div className={`absolute inset-0 bg-gray-900 p-4 transition-opacity duration-300 ${showUsers ? 'opacity-100 z-20' : 'opacity-0 -z-10 pointer-events-none'}`}>
                            <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">Utilisateurs En Ligne</h4>
                            <div className="space-y-2">
                                {onlineUsers.map((user, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-gray-800 border border-gray-700">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                            {user.id.substring(5, 7).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">
                                                {user.id === userId ? `${user.id} (Moi)` : user.id}
                                            </p>
                                            <p className="text-[10px] text-green-400">En ligne</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Input Area */}
                    {!showUsers && (
                        <form onSubmit={sendMessage} className="p-3 bg-gray-800 border-t border-gray-700 flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputText}
                                onChange={handleInput}
                                placeholder="Écrivez un message..."
                                className="flex-1 bg-gray-700 text-white text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 border border-transparent transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim() || connectionStatus !== 'connected'}
                                className="p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <IconSend />
                            </button>
                        </form>
                    )}
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(75, 85, 99, 0.5);
                    border-radius: 20px;
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('react-chat-root'));
root.render(<ChatWidget />);
