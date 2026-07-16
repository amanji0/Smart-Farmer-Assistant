import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, MapPin, User, Mail, ShieldAlert } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function ProfileModal({ user, token, onClose, onLogout }) {
  const [address, setAddress] = useState(user?.address || '');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // profile, advanced

  useEffect(() => {
    // Optionally fetch latest profile if needed
    if (user && !user.address) {
      axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setAddress(res.data.address || '');
      }).catch(console.error);
    }
  }, [user, token]);

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setMsg('');
    try {
      await axios.put(`${API_URL}/auth/profile`, { address }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg('Profile updated successfully!');
      // Update local user object address so it reflects immediately
      user.address = address;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/auth/delete`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onLogout();
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete account');
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-secondary)', borderRadius: '20px', padding: '32px',
        width: '90%', maxWidth: '450px', position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid var(--border-subtle)'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px', background: 'none',
          border: 'none', color: 'var(--text-secondary)', cursor: 'pointer'
        }}>
          <X size={24} />
        </button>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
          Your Account
        </h2>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
          <button 
            onClick={() => setActiveTab('profile')} 
            style={{ 
              padding: '8px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
              background: activeTab === 'profile' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'profile' ? 'white' : 'var(--text-secondary)',
              border: 'none'
            }}
          >
            Profile
          </button>
          <button 
            onClick={() => setActiveTab('advanced')} 
            style={{ 
              padding: '8px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
              background: activeTab === 'advanced' ? 'var(--bg-tertiary)' : 'transparent',
              color: activeTab === 'advanced' ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: '1px solid',
              borderColor: activeTab === 'advanced' ? 'var(--border-subtle)' : 'transparent'
            }}
          >
            Advanced
          </button>
        </div>

        {error && <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: '0.875rem', marginBottom: '16px', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</div>}
        {msg && <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontSize: '0.875rem', marginBottom: '16px', border: '1px solid rgba(16,185,129,0.2)' }}>{msg}</div>}

        {activeTab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <User size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name || 'User'}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{user?.role}</div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Email</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--bg-tertiary)', borderRadius: '10px', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <Mail size={16} />
                <span>{user?.email}</span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Address</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
                <textarea 
                  rows={3} 
                  value={address} 
                  onChange={e => setAddress(e.target.value)}
                  style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '0.9rem', resize: 'vertical' }}
                  placeholder="Enter your full address here..." 
                />
              </div>
            </div>
            
            <button onClick={handleSave} disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Support Section */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Support & Help</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Need assistance with your crops, account, or the marketplace? Our team is here to help you 24/7.
              </p>
              <a href="mailto:support@smartfarmer.com" style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
                Contact Support
              </a>
            </div>

            <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

            {/* Danger Zone */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#ef4444', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldAlert size={18} /> Danger Zone
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Once you delete your account, there is no going back. All your data will be permanently removed.
              </p>
              
              {showDeleteConfirm ? (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={handleDelete} disabled={loading} style={{ flex: 1, padding: '10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                    Yes, Delete It
                  </button>
                  <button onClick={() => setShowDeleteConfirm(false)} style={{ flex: 1, padding: '10px', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowDeleteConfirm(true)} style={{ padding: '10px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                  Delete Account
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
