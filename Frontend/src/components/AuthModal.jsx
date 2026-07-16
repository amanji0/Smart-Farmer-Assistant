import React, { useState } from 'react';
import axios from 'axios';
import { X, Mail, Lock, User, CheckCircle, Eye, EyeOff } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // login, register, verify
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('farmer');
  const [otp, setOtp] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMsg('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        const res = await axios.post(`${API_URL}/auth/login`, { email, password });
        onLoginSuccess(res.data.user, res.data.access_token);
      } else if (mode === 'register') {
        const res = await axios.post(`${API_URL}/auth/register`, { email, password, name, role });
        setMsg(res.data.message || 'Check your email for the OTP.');
        setMode('verify');
      } else if (mode === 'verify') {
        const res = await axios.post(`${API_URL}/auth/verify`, { email, otp });
        onLoginSuccess(res.data.user, res.data.access_token);
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
    } finally {
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
        width: '90%', maxWidth: '400px', position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid var(--border-subtle)'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px', background: 'none',
          border: 'none', color: 'var(--text-secondary)', cursor: 'pointer'
        }}>
          <X size={24} />
        </button>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
          {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Verify Email'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px' }}>
          {mode === 'login' ? 'Enter your credentials to access your account.' : mode === 'register' ? 'Join Smart Farmer as a farmer or vendor.' : `Enter the 6-digit code sent to ${email}`}
        </p>

        {error && <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: '0.875rem', marginBottom: '16px', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</div>}
        {msg && <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontSize: '0.875rem', marginBottom: '16px', border: '1px solid rgba(16,185,129,0.2)' }}>{msg}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {(mode === 'login' || mode === 'register') && (
            <>
              {mode === 'register' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
                    <input type="text" required value={name} onChange={e => setName(e.target.value)}
                      style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                      placeholder="John Doe" />
                  </div>
                </div>
              )}
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                    placeholder="you@example.com" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
                  <input type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px 40px 10px 38px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                    placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                    position: 'absolute', right: '12px', top: '11px', background: 'none', border: 'none',
                    color: 'var(--text-muted)', cursor: 'pointer', padding: 0, display: 'flex'
                  }}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Role</label>
                  <select value={role} onChange={e => setRole(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                    <option value="farmer">Farmer</option>
                    <option value="vendor">Vendor / Buyer</option>
                  </select>
                </div>
              )}
            </>
          )}

          {mode === 'verify' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>6-Digit OTP</label>
              <div style={{ position: 'relative' }}>
                <CheckCircle size={18} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
                <input type="text" required value={otp} onChange={e => setOtp(e.target.value)}
                  style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '1.2rem', letterSpacing: '2px', textAlign: 'center' }}
                  placeholder="123456" maxLength={6} />
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            background: 'var(--color-primary)', color: 'white', border: 'none', padding: '12px',
            borderRadius: '10px', fontWeight: 600, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, marginTop: '8px', transition: 'all 0.2s'
          }}>
            {loading ? 'Processing...' : mode === 'login' ? 'Login' : mode === 'register' ? 'Sign Up' : 'Verify & Login'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {mode === 'login' ? (
            <>Don't have an account? <span onClick={() => {setMode('register'); setError('');}} style={{ color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600 }}>Sign up</span></>
          ) : mode === 'register' ? (
            <>Already have an account? <span onClick={() => {setMode('login'); setError('');}} style={{ color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600 }}>Login</span></>
          ) : (
            <span onClick={() => setMode('register')} style={{ color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600 }}>Back to Sign Up</span>
          )}
        </div>

      </div>
    </div>
  );
}
