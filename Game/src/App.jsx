import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import Input from './components/Input';

function App() {
  const [score, setScore] = useState({ name: '', score: '' });
  const [scores, setAllScore] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io('http://localhost:3000');
    setSocket(s);

    s.on('connect', () => {
      console.log('Connected to server:', s.id);
    });

    s.on('playerScores', (data) => {
      console.log('Received scores:', data);
      setAllScore(data);
    });

    s.on('message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => s.disconnect();
  }, []);

  function handleInput(event) {
    const { name, value } = event.target;
    setScore(prev => ({ ...prev, [name]: value }));
  }

  function sendScore() {
    if (socket && score.name && score.score) {
      socket.emit('score', score);
      setScore({ name: '', score: '' });
    }
  }

  function sendMessage() {
    if (socket) socket.emit('message', 'Hello from client!');
  }
  return (
    <>
      <h1>🎮 Multiplayer Dashboard Game</h1>
      <div className="card">
        <button onClick={sendMessage}>Send Test Message</button>
        {messages.length > 0 && (
          <div className="messages-container">
            <div className="messages">
              {messages.map((msg, i) => (
                <p key={i}>
                  <strong>{typeof msg === 'object' ? msg.id : 'Player'}:</strong> {' '}
                  {typeof msg === 'object' ? msg.message : msg} {' '}
                  {typeof msg === 'object' && msg.timestamp && (
                    <small>({msg.timestamp})</small>
                  )}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="input-container">
        <Input 
          name="name" 
          placeholder="Enter your name" 
          handleInput={handleInput}
          value={score.name}
          className="input-field"
        />
        <Input 
          name="score" 
          placeholder="Enter your score" 
          handleInput={handleInput}
          value={score.score}
          className="input-field"
        />
        <button onClick={sendScore}>🏆 Submit Score</button>
      </div>
      <div className="table-container">
        <h2>🏆 Live Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>🥇 Rank</th>
              <th>👤 Player Name</th>
              <th>📊 Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.length === 0 ? (
              <tr>
                <td colSpan="3" className="empty-state">
                  No players have joined yet. Be the first to submit a score! 🎯
                </td>
              </tr>
            ) : (
              scores
                .filter(player => player.name && player.name.trim() !== '')
                .sort((a, b) => Number(b.score) - Number(a.score))
                .map((player, index) => (
                  <tr key={`${player.name}-${player.score}-${index}`}>
                    <td>
                      #{index + 1}
                      {index === 0 && ' 👑'}
                      {index === 1 && ' 🥈'}
                      {index === 2 && ' 🥉'}
                    </td>
                    <td style={{ fontWeight: index < 3 ? 'bold' : 'normal' }}>
                      {player.name}
                    </td>
                    <td>
                      {Number(player.score).toLocaleString()}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
        {scores.length > 0 && (
          <div className="player-count">
            👥 Total Players: {scores.filter(p => p.name && p.name.trim() !== '').length}
          </div>
        )}
      </div>
    </>
  );
}
export default App;