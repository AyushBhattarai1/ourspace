import { useState } from 'react';
import { api } from '../api';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await api.post('/login', { email, password });
      onLogin(response.data.token, response.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const quickLogin = (userEmail) => {
    setEmail(userEmail);
    setPassword('password123');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Our Space</h1>
        <p className="subtitle">Where two hearts meet</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
          <button type="submit" className="btn-primary">Login</button>
        </form>

        <div className="quick-login">
          <p>Quick login as:</p>
          <button onClick={() => quickLogin('ayush@couple.app')} className="btn-secondary">Ayush</button>
          <button onClick={() => quickLogin('neha@couple.app')} className="btn-secondary">Neha</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
