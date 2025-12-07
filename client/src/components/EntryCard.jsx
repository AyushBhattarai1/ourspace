import { useState } from 'react';
import { api } from '../api';
import './EntryCard.css';

function EntryCard({ entry, canEdit, onDelete, onUpdate, isEditing, setIsEditing }) {
  const [formData, setFormData] = useState({
    title: entry.title || '',
    body: entry.body || '',
    tags: entry.tags || [],
    visibility: entry.visibility
  });

  const handleSave = async () => {
    try {
      await api.put(`/entries/${entry.id}`, formData);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      alert('Failed to update: ' + error.response?.data?.error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeLabel = (type) => {
    const labels = {
      journal: 'Journal',
      note: 'Note',
      moment: 'Moment',
      gallery: 'Gallery',
      mind: 'On My Mind'
    };
    return labels[type] || type;
  };

  if (isEditing) {
    return (
      <div className="card entry-card editing">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          placeholder="Content"
        />
        <div className="edit-actions">
          <button onClick={handleSave} className="btn-save">Save</button>
          <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card entry-card">
      <div className="entry-header">
        <span className="entry-type">{getTypeLabel(entry.type)}</span>
        <span className="entry-date">{formatDate(entry.created_at)}</span>
      </div>
      
      {entry.visibility === 'couple' && (
        <div className="entry-author">
          Created by {canEdit ? 'You' : 'Your Partner'}
        </div>
      )}
      
      {entry.title && <h3>{entry.title}</h3>}
      {entry.body && <p className="entry-body">{entry.body}</p>}
      
      {entry.photos && entry.photos.length > 0 && (
        <div className="entry-photos">
          {entry.photos.map((photo, idx) => (
            <img key={idx} src={photo} alt="" />
          ))}
        </div>
      )}
      
      {entry.tags && entry.tags.length > 0 && (
        <div className="entry-tags">
          {entry.tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
      )}
      
      {canEdit && (
        <div className="entry-actions">
          <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
          <button onClick={onDelete} className="btn-delete">Delete</button>
        </div>
      )}
    </div>
  );
}

export default EntryCard;
