# 🎮 Multiplayer Dashboard Game

A real-time multiplayer leaderboard application built with React and Socket.IO, featuring a modern glassmorphism design and live score tracking.

## ✨ Features

- **Real-time Updates**: Live leaderboard that updates instantly when players submit scores
- **Modern UI**: Glassmorphism design with gradient backgrounds and smooth animations  
- **Multiplayer Support**: Multiple players can join simultaneously from different devices
- **Persistent Scores**: Player scores persist even after disconnection (configurable)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Live Chat**: Test messaging system for player communication
- **Auto-sorting**: Players are automatically ranked by highest score
- **Visual Feedback**: Crown, silver, and bronze indicators for top 3 players

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Socket.IO Client** - Real-time communication
- **CSS3** - Modern styling with glassmorphism effects
- **Vite** - Fast build tool and dev server

### Backend  
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
multiplayer-dashboard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Input.jsx   # Reusable input component
│   │   ├── App.jsx         # Main application component
│   │   ├── App.css         # Modern styling
│   │   └── main.jsx        # React entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── server/                 # Node.js backend
│   ├── server.js           # Socket.IO server
│   └── package.json        # Backend dependencies
└── README.md              # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd multiplayer-dashboard
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Development

1. **Start the server** (Terminal 1)
   ```bash
   cd server
   npm start
   ```
   Server will run on `http://localhost:3000`

2. **Start the client** (Terminal 2)
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5174`

3. **Open multiple browser tabs/windows** to test multiplayer functionality

## 🎯 How to Use

1. **Enter Your Name**: Type your player name in the first input field
2. **Enter Your Score**: Input your game score in the second field  
3. **Submit Score**: Click "Submit Score" to add yourself to the leaderboard
4. **View Rankings**: Watch as you're ranked against other players in real-time
5. **Test Chat**: Use "Send Test Message" to test the messaging system

## 🔧 Configuration

### Server Configuration (server/server.js)

```javascript
// Change server port
const PORT = process.env.PORT || 3000;

// Modify CORS origins
cors: {
  origin: ["http://localhost:5174", "https://yourdomain.com"],
  methods: ["GET", "POST"]
}

// Player cleanup interval (currently 10 minutes)
setInterval(() => {
  // Cleanup logic
}, 10 * 60 * 1000);
```

### Client Configuration (client/src/App.jsx)

```javascript
// Change server URL
const s = io('http://localhost:3000');
// For production: const s = io('https://your-server.com');
```

## 📡 API Events

### Client → Server
- `score` - Submit a player score `{ name: string, score: number }`
- `message` - Send a chat message `string`
- `reconnect` - Handle player reconnection `string`

### Server → Client  
- `playerScores` - Receive updated leaderboard `Array<Player>`
- `message` - Receive chat message `{ id, message, timestamp }`
- `error` - Receive error message `string`

## 🎨 Styling

The application uses a modern glassmorphism design with:
- **Gradient backgrounds** - Purple to blue gradient
- **Glass effects** - Backdrop blur and transparency
- **Smooth animations** - Hover effects and transitions
- **Responsive layout** - Mobile-first design approach
- **Gaming aesthetics** - Championship-style visual elements

## 🚢 Deployment

### Deploy to Heroku

1. **Prepare for production**
   ```bash
   # In client directory
   npm run build
   
   # Move build files to server directory
   cp -r dist ../server/client
   ```

2. **Deploy to Heroku**
   ```bash
   # In server directory
   git init
   git add .
   git commit -m "Initial commit"
   heroku create your-app-name
   git push heroku main
   ```

3. **Update client Socket.IO URL**
   ```javascript
   const s = io('https://your-app-name.herokuapp.com');
   ```

### Deploy to Vercel/Netlify

1. **Deploy client** to Vercel/Netlify
2. **Deploy server** to Heroku/Railway/DigitalOcean
3. **Update CORS settings** to include your frontend domain

## 🔒 Security Considerations

- **Input Validation**: Server validates all incoming data
- **Rate Limiting**: Consider adding rate limiting for score submissions
- **CORS Configuration**: Properly configure allowed origins
- **Environment Variables**: Use environment variables for sensitive data

## 🐛 Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check if server is running on correct port
   - Verify CORS configuration
   - Ensure firewall isn't blocking connections

2. **Scores Not Updating**
   - Check browser console for Socket.IO errors  
   - Verify server logs for incoming data
   - Confirm client is connected to server

3. **Styling Issues**
   - Ensure App.css is properly imported
   - Check for CSS conflicts with other stylesheets
   - Verify browser supports modern CSS features

### Debug Mode

Enable debug logging:
```javascript
// Client side
const s = io('http://localhost:3000', { debug: true });

// Server side  
console.log('Debug info:', data);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Future Enhancements

- [ ] User authentication and profiles
- [ ] Game session management
- [ ] Score history and statistics  
- [ ] Real-time game rooms
- [ ] Admin dashboard for game management
- [ ] Mobile app version
- [ ] Social features (friends, challenges)
- [ ] Multiple game types support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created with ❤️ for multiplayer gaming enthusiasts

## 🙏 Acknowledgments

- Socket.IO team for excellent real-time communication
- React team for the amazing UI library
- Modern CSS community for glassmorphism inspiration

---

**Happy Gaming! 🎮🏆**