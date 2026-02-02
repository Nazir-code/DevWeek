const WebSocket = require('ws');

const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: port });

console.log(`Chat server started on port ${port}`);

const messageHistory = [];

wss.on('connection', (ws) => {
    console.log('New client connected');

    // Broadcast updated user list helper
    const broadcastUserList = () => {
        const users = [];
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && client.userData) {
                users.push(client.userData);
            }
        });

        const message = JSON.stringify({
            type: 'user_list',
            users: users,
            timestamp: new Date().toISOString()
        });

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    };

    const broadcastSystemMessage = (content) => {
        const message = JSON.stringify({
            type: 'system',
            content: content,
            timestamp: new Date().toISOString()
        });
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    };

    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);

            // Handle Join Event
            if (parsedMessage.type === 'join') {
                ws.userData = {
                    id: parsedMessage.senderId,
                    name: parsedMessage.senderId
                };

                // 0. Send History
                ws.send(JSON.stringify({
                    type: 'history',
                    messages: messageHistory
                }));

                // 1. Send Personal Bot Welcome
                ws.send(JSON.stringify({
                    type: 'bot',
                    content: `Bienvenue ${parsedMessage.senderId} ! Je suis le Bot DevWeek. Si vous avez des questions, la communauté est là pour vous !`,
                    timestamp: new Date().toISOString()
                }));

                // 2. Announce to others
                broadcastSystemMessage(`${parsedMessage.senderId} a rejoint le chat.`);

                // 3. Update User List
                broadcastUserList();
                return;
            }

            // Regular Messages
            parsedMessage.timestamp = new Date().toISOString();

            // Store in history
            if (parsedMessage.type === 'text') {
                messageHistory.push(parsedMessage);
                if (messageHistory.length > 50) {
                    messageHistory.shift();
                }
            }

            // Broadcast to all clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(parsedMessage));
                }
            });
        } catch (e) {
            console.error('Error processing message:', e);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        if (ws.userData) {
            broadcastSystemMessage(`${ws.userData.id} a quitté le chat.`);
            broadcastUserList();
        }
    });
});
