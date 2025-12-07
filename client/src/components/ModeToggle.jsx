import './ModeToggle.css';

function ModeToggle({ mode, setMode, user, partner }) {
  const getModeDescription = () => {
    if (mode === 'me') return `Everything you created`;
    if (mode === 'partner') return partner ? `What ${partner.name} shared with you` : 'Partner view';
    return 'Shared memories and moments';
  };

  return (
    <div className="mode-toggle-container">
      <div className="container">
        <div className="mode-toggle">
          <button 
            className={mode === 'me' ? 'active' : ''} 
            onClick={() => setMode('me')}
          >
            <span>Me</span>
          </button>
          <button 
            className={mode === 'partner' ? 'active' : ''} 
            onClick={() => setMode('partner')}
          >
            <span>Partner</span>
          </button>
          <button 
            className={mode === 'couple' ? 'active' : ''} 
            onClick={() => setMode('couple')}
          >
            <span>Couple</span>
          </button>
        </div>
        <p className="mode-description">{getModeDescription()}</p>
      </div>
    </div>
  );
}

export default ModeToggle;
