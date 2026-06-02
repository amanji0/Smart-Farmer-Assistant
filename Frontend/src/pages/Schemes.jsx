import React, { useState } from 'react';
import { FileText, Wallet, Users, Map, ShieldCheck, CreditCard, FlaskConical, UserCheck, Droplet, Store, Leaf, Tractor, Rocket, MapPin, Landmark, Building, Trees, Mountain, Sunrise, Factory, Palmtree, Flower2, Waves, Train, Castle, Sprout, Nut, Droplets, HardHat, Calendar, History, CheckSquare } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   CENTRAL GOVERNMENT SCHEMES
   ═══════════════════════════════════════════════════════════════ */
const centralSchemes = [
  {
    id: 'c1',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    icon: <Sprout size={28} strokeWidth={1.5} />,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    launchDate: 'February 2019',
    applyBy: 'Open Year-Round',
    benefits: [
      '₹6,000 per year paid in 3 equal installments of ₹2,000',
      'Direct Bank Transfer (DBT) to farmer\'s Aadhaar-linked account',
      'Covers all small and marginal farmer families',
    ],
    eligibility: 'All land-holding farmer families with cultivable land',
    beneficiaries: '11+ Crore Farmers',
    link: 'https://pmkisan.gov.in/',
  },
  {
    id: 'c2',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    launchDate: 'April 2016',
    applyBy: 'Kharif: Jul 31 | Rabi: Dec 31',
    benefits: [
      'Crop insurance at very low premium — 2% for Kharif, 1.5% for Rabi, 5% for horticulture',
      'Full claim amount with no cap on government subsidy',
      'Coverage for prevented sowing, mid-season adversity, post-harvest losses',
      'Use of satellite imagery & drones for faster claim settlement',
    ],
    eligibility: 'All farmers including sharecroppers and tenant farmers',
    beneficiaries: '4+ Crore Farmers',
    link: 'https://pmfby.gov.in/',
  },
  {
    id: 'c3',
    title: 'Kisan Credit Card (KCC) Scheme',
    icon: <CreditCard size={28} strokeWidth={1.5} />,
    ministry: 'Ministry of Finance / NABARD',
    launchDate: 'August 1998 (Revised 2019)',
    applyBy: 'Open Year-Round',
    benefits: [
      'Credit limit up to ₹3 lakh at subsidized interest rate of 4% p.a.',
      'Interest subvention of 2% + additional 3% for prompt repayment',
      'Covers crop production, animal husbandry, and fisheries',
      'Personal accident insurance cover of ₹50,000',
      'No collateral needed up to ₹1.6 lakh',
    ],
    eligibility: 'All farmers, fishermen, and animal husbandry farmers',
    beneficiaries: '7+ Crore Cards Issued',
    link: 'https://pmkisan.gov.in/KCC.aspx',
  },
  {
    id: 'c4',
    title: 'Soil Health Card Scheme',
    icon: <FlaskConical size={28} strokeWidth={1.5} />,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    launchDate: 'February 2015',
    applyBy: 'Open Year-Round',
    benefits: [
      'Free soil testing with nutrient status report every 2 years',
      'Crop-wise fertilizer and nutrient recommendations',
      'Helps reduce input costs by 8-10%',
      'Improves crop yield by up to 15-20%',
    ],
    eligibility: 'All farmers across India',
    beneficiaries: '23+ Crore Cards Distributed',
    link: 'https://soilhealth.dac.gov.in/',
  },
  {
    id: 'c5',
    title: 'PM Kisan MaanDhan Yojana (Pension)',
    icon: <UserCheck size={28} strokeWidth={1.5} />,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    launchDate: 'September 2019',
    applyBy: 'Open Year-Round (Age 18-40)',
    benefits: [
      'Monthly pension of ₹3,000 after age 60',
      'Monthly contribution: ₹55 to ₹200 (age-based)',
      'Government matches equal contribution',
      'Spouse eligible for 50% family pension',
    ],
    eligibility: 'Small & marginal farmers aged 18-40 with land up to 2 hectares',
    beneficiaries: '23+ Lakh Farmers',
    link: 'https://maandhan.in/',
  },
  {
    id: 'c6',
    title: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)',
    icon: <Droplet size={28} strokeWidth={1.5} />,
    ministry: 'Ministry of Agriculture / Jal Shakti',
    launchDate: 'July 2015',
    applyBy: 'Through State Agriculture Dept',
    benefits: [
      'Subsidized micro-irrigation (drip & sprinkler) — up to 55% subsidy for general, 70% for SC/ST',
      '"Per Drop More Crop" — water use efficiency improvement',
      'Piped irrigation network expansion to unirrigated areas',
      'Watershed development in rain-fed areas',
    ],
    eligibility: 'All farmers, priority to small and marginal',
    beneficiaries: '69+ Lakh Hectares Covered',
    link: 'https://pmksy.gov.in/',
  },
  {
    id: 'c7',
    title: 'e-NAM (National Agriculture Market)',
    icon: <Store size={28} strokeWidth={1.5} />,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    launchDate: 'April 2016',
    applyBy: 'Open Year-Round',
    benefits: [
      'Online trading of agricultural commodities — better price discovery',
      'Transparent bidding process across 1,000+ mandis',
      'Direct payment to farmer\'s bank account',
      'Eliminates middlemen — farmers get fair market price',
      'Free registration for all farmers',
    ],
    eligibility: 'All farmers with Aadhaar and bank account',
    beneficiaries: '1.77+ Crore Farmers',
    link: 'https://enam.gov.in/',
  },
  {
    id: 'c8',
    title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    icon: <Leaf size={28} strokeWidth={1.5} />,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    launchDate: '2015-16',
    applyBy: 'Through District Agriculture Office',
    benefits: [
      '₹50,000 per hectare over 3 years for organic farming',
      'Covers organic inputs, seeds, bio-fertilizers, bio-pesticides',
      'Certification & branding support for organic produce',
      'Marketing assistance through organic fairs',
    ],
    eligibility: 'Groups of 50+ farmers with minimum 50 acres cluster',
    beneficiaries: '30+ Lakh Farmers',
    link: 'https://pgsindia-ncof.gov.in/',
  },
  {
    id: 'c9',
    title: 'Agriculture Infrastructure Fund (AIF)',
    icon: <HardHat size={28} strokeWidth={1.5} />,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    launchDate: 'August 2020',
    applyBy: 'Open till 2032-33',
    benefits: [
      'Interest subvention of 3% on loans up to ₹2 Crore',
      'Credit guarantee coverage under CGTMSE',
      'For cold storage, warehouses, grading units, processing plants',
      '₹1 Lakh Crore total fund allocated',
    ],
    eligibility: 'Farmers, FPOs, PACS, startups, agri-entrepreneurs',
    beneficiaries: '40,000+ Projects Sanctioned',
    link: 'https://agriinfra.dac.gov.in/',
  },
  {
    id: 'c10',
    title: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    icon: <Tractor size={28} strokeWidth={1.5} />,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    launchDate: '2014-15',
    applyBy: 'Open Year-Round via State Depts',
    benefits: [
      '40-50% subsidy on farm equipment (tractors, tillers, harvesters)',
      'Custom Hiring Centres at village level',
      'Farm Machinery Banks for group use',
      'Special subsidies for women farmers & SC/ST',
    ],
    eligibility: 'All farmers, priority to small & marginal',
    beneficiaries: '15+ Lakh Farmers',
    link: 'https://agrimachinery.nic.in/',
  },
  {
    id: 'c11',
    title: 'National Mission on Oilseeds & Oil Palm (NMOOP)',
    icon: <Nut size={28} strokeWidth={1.5} />,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    launchDate: '2014-15 (Revised 2021 as NMEO-OP)',
    applyBy: 'Through State Horticulture Dept',
    benefits: [
      'Free or subsidized seeds for oilseed crops',
      '₹29,000/hectare for oil palm planting material',
      'Drip irrigation subsidy for oil palm',
      'Price assurance — viability gap funding for farmers',
    ],
    eligibility: 'Farmers in identified oilseed/oil palm growing areas',
    beneficiaries: '7+ Lakh Farmers',
    link: 'https://nmeo.dac.gov.in/',
  },
  {
    id: 'c12',
    title: 'Rashtriya Krishi Vikas Yojana (RKVY-RAFTAAR)',
    icon: <Rocket size={28} strokeWidth={1.5} />,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    launchDate: '2007 (Revamped 2017)',
    applyBy: 'Through State Government',
    benefits: [
      'Agri-startup funding up to ₹25 lakh',
      'Innovation & agri-entrepreneurship development',
      'Infrastructure for agriculture & allied sectors',
      'Incubation support in agriculture universities',
    ],
    eligibility: 'State governments, agri-startups, FPOs, individuals',
    beneficiaries: 'All States & UTs',
    link: 'https://rkvy.nic.in/',
  },
];

