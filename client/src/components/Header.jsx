import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ user, partner, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <header className="header">
      <div className="container header-content">
        <div className="header-left">
          <h1 onClick={() => navigate('/dashboard')}>Our Space</h1>
          <nav className="header-nav">
            <button 
              className={isActive('/dashboard') ? 'nav-link active' : 'nav-link'}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={isActive('/gallery') ? 'nav-link active' : 'nav-link'}
              onClick={() => navigate('/gallery')}
            >
              Gallery
            </button>
          </nav>
        </div>
        <div className="user-info">
          <span>Hi, {user.name}</span>
          <button onClick={onLogout} className="btn-logout">Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
