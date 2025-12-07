import { useState, useEffect } from 'react';
import { api, uploadPhoto } from '../api';
import Header from '../components/Header';
import './Gallery.css';

function Gallery({ user, onLogout }) {
  const [partner, setPartner] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    url: '',
    caption: '',
    tags: ''
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    api.get('/partner').then(res => setPartner(res.data.partner));
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const response = await api.get('/entries', { params: { mode: 'couple', type: 'gallery' } });
      setPhotos(response.data.entries);
    } catch (error) {
      console.error('Failed to load photos:', error);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadPhoto(file);
      setNewPhoto({ ...newPhoto, url });
    } catch (error) {
      alert('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPhoto.url) {
      alert('Please upload a photo first');
      return;
    }

    try {
      const tags = newPhoto.tags.split(',').map(t => t.trim()).filter(t => t);
      await api.post('/entries', {
        type: 'gallery',
        visibility: 'couple',
        title: newPhoto.caption,
        body: newPhoto.caption,
        tags,
        photos: [newPhoto.url],
        entry_date: new Date()
      });
      
      setNewPhoto({ url: '', caption: '', tags: '' });
      setShowUploadForm(false);
      loadPhotos();
    } catch (error) {
      alert('Failed to save photo: ' + error.response?.data?.error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    
    try {
      await api.delete(`/entries/${id}`);
      loadPhotos();
      setSelectedPhoto(null);
    } catch (error) {
      alert('Failed to delete: ' + error.response?.data?.error);
    }
  };

  return (
    <div className="gallery-page">
      <Header user={user} partner={partner} onLogout={onLogout} />
      
      <div className="gallery-header">
        <div className="container">
          <h1 className="gallery-title">Our Gallery</h1>
          <p className="gallery-subtitle">Shared memories between Ayush & Neha</p>
          <button 
            className="btn-upload" 
            onClick={() => setShowUploadForm(!showUploadForm)}
          >
            {showUploadForm ? 'Cancel' : '+ Upload Photo'}
          </button>
        </div>
      </div>

      {showUploadForm && (
        <div className="upload-section">
          <div className="container">
            <div className="upload-form-card">
              <h2>Upload New Photo</h2>
              <form onSubmit={handleSubmit}>
                <div className="upload-area">
                  {newPhoto.url ? (
                    <div className="preview-container">
                      <img src={newPhoto.url} alt="Preview" className="preview-image" />
                      <button 
                        type="button" 
                        className="btn-change-photo"
                        onClick={() => setNewPhoto({ ...newPhoto, url: '' })}
                      >
                        Change Photo
                      </button>
                    </div>
                  ) : (
                    <label className="upload-label">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        disabled={uploading}
                        style={{ display: 'none' }}
                      />
                      <div className="upload-placeholder">
                        {uploading ? 'Uploading...' : 'Click to upload photo'}
                      </div>
                    </label>
                  )}
                </div>

                <div className="form-group">
                  <label>Caption</label>
                  <textarea
                    value={newPhoto.caption}
                    onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                    placeholder="Write something about this photo..."
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newPhoto.tags}
                    onChange={(e) => setNewPhoto({ ...newPhoto, tags: e.target.value })}
                    placeholder="vacation, anniversary, date night"
                  />
                </div>

                <button type="submit" className="btn-save-photo" disabled={!newPhoto.url}>
                  Save to Gallery
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="gallery-grid-section">
        <div className="container">
          {photos.length === 0 ? (
            <div className="empty-gallery">
              <h2>No photos yet</h2>
              <p>Start building your gallery by uploading your first photo</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {photos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="gallery-item"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="photo-author-badge">
                    {photo.author_id === user.id ? 'You' : partner?.name || 'Partner'}
                  </div>
                  <img src={photo.photos[0]} alt={photo.title || 'Photo'} />
                  {photo.title && (
                    <div className="gallery-item-overlay">
                      <p>{photo.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedPhoto && (
        <div className="photo-modal" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPhoto(null)}>×</button>
            <img src={selectedPhoto.photos[0]} alt={selectedPhoto.title || 'Photo'} />
            <div className="modal-info">
              {selectedPhoto.title && <h3>{selectedPhoto.title}</h3>}
              {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                <div className="modal-tags">
                  {selectedPhoto.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              )}
              <p className="modal-date">
                Uploaded by {selectedPhoto.author_id === user.id ? 'You' : partner?.name || 'Partner'} on {new Date(selectedPhoto.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              {selectedPhoto.author_id === user.id && (
                <button 
                  className="btn-delete-modal" 
                  onClick={() => handleDelete(selectedPhoto.id)}
                >
                  Delete Photo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
