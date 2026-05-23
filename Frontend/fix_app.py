import sys

path = '/Users/amanji/Documents/Lotus/Project plant/smart-crop-assistant/Frontend/src/App.jsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Imports
imports_old = "import React, { useState, useEffect, useRef } from 'react';\nimport { X, ChevronRight, Github, Twitter, Linkedin } from 'lucide-react';\n"
imports_new = """import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, Github, Twitter, Linkedin } from 'lucide-react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import Marketplace from './pages/Marketplace';
import Schemes from './pages/Schemes';
import { getTranslation, supportedLanguages } from './i18n';
"""
content = content.replace(imports_old, imports_new, 1)

# 2. Proxy
import re
proxy = """// Proxy so we don't have to rewrite t = T[lang] logic everywhere since it's now an async func or proxy
const T = new Proxy({}, {
  get: function(target, lang) {
    return new Proxy({}, {
      get: function(target2, key) {
        return getTranslation(lang, key);
      }
    });
  }
});
// ─── Utility: base64 → Blob (fixes "Error analyzing the image!") ───"""
content = re.sub(r'const T = \{.*?// ─── Utility: base64 → Blob \(fixes "Error analyzing the image!"\) ───', proxy, content, flags=re.DOTALL)

# 3. Auth State
state_old = "export default function SmartCropApp() {\n  const [activeModal, setActiveModal] = useState(null);\n  const [scrolled, setScrolled] = useState(false);\n  const [lang, setLang] = useState('en'); // 'en' | 'hi'"
state_new = """export default function SmartCropApp() {
  // --- AUTH STATE ---
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showRoleSelect, setShowRoleSelect] = useState(false);
  const [tempGoogleToken, setTempGoogleToken] = useState(null);
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setTempGoogleToken(tokenResponse.access_token);
      setShowRoleSelect(true); // Ask for role before completing login
    },
    onError: () => alert('Google Login Failed')
  });

  const handleRoleSelect = async (role) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/auth/google?token=${tempGoogleToken}&role=${role}`);
      setUser(res.data.user);
      setToken(res.data.access_token);
      setShowRoleSelect(false);
      setTempGoogleToken(null);
    } catch (err) {
      alert('Authentication error via Backend');
    }
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    setToken(null);
    navigate('/');
  };

  const [activeModal, setActiveModal] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' | 'hi'"""
content = content.replace(state_old, state_new, 1)

# 4. Navbar Links Replacement
nav_old = """            {/* Nav links + Language Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="hidden md:flex">
                {[t.navFeatures, t.navHow, t.navStats].map((item, i) => (
                  <a
                    key={i}
                    href={`#${['features', 'how', 'stats'][i]}`}
                    className="nav-link"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* ── Language Toggle: EN / HI only ── */}
              <div style={{
                display: 'flex', alignItems: 'center',
                background: 'var(--border-light)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '3px',
                gap: '2px',
              }}>
                {['en', 'hi'].map((code) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      letterSpacing: '0.04em',
                      transition: 'all 0.2s ease',
                      background: lang === code
                        ? 'linear-gradient(135deg, #059669, #047857)'
                        : 'transparent',
                      color: lang === code ? '#ffffff' : 'var(--text-muted)',
                      boxShadow: lang === code ? '0 2px 8px rgba(5,150,105,0.3)' : 'none',
                    }}
                  >
                    {code === 'en' ? 'EN' : 'HI'}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setActiveModal('crop')}
                className="btn-primary btn-shine hidden md:flex"
                style={{ padding: '0.625rem 1.375rem', fontSize: '0.875rem', borderRadius: '10px' }}
              >
                <span>{t.navCta}</span>
                <ChevronRight size={16} />
              </button>
            </div>"""

nav_new = """            {/* Nav links + Language Toggle */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Home</Link>
              <Link to="/marketplace" className="text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t.tryMarket || 'Marketplace'}</Link>
              <Link to="/schemes" className="text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t.trySchemes || 'Schemes'}</Link>
              
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-[var(--bg-section-alt)] border border-[var(--border-light)] text-[var(--text-primary)] text-xs font-bold rounded px-2 py-1.5 cursor-pointer outline-none">
                {supportedLanguages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>

              {user ? (
                <div className="flex items-center gap-4 ml-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-[var(--text-primary)] leading-tight">{user.name}</p>
                    <p className="text-xs text-[var(--text-muted)] uppercase">{user.role}</p>
                  </div>
                  <button onClick={handleLogout} className="btn bg-red-50 text-red-600 border border-red-200 hover:bg-red-100">{t.logout || 'Logout'}</button>
                </div>
              ) : (
                <button onClick={() => loginWithGoogle()} className="btn btn-primary ml-2 flex items-center gap-2">
                  Google Login
                </button>
              )}
            </div>"""
content = content.replace(nav_old, nav_new, 1)

# 5. Wrapping with Routes
hero_old = """      {/* ═══ HERO ═══ */}
      <section className="hero-section">"""
hero_new = """      <Routes>
        <Route path="/" element={
          <main>
      {/* ═══ HERO ═══ */}
      <section className="hero-section">"""
content = content.replace(hero_old, hero_new, 1)

# 6. Closing Routes and injecting Modals
end_old = """        </Modal>
      )}

    </div>
  );
}"""
end_new = """        </Modal>
      )}

      {/* ROLE SELECTION MODAL */}
      {showRoleSelect && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">Select Your Role</h2>
            <p className="text-[var(--text-muted)] mb-6">Are you a farmer looking to sell crops, or a vendor looking to buy?</p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleRoleSelect('farmer')} className="p-4 border-2 border-[var(--border-light)] rounded-xl hover:border-[var(--color-primary)] hover:bg-emerald-50 transition-all flex flex-col items-center">
                <div className="text-3xl mb-2">👨‍🌾</div>
                <div className="font-bold text-[var(--text-primary)]">Farmer</div>
              </button>
              <button onClick={() => handleRoleSelect('vendor')} className="p-4 border-2 border-[var(--border-light)] rounded-xl hover:border-[var(--color-primary)] hover:bg-emerald-50 transition-all flex flex-col items-center">
                <div className="text-3xl mb-2">🏪</div>
                <div className="font-bold text-[var(--text-primary)]">Vendor</div>
              </button>
            </div>
          </div>
        </div>
      )}

          </main>
        } />
        <Route path="/marketplace" element={<Marketplace user={user} token={token} />} />
        <Route path="/schemes" element={<Schemes />} />
      </Routes>
    </div>
  );
}"""
content = content.replace(end_old, end_new, 1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
