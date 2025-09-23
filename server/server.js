const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5174"],
    methods: ["GET", "POST"]
  }
});
let playerScores = [];
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  // Send current scores immediately on connection
  socket.emit('playerScores', playerScores);
  socket.on('score', (score) => {
  console.log('Received score:', score);
    if (!score.name || !score.score || isNaN(Number(score.score))) {
      socket.emit('error', 'Invalid name or score');
      return;
    }
    // Check if player already exists by name (not socket ID)
    const existingPlayerIndex = playerScores.findIndex(p => 
      p.name.toLowerCase().trim() === score.name.toLowerCase().trim()
    );
    if (existingPlayerIndex !== -1) {
      // Update existing player's score
      playerScores[existingPlayerIndex] = {
        ...playerScores[existingPlayerIndex],
        score: Number(score.score),
        socketId: socket.id,
        lastUpdate: new Date().toISOString()
      };
      console.log(`Updated score for ${score.name}: ${score.score}`);
    } else {
      // Add new player
      playerScores.push({
        name: score.name.trim(),
        score: Number(score.score),
        socketId: socket.id,
        joinedAt: new Date().toISOString(),
        lastUpdate: new Date().toISOString()
      });
      console.log(`New player added: ${score.name} with score ${score.score}`);
    }
    // Sort scores by highest first
    playerScores.sort((a, b) => Number(b.score) - Number(a.score));
    console.log('Current leaderboard:', playerScores);
    // Broadcast updated scores to all clients
    io.emit('playerScores', playerScores);
  });
  // Handle message
  socket.on('message', (message) => {
    const messageData = { 
      id: socket.id, 
      message: message, 
      timestamp: new Date().toLocaleTimeString() 
    };
    console.log('Broadcasting message:', messageData);
    io.emit('message', messageData);
  });
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    console.log('Player disconnected, but scores maintained');
  });
  // Handle player reconnection
  socket.on('reconnect', (playerName) => {
    const existingPlayer = playerScores.find(p => 
      p.name.toLowerCase().trim() === playerName.toLowerCase().trim()
    );
    if (existingPlayer) {
      existingPlayer.socketId = socket.id;
      console.log(`Player ${playerName} reconnected with new socket ID`);
    }
  });
});
// Clean up inactive players periodically (every 10 minutes)
setInterval(() => {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const activePlayers = playerScores.filter(p => p.lastUpdate > tenMinutesAgo);
  if (activePlayers.length !== playerScores.length) {
    console.log(`Cleaned up ${playerScores.length - activePlayers.length} inactive players`);
    playerScores = activePlayers;
    io.emit('playerScores', playerScores);
  }
}, 10 * 60 * 1000);

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Waiting for client connections...');
});