const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('Chat server started on port 8080');

wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send a welcome message
    ws.send(JSON.stringify({
        type: 'system',
        content: 'Bienvenue dans le chat DEVWEEK !',
        timestamp: new Date().toISOString()
    }));

    ws.on('message', (message) => {
        try {
            // Parse the incoming message
            const parsedMessage = JSON.parse(message);

            // Add server timestamp
            parsedMessage.timestamp = new Date().toISOString();

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
    });
});
