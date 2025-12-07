import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

function Header({ user, partner, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-content">
        <div className="header-left">
          <h1 onClick={() => handleNavigation('/dashboard')}>Our Space</h1>
          
          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Desktop Navigation */}
          <nav className="header-nav desktop-nav">
            <button 
              className={isActive('/dashboard') ? 'nav-link active' : 'nav-link'}
              onClick={() => handleNavigation('/dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={isActive('/chat') ? 'nav-link active' : 'nav-link'}
              onClick={() => handleNavigation('/chat')}
            >
              Chat
            </button>
            <button 
              className={isActive('/gallery') ? 'nav-link active' : 'nav-link'}
              onClick={() => handleNavigation('/gallery')}
            >
              Gallery
            </button>
          </nav>
        </div>

        {/* Desktop User Info */}
        <div className="user-info desktop-user">
          <span>Hi, {user.name}</span>
          <button onClick={onLogout} className="btn-logout">Logout</button>
        </div>

        {/* Mobile Logout Button */}
        <button onClick={onLogout} className="btn-logout mobile-logout">
          Logout
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-overlay" onClick={() => setMenuOpen(false)}></div>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h2>Menu</h2>
            <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
          </div>
          
          <div className="sidebar-user">
            <div className="user-avatar">{user.name.charAt(0)}</div>
            <div className="user-details">
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button 
              className={isActive('/dashboard') ? 'sidebar-link active' : 'sidebar-link'}
              onClick={() => handleNavigation('/dashboard')}
            >
              <span className="link-icon">📊</span>
              Dashboard
            </button>
            <button 
              className={isActive('/chat') ? 'sidebar-link active' : 'sidebar-link'}
              onClick={() => handleNavigation('/chat')}
            >
              <span className="link-icon">💬</span>
              Chat
            </button>
            <button 
              className={isActive('/gallery') ? 'sidebar-link active' : 'sidebar-link'}
              onClick={() => handleNavigation('/gallery')}
            >
              <span className="link-icon">📸</span>
              Gallery
            </button>
          </nav>

          <div className="sidebar-footer">
            <button onClick={() => { onLogout(); setMenuOpen(false); }} className="sidebar-logout">
              <span className="link-icon">🚪</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
