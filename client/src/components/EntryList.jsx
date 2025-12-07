import { useState } from 'react';
import { api } from '../api';
import EntryCard from './EntryCard';
import './EntryList.css';

function EntryList({ entries, mode, currentUserId, onUpdate }) {
  const [editingId, setEditingId] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    
    try {
      await api.delete(`/entries/${id}`);
      onUpdate();
    } catch (error) {
      alert('Failed to delete: ' + error.response?.data?.error);
    }
  };

  const canEdit = (entry) => {
    // Only the author can edit/delete their own content
    return entry.author_id === currentUserId;
  };

  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <p>No entries yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="entry-list">
      {entries.map(entry => (
        <EntryCard
          key={entry.id}
          entry={entry}
          canEdit={canEdit(entry)}
          onDelete={() => handleDelete(entry.id)}
          onUpdate={onUpdate}
          isEditing={editingId === entry.id}
          setIsEditing={(val) => setEditingId(val ? entry.id : null)}
        />
      ))}
    </div>
  );
}

export default EntryList;
