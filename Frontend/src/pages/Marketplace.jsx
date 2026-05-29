import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const Marketplace = ({ user, token, loginWithGoogle }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Farmer form state
  const [newCrop, setNewCrop] = useState({ name: '', qty: '', price: '', contact: '' });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get(`${API_URL}/marketplace/listings`);
      setListings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostListing = async (e) => {
    e.preventDefault();
    if (!user || user.role !== 'farmer') return alert('Only farmers can post crops');
    try {
      await axios.post(`${API_URL}/marketplace/listings`, {
        crop_name: newCrop.name,
        quantity_kg: parseFloat(newCrop.qty),
        price_per_kg: parseFloat(newCrop.price),
        contact_number: newCrop.contact
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Crop listed successfully!');
      setNewCrop({ name: '', qty: '', price: '', contact: '' });
      fetchListings();
    } catch (err) {
      alert('Error posting crop');
    }
  };

  const handleBuy = async (listing) => {
    if (!user || user.role !== 'vendor') return alert('Only vendors can buy crops. Please login as a Vendor.');
    
    const qtyToBuy = prompt(`Enter quantity to buy (Max: ${listing.quantity_kg} kg):`, listing.quantity_kg);
    if (!qtyToBuy) return;

    const vendorMobile = prompt("Enter your mobile number so the farmer can contact you:");

    try {
      // 1. Create order on backend
      const res = await axios.post(`${API_URL}/marketplace/buy/${listing.id}?amount_kg=${qtyToBuy}${vendorMobile ? `&contact_number=${vendorMobile}` : ''}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const orderData = res.data;

      // 2. Open Razorpay Checkout
      const options = {
        key: "rzp_test_YOUR_RAZORPAY_KEY", // Replace with real key in prod
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SmartCrop Marketplace",
        description: `Buying ${qtyToBuy}kg of ${listing.crop_name}`,
        order_id: orderData.order_id,
        handler: async function (response) {
          // 3. Verify Payment on Backend
          try {
            await axios.post(`${API_URL}/marketplace/verify`, null, {
              params: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }
            });
            alert('Payment Successful!');
            fetchListings();
          } catch (verifyErr) {
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#34d399"
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      alert(err.response?.data?.detail || 'Error initiating purchase');
    }
  };

  /* ── Not Logged In ── */
  if (!user) {
    return (
      <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="section-container animate-fade-in-up" style={{ textAlign: 'center', maxWidth: 520 }}>
          <div className="glass-card" style={{ padding: '3rem 2.5rem' }}>
            {/* Lock icon */}
            <div style={{
              width: 64, height: 64, borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-glass)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: 28
            }}>🔒</div>
            <h2 style={{
              fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)',
              marginBottom: '0.75rem', letterSpacing: '-0.025em'
            }}>Marketplace Access</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Please login to access the B2B Marketplace and start trading directly.
            </p>
            <button
              onClick={loginWithGoogle}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Login with Google
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* ── Main Marketplace ── */
  return (
    <section className="section" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
      <div className="section-container" style={{ maxWidth: 1200 }}>

        {/* ── Hero Header ── */}
        <div className="animate-fade-in-up stagger-1" style={{ marginBottom: '3.5rem' }}>
          <span className="badge-emerald" style={{ marginBottom: '1rem', display: 'inline-block' }}>Direct Trade</span>
          <h1 style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', fontWeight: 900,
            color: 'var(--text-primary)', letterSpacing: '-0.04em',
            lineHeight: 1.1, marginBottom: '0.75rem'
          }}>B2B Marketplace</h1>
          <p style={{
            color: 'var(--text-secondary)', fontSize: '1.125rem',
            maxWidth: 560, lineHeight: 1.6
          }}>
            {user.role === 'farmer'
              ? 'List your crops for direct sale to verified vendors.'
              : 'Source fresh crops directly from verified farmers.'}
          </p>
        </div>

        {/* ── Farmer Post Form ── */}
        {user.role === 'farmer' && (
          <div className="glass-card animate-fade-in-up stagger-2" style={{ padding: '2rem 2.5rem', marginBottom: '3.5rem' }}>
            <h2 style={{
              fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)',
              marginBottom: '1.75rem', letterSpacing: '-0.02em'
            }}>Post New Crop</h2>

            <form onSubmit={handlePostListing} style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.25rem', alignItems: 'end'
            }}>
              <div>
                <label className="form-label">Crop Name</label>
                <input
                  type="text" required
                  value={newCrop.name}
                  onChange={e => setNewCrop({ ...newCrop, name: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Wheat"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label className="form-label">Quantity (kg)</label>
                <input
                  type="number" required
                  value={newCrop.qty}
                  onChange={e => setNewCrop({ ...newCrop, qty: e.target.value })}
                  className="form-input"
                  placeholder="e.g. 500"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label className="form-label">Price / kg (₹)</label>
                <input
                  type="number" required
                  value={newCrop.price}
                  onChange={e => setNewCrop({ ...newCrop, price: e.target.value })}
                  className="form-input"
                  placeholder="e.g. 25"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label className="form-label">Mobile Number</label>
                <input
                  type="text" required
                  value={newCrop.contact}
                  onChange={e => setNewCrop({ ...newCrop, contact: e.target.value })}
                  className="form-input"
                  placeholder="e.g. 9876543210"
                  style={{ width: '100%' }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{
                height: 50, width: '100%', fontSize: '0.95rem'
              }}>List Crop</button>
            </form>
          </div>
        )}

        {/* ── Listings Header ── */}
        <div className="animate-fade-in-up stagger-3" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '1.75rem'
        }}>
          <h2 style={{
            fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
          }}>Available Listings</h2>
          <span style={{
            color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500
          }}>
            {!loading && `${listings.length} crop${listings.length !== 1 ? 's' : ''}`}
          </span>
        </div>

        {/* ── Loading State ── */}
        {loading ? (
          <div className="glass-card animate-fade-in-up" style={{
            padding: '4rem 2rem', textAlign: 'center'
          }}>
            <div style={{
              width: 40, height: 40, border: '3px solid var(--border-subtle)',
              borderTopColor: 'var(--color-primary)', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem'
            }} />
            <p style={{ color: 'var(--text-secondary)' }}>Loading market…</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <>
            {/* ── Listings Grid ── */}
            {listings.length === 0 ? (
              <div className="glass-card animate-fade-in-up" style={{
                padding: '4rem 2rem', textAlign: 'center'
              }}>
                <div style={{ fontSize: 40, marginBottom: '1rem' }}>🌾</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                  No crops currently listed.
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.5rem'
              }}>
                {listings.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`glass-card animate-fade-in-up stagger-${Math.min(idx + 1, 6)}`}
                    style={{
                      padding: '1.75rem 1.75rem 1.5rem',
                      display: 'flex', flexDirection: 'column',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'default',
                      position: 'relative', overflow: 'hidden'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(52,211,153,0.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Price badge */}
                    <div style={{
                      position: 'absolute', top: 0, right: 0,
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                      color: '#000', fontWeight: 700, fontSize: '0.8rem',
                      padding: '0.4rem 1rem', borderBottomLeftRadius: 'var(--radius-md)'
                    }}>
                      ₹{item.price_per_kg}/kg
                    </div>

                    {/* Crop info */}
                    <h3 style={{
                      fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)',
                      marginBottom: '0.25rem', letterSpacing: '-0.015em'
                    }}>{item.crop_name}</h3>
                    <p style={{
                      color: 'var(--text-muted)', fontSize: '0.8rem',
                      marginBottom: '0.25rem'
                    }}>Farmer ID: {item.farmer_id}</p>
                    {item.contact_number && (
                      <p style={{
                        color: 'var(--text-accent)', fontSize: '0.8rem',
                        marginBottom: '1.25rem', fontWeight: 600
                      }}>📞 {item.contact_number}</p>
                    )}
                    {!item.contact_number && <div style={{ marginBottom: '1.25rem' }}></div>}

                    {/* Stock section */}
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '1rem', borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-glass)', marginBottom: '1.25rem'
                    }}>
                      <div>
                        <p style={{
                          color: 'var(--text-muted)', fontSize: '0.75rem',
                          fontWeight: 500, textTransform: 'uppercase',
                          letterSpacing: '0.06em', marginBottom: '0.2rem'
                        }}>Available Stock</p>
                        <p style={{
                          color: 'var(--text-primary)', fontWeight: 700,
                          fontSize: '1.15rem'
                        }}>{item.quantity_kg} kg</p>
                      </div>
                      <div style={{
                        width: 44, height: 44, borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-glass)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: 22
                      }}>📦</div>
                    </div>

                    {/* Buy button for vendors */}
                    {user.role === 'vendor' && (
                      <button
                        onClick={() => handleBuy(item)}
                        className="btn-primary"
                        style={{ width: '100%', marginTop: 'auto', height: 48, fontSize: '0.95rem' }}
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Marketplace;
