document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('chatWidget');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesContainer = document.getElementById('chatMessages');
    const connectionStatus = document.getElementById('connectionStatus');

    // Generate a secure random ID for this session
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);

    // WebSocket Connection
    let ws;
    let reconnectInterval;

    function connect() {
        // Connect to Render backend
        ws = new WebSocket('wss://devweek.onrender.com');

        ws.onopen = () => {
            console.log('Connected to Chat Server');
            connectionStatus.innerHTML = '<span class="status-dot"></span>En ligne';
            connectionStatus.style.color = '#4ade80';
            clearInterval(reconnectInterval);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            displayMessage(data);
        };

        ws.onclose = () => {
            console.log('Disconnected');
            connectionStatus.innerHTML = '<span class="status-dot" style="background: #ef4444; box-shadow: 0 0 10px #ef4444;"></span>Hors ligne';
            connectionStatus.style.color = '#ef4444';

            // Try to reconnect
            if (!reconnectInterval) {
                reconnectInterval = setInterval(connect, 3000);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };
    }

    // Initialize info
    connect();

    // UI Toggling
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        chatToggle.classList.toggle('open');
        if (chatWidget.classList.contains('active')) {
            setTimeout(() => chatInput.focus(), 300);
            scrollToBottom();
        }
    });

    // Send Message
    function sendMessage() {
        const text = chatInput.value.trim();
        if (text && ws && ws.readyState === WebSocket.OPEN) {
            const message = {
                type: 'text',
                content: text,
                senderId: userId
            };
            ws.send(JSON.stringify(message));
            chatInput.value = '';
        }
    }

    sendBtn.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Display Message
    function displayMessage(data) {
        const messageDiv = document.createElement('div');
        const time = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (data.type === 'system') {
            messageDiv.className = 'message system';
            messageDiv.innerHTML = data.content;
        } else {
            const isMe = data.senderId === userId;
            messageDiv.className = `message ${isMe ? 'sent' : 'received'}`;
            messageDiv.innerHTML = `
                ${data.content}
                <span class="message-time">${time}</span>
            `;
        }

        messagesContainer.appendChild(messageDiv);
        scrollToBottom();

        // Play sound if not me and widget is closed (optional, skipped for now to keep it simple)
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
