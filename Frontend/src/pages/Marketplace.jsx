import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const Marketplace = ({ user, token }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Farmer form state
  const [newCrop, setNewCrop] = useState({ name: '', qty: '', price: '' });

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
        price_per_kg: parseFloat(newCrop.price)
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Crop listed successfully!');
      setNewCrop({ name: '', qty: '', price: '' });
      fetchListings();
    } catch (err) {
      alert('Error posting crop');
    }
  };

  const handleBuy = async (listing) => {
    if (!user || user.role !== 'vendor') return alert('Only vendors can buy crops. Please login as a Vendor.');
    
    const qtyToBuy = prompt(`Enter quantity to buy (Max: ${listing.quantity_kg} kg):`, listing.quantity_kg);
    if (!qtyToBuy) return;

    try {
      // 1. Create order on backend
      const res = await axios.post(`${API_URL}/marketplace/buy/${listing.id}?amount_kg=${qtyToBuy}`, {}, {
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
          color: "#10b981"
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      alert(err.response?.data?.detail || 'Error initiating purchase');
    }
  };

  if (!user) {
    return (
      <div className="pt-32 text-center">
        <h2 className="text-3xl font-bold mb-4">Marketplace Access</h2>
        <p>Please login via the Google Login button in the top right to access the Marketplace.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="badge badge-emerald mb-4 inline-block">Direct Trade</span>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)]">B2B Marketplace</h1>
          <p className="text-[var(--text-secondary)] mt-2 text-lg">
            {user.role === 'farmer' ? 'List your crops for direct sale to verified vendors.' : 'Source fresh crops directly from verified farmers.'}
          </p>
        </div>
      </div>

      {user.role === 'farmer' && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-light)] p-8 rounded-2xl mb-12 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Post New Crop</h2>
          <form onSubmit={handlePostListing} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-bold text-[var(--text-muted)] mb-2">Crop Name</label>
              <input type="text" required value={newCrop.name} onChange={e => setNewCrop({...newCrop, name: e.target.value})} className="form-input w-full" placeholder="e.g. Wheat" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--text-muted)] mb-2">Quantity (kg)</label>
              <input type="number" required value={newCrop.qty} onChange={e => setNewCrop({...newCrop, qty: e.target.value})} className="form-input w-full" placeholder="e.g. 500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--text-muted)] mb-2">Price / kg (₹)</label>
              <input type="number" required value={newCrop.price} onChange={e => setNewCrop({...newCrop, price: e.target.value})} className="form-input w-full" placeholder="e.g. 25" />
            </div>
            <button type="submit" className="btn btn-primary w-full h-[50px]">List Crop</button>
          </form>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">Available Listings</h2>
      {loading ? <p>Loading market...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map(item => (
            <div key={item.id} className="bg-white border border-[var(--border-light)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-bl-xl font-bold text-sm">
                ₹{item.price_per_kg}/kg
              </div>
              <h3 className="text-xl font-bold mb-1">{item.crop_name}</h3>
              <p className="text-[var(--text-muted)] mb-4 text-sm">Farmer ID: {item.farmer_id}</p>
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">Available Stock</p>
                  <p className="font-bold text-lg">{item.quantity_kg} kg</p>
                </div>
              </div>

              {user.role === 'vendor' && (
                <button onClick={() => handleBuy(item)} className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors">
                  Buy Now
                </button>
              )}
            </div>
          ))}
          {listings.length === 0 && <p className="text-[var(--text-muted)] col-span-3">No crops currently listed.</p>}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