/* ═══════════════════════════════════════════════════════════════
   STATE-WISE SCHEMES
   ═══════════════════════════════════════════════════════════════ */
const stateSchemes = [
  {
    state: 'Uttar Pradesh',
    flag: <Landmark size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'UP Kisan Kalyan Mission',
        benefits: 'Free soil testing, seed distribution, and crop advisory for all UP farmers',
        applyBy: 'Open Year-Round',
        link: 'https://upagripardarshi.gov.in/',
      },
      {
        title: 'UP Kisan Uday Yojana',
        benefits: 'Free solar pumps for irrigation — saves ₹40,000-60,000/year on electricity',
        applyBy: 'Through Block Agriculture Office',
        link: 'https://upneda.org.in/',
      },
      {
        title: 'UP Agriculture Equipment Subsidy',
        benefits: '50% subsidy (up to ₹50,000) on power tillers, spray pumps, threshers',
        applyBy: 'Apply via upagriculture.com',
        link: 'https://upagriculture.com/',
      },
    ],
  },
  {
    state: 'Madhya Pradesh',
    flag: <Trees size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'Mukhyamantri Kisan Kalyan Yojana',
        benefits: '₹4,000/year additional income support on top of PM-KISAN (total ₹10,000)',
        applyBy: 'Automatic for PM-KISAN beneficiaries',
        link: 'https://mpkrishi.mp.gov.in/',
      },
      {
        title: 'Bhavantar Bhugtan Yojana',
        benefits: 'Price difference payment when market price falls below MSP for 8 crops',
        applyBy: 'Register at e-Uparjan portal',
        link: 'https://mpeuparjan.nic.in/',
      },
    ],
  },
  {
    state: 'Maharashtra',
    flag: <Mountain size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'Mahatma Jyotirao Phule Shetkari Karj Mukti Yojana',
        benefits: 'Farm loan waiver up to ₹2 lakh for eligible small and marginal farmers',
        applyBy: 'Through nationalized & cooperative banks',
        link: 'https://aaplesarkar.mahaonline.gov.in/',
      },
      {
        title: 'Nanaji Deshmukh Krishi Sanjivani Yojana',
        benefits: 'Climate-resilient farming support — ₹4,000 Crore project for drought-prone areas',
        applyBy: 'Through Gram Panchayat',
        link: 'https://mahapocra.gov.in/',
      },
      {
        title: 'Maharashtra Organic Farming Policy',
        benefits: '₹15,000/hectare subsidy for organic conversion, certification & marketing support',
        applyBy: 'Through District Agriculture Office',
        link: 'https://krishi.maharashtra.gov.in/',
      },
    ],
  },
  {
    state: 'Rajasthan',
    flag: <Sunrise size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'Mukhyamantri Krishak Sathi Yojana',
        benefits: '₹5,000 to ₹2 lakh financial aid for farm accidents, death, or disability',
        applyBy: 'Within 6 months of accident',
        link: 'https://rajkisan.rajasthan.gov.in/',
      },
      {
        title: 'Rajasthan Tanka Nirman Yojana',
        benefits: 'Free underground water tank construction for rainwater harvesting — up to ₹1.4 lakh',
        applyBy: 'Through Block Development Office',
        link: 'https://rajkisan.rajasthan.gov.in/',
      },
    ],
  },
  {
    state: 'Tamil Nadu',
    flag: <Landmark size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'TN Chief Minister\'s Solar Powered Pump Set Scheme',
        benefits: 'Free 5HP/7.5HP solar pump sets for farmland irrigation — worth ₹4-6 lakh',
        applyBy: 'Through TEDA office & Agri portal',
        link: 'https://www.tn.gov.in/scheme/data_view/7303',
      },
      {
        title: 'Tamil Nadu Crop Insurance',
        benefits: 'State-funded top-up on PMFBY — additional ₹20,000/hectare for crop loss',
        applyBy: 'Kharif: Jul 31 | Rabi: Dec 31',
        link: 'https://www.agri.tn.gov.in/',
      },
      {
        title: 'Free Milch Cow/Goat Scheme',
        benefits: '2 milch cows or 5 goats free to SC/ST women farmers for dairy income',
        applyBy: 'Through District Animal Husbandry Office',
        link: 'https://www.tn.gov.in/',
      },
    ],
  },
  {
    state: 'Punjab',
    flag: <Sprout size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'Punjab Kisan Smart Phone Scheme',
        benefits: 'Free smartphones to farmers for digital access to agri-services and mandi prices',
        applyBy: 'Through Agriculture Extension Office',
        link: 'https://agri.punjab.gov.in/',
      },
      {
        title: 'Pani Bachao Paise Kamao',
        benefits: '₹4/unit saved on electricity for shifting from paddy to less water-intensive crops',
        applyBy: 'Through PSPCL & Agri Dept',
        link: 'https://agri.punjab.gov.in/',
      },
    ],
  },
  {
    state: 'Karnataka',
    flag: <Building size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'Raitha Siri Yojana',
        benefits: '₹10,000/acre assistance for integrated farming (horticulture + field crops)',
        applyBy: 'Through Raitha Samparka Kendra',
        link: 'https://raitamitra.karnataka.gov.in/',
      },
      {
        title: 'Karnataka Rain Gun Subsidy',
        benefits: '90% subsidy on rain gun irrigation systems — saves 40% water',
        applyBy: 'Through Horticulture Department',
        link: 'https://raitamitra.karnataka.gov.in/',
      },
    ],
  },
  {
    state: 'Gujarat',
    flag: <Factory size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'Kisan Suryodaya Yojana',
        benefits: 'Daytime 3-phase electricity for farm irrigation (6 AM - 9 PM)',
        applyBy: 'Through PGVCL/MGVCL offices',
        link: 'https://ikisan.gujarat.gov.in/',
      },
      {
        title: 'Gujarat Mukhyamantri Pashupalan Yojana',
        benefits: 'Up to ₹12 lakh loan at 0% interest for dairy farming and cattle sheds',
        applyBy: 'Through District Animal Husbandry',
        link: 'https://ikisan.gujarat.gov.in/',
      },
    ],
  },
  {
    state: 'West Bengal',
    flag: <Flower2 size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'Krishak Bandhu Scheme',
        benefits: '₹10,000/year income support + ₹2 lakh life insurance for farm families',
        applyBy: 'Automatic enrollment via Aadhaar',
        link: 'https://krishakbandhu.net/',
      },
      {
        title: 'Bangla Shasya Bima Yojana',
        benefits: 'State crop insurance with zero farmer premium — govt pays 100% for 6 crops',
        applyBy: 'Automatic for registered farmers',
        link: 'https://banglashasyabima.net/',
      },
    ],
  },
  {
    state: 'Andhra Pradesh',
    flag: <Waves size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'YSR Rythu Bharosa',
        benefits: '₹13,500/year investment support per farmer family (₹7,500 Kharif + ₹4,000 Rabi + ₹2,000 PM-KISAN)',
        applyBy: 'Automatic for eligible farmers',
        link: 'https://ysrrythubharosa.ap.gov.in/',
      },
      {
        title: 'AP Zero-Budget Natural Farming (ZBNF)',
        benefits: 'Free training, bio-inputs & ₹3,000/acre support for chemical-free farming',
        applyBy: 'Through Village Agriculture Assistant',
        link: 'https://apzbnf.in/',
      },
    ],
  },
  {
    state: 'Telangana',
    flag: <Castle size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'Rythu Bandhu Scheme',
        benefits: '₹10,000/acre/year investment support (₹5,000 each for Kharif & Rabi season)',
        applyBy: 'Automatic via land records (Dharani portal)',
        link: 'https://rythubandhu.telangana.gov.in/',
      },
      {
        title: 'Rythu Bima (Farmer Insurance)',
        benefits: '₹5 lakh life insurance at zero cost — premium paid entirely by state govt',
        applyBy: 'Automatic enrollment for Rythu Bandhu beneficiaries',
        link: 'https://rythubandhu.telangana.gov.in/',
      },
    ],
  },
  {
    state: 'Kerala',
    flag: <Palmtree size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'Kerala Coconut Palm Insurance',
        benefits: '₹900/palm insurance — ₹5,000 per damaged palm + replanting cost',
        applyBy: 'Through Krishi Bhavan',
        link: 'https://keralaagriculture.gov.in/',
      },
      {
        title: 'Subhiksha Keralam (Food Security)',
        benefits: 'Free seeds, fertilizers & ₹2,000/acre for growing rice and vegetables',
        applyBy: 'Through local Krishi Bhavan',
        link: 'https://subhikshakeralam.kerala.gov.in/',
      },
    ],
  },
  {
    state: 'Bihar',
    flag: <MapPin size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'Bihar Rajya Fasal Sahayata Yojana',
        benefits: '₹7,500/hectare (20% loss) to ₹10,000/hectare (>20% loss) — no premium required',
        applyBy: 'Online at state portal within 15 days of loss',
        link: 'https://state.bihar.gov.in/',
      },
      {
        title: 'Bihar Diesel Anudan Yojana',
        benefits: '₹750/acre diesel subsidy for irrigation during drought — up to 8 acres',
        applyBy: 'Through District Agriculture Office',
        link: 'https://dbtagriculture.bihar.gov.in/',
      },
    ],
  },
  {
    state: 'Odisha',
    flag: <Train size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'KALIA (Krushak Assistance for Livelihood & Income Augmentation)',
        benefits: '₹10,000/year for small farmers + ₹12,500 for landless agri households',
        applyBy: 'Automatic enrollment via Aadhaar',
        link: 'https://kalia.odisha.gov.in/',
      },
      {
        title: 'Odisha Balaram Yojana',
        benefits: 'Interest-free crop loans up to ₹1 lakh for landless cultivators via SHGs',
        applyBy: 'Through Women SHG network',
        link: 'https://odisha.gov.in/',
      },
    ],
  },
  {
    state: 'Haryana',
    flag: <Leaf size={24} strokeWidth={1.5} />,
    schemes: [
      {
        title: 'Meri Fasal Mera Byora',
        benefits: 'Guaranteed MSP procurement + direct benefit transfers for registered crops',
        applyBy: 'Registration open during sowing season',
        link: 'https://fasal.haryana.gov.in/',
      },
      {
        title: 'Haryana Bhavantar Bharpayee Yojana',
        benefits: 'Price deficiency payment for vegetables — difference between MSP & market rate',
        applyBy: 'Register at Meri Fasal portal',
        link: 'https://fasal.haryana.gov.in/',
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEME CARD COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const SchemeCard = ({ scheme, index, isState }) => (
  <div
    className={`animate-fade-in-up stagger-${(index % 6) + 1}`}
    style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-2xl)',
      padding: isState ? '24px 28px' : '32px 32px 28px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.35s cubic-bezier(.25,.8,.25,1), border-color 0.35s ease, box-shadow 0.35s ease',
      cursor: 'default',
      opacity: 0,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.25)';
      e.currentTarget.style.boxShadow =
        '0 -2px 20px -4px rgba(52, 211, 153, 0.18), 0 12px 40px -8px rgba(0,0,0,0.5)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'var(--border-subtle)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {/* Top glow bar */}
    <div className="scheme-glow-bar" style={{
      position: 'absolute', top: 0, left: '10%', right: '10%', height: 2,
      background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
      opacity: 0, transition: 'opacity 0.35s ease', pointerEvents: 'none',
    }} />

    {!isState && (
      <>
        {/* Icon */}
        <div style={{
          fontSize: '2rem', marginBottom: 16, width: 52, height: 52,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 'var(--radius-md)', background: 'rgba(52, 211, 153, 0.08)',
          border: '1px solid rgba(52, 211, 153, 0.12)',
        }}>
          {scheme.icon}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700,
          color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.35,
        }}>
          {scheme.title}
        </h3>

        {/* Ministry badge */}
        <div style={{
          fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 16,
          padding: '4px 10px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-full)',
          display: 'inline-block', border: '1px solid var(--border-subtle)',
        }}>
          {scheme.ministry}
        </div>

        {/* Info chips row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem',
            fontWeight: 600, background: 'rgba(52,211,153,0.1)', color: 'var(--color-primary)',
            border: '1px solid rgba(52,211,153,0.2)',
          }}>
            <Calendar size={14} strokeWidth={2} /> {scheme.applyBy}
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem',
            fontWeight: 600, background: 'rgba(59,130,246,0.1)', color: '#60a5fa',
            border: '1px solid rgba(59,130,246,0.2)',
          }}>
            <Users size={14} strokeWidth={2} /> {scheme.beneficiaries}
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem',
            fontWeight: 600, background: 'rgba(168,85,247,0.1)', color: '#a78bfa',
            border: '1px solid rgba(168,85,247,0.2)',
          }}>
            <History size={14} strokeWidth={2} /> Since {scheme.launchDate}
          </span>
        </div>

        {/* Benefits */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <CheckSquare size={14} strokeWidth={2.5} color="var(--color-primary)" /> Key Benefits
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {scheme.benefits.map((b, i) => (
              <li key={i} style={{
                fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6,
                paddingLeft: 20, position: 'relative',
              }}>
                <span style={{ position: 'absolute', left: 0, top: 0, color: 'var(--color-primary)' }}>›</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Eligibility */}
        <div style={{
          padding: '10px 14px', borderRadius: 'var(--radius-md)',
          background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
          marginBottom: 20,
        }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 2 }}>
            WHO CAN APPLY
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {scheme.eligibility}
          </p>
        </div>
      </>
    )}

    {/* State scheme (compact) */}
    {isState && (
      <>
        <h4 style={{
          fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700,
          color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.35,
        }}>
          {scheme.title}
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 12 }}>
          {scheme.benefits}
        </p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '5px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem',
          fontWeight: 600, background: 'rgba(52,211,153,0.1)', color: 'var(--color-primary)',
          border: '1px solid rgba(52,211,153,0.2)', marginBottom: 14,
        }}>
          <Calendar size={14} strokeWidth={2} /> {scheme.applyBy}
        </div>
      </>
    )}

    {/* CTA */}
    <a
      href={scheme.link}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: isState ? '8px 18px' : '10px 22px',
        borderRadius: 'var(--radius-md)', fontSize: isState ? '0.8rem' : '0.875rem',
        fontWeight: 600, textDecoration: 'none',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.03)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {isState ? 'Apply Now' : 'Learn More & Apply'}
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </a>
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   MAIN SCHEMES COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const Schemes = ({ t }) => {
  const [activeTab, setActiveTab] = useState('central');
  const [expandedState, setExpandedState] = useState(null);

  return (
    <section className="section" style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="section-container" style={{ maxWidth: 1200 }}>

        {/* ── Page Header ── */}
        <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: 48, paddingTop: '5rem' }}>
          <span className="section-label" style={{ letterSpacing: '0.15em' }}>
            {t?.schemesLabel || 'GOVERNMENT INITIATIVES'}
          </span>
          <h1 className="section-title" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 800, color: 'var(--text-primary)', marginTop: 12, marginBottom: 16, lineHeight: 1.15,
          }}>
            {t?.schemesTitle || 'Farmer Welfare Schemes'}
          </h1>
          <p className="section-subtitle" style={{
            fontSize: '1.05rem', color: 'var(--text-secondary)',
            maxWidth: 640, margin: '0 auto', lineHeight: 1.7,
          }}>
            {t?.schemesDesc || 'Complete guide to Central & State government schemes — with benefits, eligibility, and direct apply links.'}
          </p>
        </div>

        {/* ── Tab Switcher ── */}
        <div className="animate-fade-in-up stagger-1" style={{
          display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 48,
          padding: '6px', borderRadius: 'var(--radius-full)',
          background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
          maxWidth: 520, margin: '0 auto 48px',
        }}>
          {[
            { key: 'central', label: t?.centralSchemes || '🏛️ Central Govt Schemes', count: centralSchemes.length },
            { key: 'state', label: t?.stateSchemes || '🗺️ State-wise Schemes', count: stateSchemes.length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setExpandedState(null); }}
              style={{
                flex: 1, padding: '12px 20px', borderRadius: 'var(--radius-full)',
                border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                fontFamily: 'var(--font-sans)',
                background: activeTab === tab.key
                  ? 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))'
                  : 'transparent',
                color: activeTab === tab.key ? '#000' : 'var(--text-secondary)',
                transition: 'all 0.3s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              {tab.label}
              <span style={{
                fontSize: '0.7rem', padding: '2px 8px', borderRadius: 'var(--radius-full)',
                background: activeTab === tab.key ? 'rgba(0,0,0,0.15)' : 'var(--bg-glass)',
                fontWeight: 700,
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ══════ CENTRAL SCHEMES TAB ══════ */}
        {activeTab === 'central' && (
          <div>
            {/* Summary Stats */}
            <div className="animate-fade-in-up" style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 16, marginBottom: 40,
            }}>
              {[
                { val: '12+', label: 'Active Schemes', icon: <FileText size={28} strokeWidth={1.5} /> },
                { val: '₹1.5L Cr+', label: 'Total Budget', icon: <Wallet size={28} strokeWidth={1.5} /> },
                { val: '15+ Cr', label: 'Farmers Covered', icon: <Users size={28} strokeWidth={1.5} /> },
                { val: '100%', label: 'States Covered', icon: <Map size={28} strokeWidth={1.5} /> },
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{
                  textAlign: 'center', padding: '24px 16px', borderRadius: 'var(--radius-xl)',
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(52, 211, 153, 0.1)';
                  e.currentTarget.querySelector('.icon-wrapper').style.transform = 'scale(1.1) rotate(5deg)';
                  e.currentTarget.querySelector('.icon-wrapper').style.color = 'var(--color-primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.querySelector('.icon-wrapper').style.transform = 'scale(1) rotate(0deg)';
                  e.currentTarget.querySelector('.icon-wrapper').style.color = 'var(--text-secondary)';
                }}>
                  <div className="icon-wrapper" style={{ 
                    marginBottom: 12, color: 'var(--text-secondary)', 
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
                  }}>
                    {s.icon}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: 4 }}>{s.val}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.02em' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Central Scheme Cards */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 500px), 1fr))',
              gap: 24,
            }}>
              {centralSchemes.map((scheme, i) => (
                <SchemeCard key={scheme.id} scheme={scheme} index={i} isState={false} />
              ))}
            </div>
          </div>
        )}

        {/* ══════ STATE-WISE SCHEMES TAB ══════ */}
        {activeTab === 'state' && (
          <div>
            {/* State Grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 560px), 1fr))',
              gap: 24,
            }}>
              {stateSchemes.map((stateData, si) => (
                <div
                  key={stateData.state}
                  className={`animate-fade-in-up stagger-${(si % 6) + 1}`}
                  style={{
                    borderRadius: 'var(--radius-2xl)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-card)',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease',
                    opacity: 0,
                  }}
                >
                  {/* State Header */}
                  <button
                    onClick={() => setExpandedState(expandedState === stateData.state ? null : stateData.state)}
                    style={{
                      width: '100%', padding: '20px 28px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: expandedState === stateData.state
                        ? 'linear-gradient(135deg, rgba(52,211,153,0.08), rgba(52,211,153,0.02))'
                        : 'transparent',
                      border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{
                        fontSize: '1.6rem', width: 46, height: 46, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
                      }}>
                        {stateData.flag}
                      </span>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{
                          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem',
                          color: 'var(--text-primary)',
                        }}>
                          {stateData.state}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {stateData.schemes.length} scheme{stateData.schemes.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '1.2rem', color: 'var(--text-muted)',
                      transition: 'transform 0.3s ease',
                      transform: expandedState === stateData.state ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}>
                      ›
                    </span>
                  </button>

                  {/* Expanded Schemes */}
                  {expandedState === stateData.state && (
                    <div style={{ padding: '4px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {stateData.schemes.map((scheme, i) => (
                        <SchemeCard key={i} scheme={scheme} index={i} isState={true} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scoped hover style */}
      <style>{`
        div:hover > .scheme-glow-bar {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};

export default Schemes;
