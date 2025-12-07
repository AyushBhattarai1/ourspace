import { useState, useEffect, useRef } from 'react';
import { api } from '../api';
import Header from '../components/Header';
import './Chat.css';

function Chat({ user, onLogout }) {
  const [partner, setPartner] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    api.get('/partner').then(res => setPartner(res.data.partner));
    loadMessages();
    
    // Poll for new messages every 3 seconds
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
    markMessagesAsRead();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const response = await api.get('/messages');
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const markMessagesAsRead = async () => {
    try {
      await api.put('/messages/mark-read');
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      await api.post('/messages', { message: newMessage.trim() });
      setNewMessage('');
      loadMessages();
    } catch (error) {
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (days < 7) {
      return d.toLocaleDateString('en-US', { weekday: 'short' }) + ' ' + 
             d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' +
             d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div className="chat-page">
      <Header user={user} partner={partner} onLogout={onLogout} />
      
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-partner-info">
            <div className="partner-avatar">
              {partner?.name.charAt(0)}
            </div>
            <div>
              <h2>{partner?.name}</h2>
              <p className="chat-subtitle">Private conversation</p>
            </div>
          </div>
          <div className="chat-info-badge">
            Messages are permanent
          </div>
        </div>

        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <p>No messages yet. Start your conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender_id === user.id ? 'sent' : 'received'}`}
              >
                <div className="message-bubble">
                  <p className="message-text">{msg.message}</p>
                  <span className="message-time">{formatTime(msg.created_at)}</span>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="message-input-container" onSubmit={handleSend}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message ${partner?.name}...`}
            rows="1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          <button type="submit" disabled={!newMessage.trim() || sending}>
            {sending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
