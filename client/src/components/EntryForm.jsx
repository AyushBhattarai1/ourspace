import { useState, useEffect } from 'react';
import { api, uploadPhoto } from '../api';
import './EntryForm.css';

function EntryForm({ mode, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    type: 'journal',
    title: '',
    body: '',
    tags: '',
    visibility: mode === 'me' ? 'only_me' : mode === 'partner' ? 'for_partner' : 'couple',
    photos: []
  });
  const [uploading, setUploading] = useState(false);
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    api.get('/partner').then(res => setPartner(res.data.partner));
  }, []);

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    
    try {
      const urls = await Promise.all(files.map(file => uploadPhoto(file)));
      setFormData({ ...formData, photos: [...formData.photos, ...urls] });
    } catch (error) {
      alert('Failed to upload photos');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      await api.post('/entries', {
        ...formData,
        tags,
        entry_date: new Date()
      });
      onSuccess();
    } catch (error) {
      alert('Failed to create entry: ' + error.response?.data?.error);
    }
  };

  const getVisibilityOptions = () => {
    const partnerName = partner?.name || 'Partner';
    
    if (formData.type === 'moment') {
      return [{ value: 'couple', label: `Share with ${partnerName} (Moments are always shared)` }];
    }
    if (formData.type === 'mind') {
      return [{ value: 'for_partner', label: `Share with ${partnerName} (What's on my mind is always for partner)` }];
    }
    return [
      { value: 'only_me', label: 'Only Me (Keep Private)' },
      { value: 'for_partner', label: `Share with ${partnerName}` },
      { value: 'couple', label: `Share with ${partnerName} (Both can edit)` }
    ];
  };

  return (
    <div className="card entry-form">
      <h2>Create New Entry</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type</label>
          <select 
            value={formData.type} 
            onChange={(e) => {
              const newType = e.target.value;
              let newVisibility = formData.visibility;
              if (newType === 'moment') newVisibility = 'couple';
              if (newType === 'mind') newVisibility = 'for_partner';
              setFormData({ ...formData, type: newType, visibility: newVisibility });
            }}
          >
            <option value="journal">Journal</option>
            <option value="note">Note</option>
            <option value="moment">Moment</option>
            <option value="gallery">Gallery</option>
            <option value="mind">What's On My Mind</option>
          </select>
        </div>

        <div className="form-group">
          <label>Who can see this?</label>
          <select 
            value={formData.visibility}
            onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
            disabled={formData.type === 'moment' || formData.type === 'mind'}
          >
            {getVisibilityOptions().map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter title"
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            placeholder="Write your thoughts..."
            rows="6"
          />
        </div>

        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="trip, anniversary, special"
          />
        </div>

        <div className="form-group">
          <label>Photos</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            disabled={uploading}
          />
          {uploading && <p>Uploading...</p>}
          {formData.photos.length > 0 && (
            <div className="photo-preview">
              {formData.photos.map((photo, idx) => (
                <div key={idx} className="photo-item">
                  <img src={photo} alt="" />
                  <button 
                    type="button"
                    onClick={() => setFormData({ 
                      ...formData, 
                      photos: formData.photos.filter((_, i) => i !== idx) 
                    })}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">Create</button>
          <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EntryForm;
