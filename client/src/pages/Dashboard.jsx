import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { api } from '../api';
import Header from '../components/Header';
import ModeToggle from '../components/ModeToggle';
import EntryList from '../components/EntryList';
import EntryForm from '../components/EntryForm';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const [mode, setMode] = useState('couple');
  const [partner, setPartner] = useState(null);
  const [allEntries, setAllEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/partner').then(res => setPartner(res.data.partner));
  }, []);

  useEffect(() => {
    loadEntries();
  }, [mode]);

  const loadEntries = async () => {
    try {
      const params = { mode };
      const response = await api.get('/entries', { params });
      setAllEntries(response.data.entries);
    } catch (error) {
      console.error('Failed to load entries:', error);
    }
  };

  const handleCreateEntry = () => {
    navigate('/dashboard/create');
  };

  const getEntriesByType = (type) => {
    return allEntries.filter(entry => entry.type === type);
  };

  const journals = getEntriesByType('journal');
  const moments = getEntriesByType('moment');
  const notes = getEntriesByType('note');
  const gallery = getEntriesByType('gallery');
  const mind = getEntriesByType('mind');

  return (
    <div className="dashboard">
      <Header user={user} partner={partner} onLogout={onLogout} />
      
      <Routes>
        <Route path="" element={
          <>
            <ModeToggle mode={mode} setMode={setMode} user={user} partner={partner} />
            
            <div className="container">
              <button onClick={handleCreateEntry} className="btn-create">+ Create New</button>
              
              {allEntries.length === 0 ? (
                <div className="empty-state-main">
                  <h2>No entries yet</h2>
                  <p>Start creating memories by clicking the button above</p>
                </div>
              ) : (
                <>
                  {journals.length > 0 && (
                    <div className="section-container">
                      <h2 className="section-heading">Journals</h2>
                      <EntryList 
                        entries={journals} 
                        mode={mode} 
                        currentUserId={user.id}
                        onUpdate={loadEntries}
                      />
                    </div>
                  )}

                  {moments.length > 0 && (
                    <div className="section-container">
                      <h2 className="section-heading">Special Moments</h2>
                      <EntryList 
                        entries={moments} 
                        mode={mode} 
                        currentUserId={user.id}
                        onUpdate={loadEntries}
                      />
                    </div>
                  )}

                  {gallery.length > 0 && (
                    <div className="section-container">
                      <h2 className="section-heading">Photo Gallery</h2>
                      <EntryList 
                        entries={gallery} 
                        mode={mode} 
                        currentUserId={user.id}
                        onUpdate={loadEntries}
                      />
                    </div>
                  )}

                  {notes.length > 0 && (
                    <div className="section-container">
                      <h2 className="section-heading">Notes</h2>
                      <EntryList 
                        entries={notes} 
                        mode={mode} 
                        currentUserId={user.id}
                        onUpdate={loadEntries}
                      />
                    </div>
                  )}

                  {mind.length > 0 && (
                    <div className="section-container">
                      <h2 className="section-heading">What's On My Mind</h2>
                      <EntryList 
                        entries={mind} 
                        mode={mode} 
                        currentUserId={user.id}
                        onUpdate={loadEntries}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        } />
        
        <Route path="create" element={
          <div className="container">
            <EntryForm 
              mode={mode} 
              onSuccess={() => {
                loadEntries();
                navigate('/dashboard');
              }}
              onCancel={() => navigate('/dashboard')}
            />
          </div>
        } />
      </Routes>
    </div>
  );
}

export default Dashboard;
