import React, { useState, useEffect } from 'react';

const Schemes = () => {
  const [schemes] = useState([
    {
      id: 1,
      title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      description: 'An initiative by the government of India in which all farmers will get up to ₹6,000 per year as minimum income support.',
      link: 'https://pmkisan.gov.in/'
    },
    {
      id: 2,
      title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      description: 'Provides insurance coverage and financial support to farmers in the event of crop failure as a result of natural calamities, pests & diseases.',
      link: 'https://pmfby.gov.in/'
    },
    {
      id: 3,
      title: 'Soil Health Card Scheme',
      description: 'Government issues soil cards to farmers which will carry crop-wise recommendations of nutrients and fertilizers required for the individual farms.',
      link: 'https://soilhealth.dac.gov.in/'
    },
    {
      id: 4,
      title: 'Kisan Credit Card (KCC) Scheme',
      description: 'Aims to save farmers from high-interest rates usually charged by money lenders. Provides credit for agricultural needs.',
      link: 'https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card'
    }
  ]);

  return (
    <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="badge badge-emerald mb-4 inline-block">Government Support</span>
        <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-6">Agricultural Schemes</h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Explore key government initiatives designed to support farmers financially and provide resources for better yield.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {schemes.map(scheme => (
          <div key={scheme.id} className="bg-[var(--bg-card)] border border-[var(--border-light)] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{scheme.title}</h3>
            <p className="text-[var(--text-secondary)] mb-6">{scheme.description}</p>
            <a 
              href={scheme.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-primary)] font-bold hover:text-emerald-700 transition-colors"
            >
              Learn More & Apply →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schemes;
