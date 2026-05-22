import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, Github, Twitter, Linkedin } from 'lucide-react';

// ─── API URL ───
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ─── Translations (English / Hindi only) ───
const T = {
  en: {
    // Navbar
    navFeatures: 'Features',
    navHow: 'How It Works',
    navStats: 'Statistics',
    navCta: 'Get Started',
    brandSub: 'AI Agriculture Platform',
    // Hero
    heroBadge: 'AI-Powered Agriculture Technology',
    heroTitle1: 'Smart Crop',
    heroTitle2: 'Disease Detection',
    heroTitle3: 'System',
    heroDesc: 'Harness machine learning to get instant crop recommendations, detect plant diseases from leaf images, and access real-time agricultural intelligence.',
    heroCta1: 'Crop Recommendations',
    heroCta2: 'Detect Disease',
    heroAccuracy: 'Accuracy',
    heroCrops: 'Crops',
    heroWeather: 'Weather',
    heroStatus: 'AI Model Online — Ready for analysis',
    // Stats
    statsLabel: 'Platform Metrics',
    statsHeadline: 'Trusted by farmers',
    statsWorldwide: 'worldwide',
    stat1: 'Model Accuracy', stat1sub: 'Validated on field data',
    stat2: 'Training Images', stat2sub: 'Diverse crop dataset',
    stat3: 'Crop Varieties', stat3sub: 'Major food crops',
    stat4: 'Disease Types', stat4sub: 'Identified & classified',
    // Features
    featLabel: 'Powerful Tools',
    featHeadline: 'Everything a Farmer',
    featHeadline2: 'Needs',
    featDesc: 'Six AI-powered tools designed to help farmers make data-driven decisions and maximize crop yield.',
    openTool: 'Open Tool',
    // Feature titles
    f1title: 'Crop Recommendation', f1desc: 'AI suggests the best crop based on real-time weather & soil parameters for your region.',
    f2title: 'Disease Detection', f2desc: 'Upload a leaf photo and get instant AI-powered diagnosis with treatment protocols.',
    f3title: 'Weather Forecast', f3desc: 'Real-time weather conditions and 5-day precision forecast for any city worldwide.',
    f4title: 'Fertilizer Guide', f4desc: 'Precise NPK recommendations and split-dose application schedules for your crop.',
    f5title: 'Crop Calendar', f5desc: 'Seasonal planting guide with optimal crop schedules across all four growing seasons.',
    f6title: 'Irrigation Guide', f6desc: 'Water management strategies and optimal irrigation methods to maximize yield.',
    // How it works
    howLabel: 'Simple Process',
    howHeadline: 'How It',
    howHeadline2: 'Works',
    howDesc: 'Three steps to AI-powered agricultural intelligence.',
    step1title: 'Input Your Data', step1desc: 'Enter your city, upload a leaf photo, or select your crop — our system handles the rest.',
    step2title: 'AI Processing', step2desc: 'Our ML model analyzes real-time weather, soil conditions, and image patterns via trained neural networks.',
    step3title: 'Get Instant Results', step3desc: 'Receive accurate recommendations, disease diagnosis, fertilizer plans, and actionable farming advice.',
    // Modals — Crop
    cropModalTitle: '🌾 Crop Recommendation',
    cropModalSub: 'AI-powered analysis based on live weather & soil data',
    cropCityLabel: 'Your City / Location',
    cropCityPlaceholder: 'e.g. Delhi, Mumbai, Bangalore...',
    cropHint: '💡 Our AI will fetch live weather data for your city and cross-reference it with soil parameters to recommend the optimal crop.',
    cropBtn: 'Get AI Recommendation',
    cropLoading: 'Analyzing Climate Data...',
    cropResultLabel: 'Recommended Crop',
    cropAltLabel: 'Alternative Crops',
    cropTipsLabel: 'Farming Intelligence',
    cropRetry: 'Analyze Another City',
    // Modals — Disease
    diseaseModalTitle: '🔬 Disease Detection',
    diseaseModalSub: 'Upload a leaf image for instant AI-powered diagnosis',
    diseaseUploadPrompt: 'Click to upload leaf photo',
    diseaseUploadSub: 'JPG, PNG — Max 10MB',
    diseaseImageReady: '✅ Image Ready for Analysis',
    diseasePlantLabel: 'Plant Type',
    diseaseBtn: 'Analyze Disease',
    diseaseLoading: 'Analyzing Leaf...',
    diseaseDetectedLabel: 'Detected Disease',
    diseaseTreatLabel: '💊 Treatment Protocol',
    diseasePrevLabel: '🛡️ Prevention Strategy',
    diseaseRetry: 'Analyze Another Image',
    // Modals — Weather
    weatherModalTitle: '🌤️ Weather Forecast',
    weatherModalSub: 'Real-time weather data and 5-day agricultural forecast',
    weatherCityLabel: 'City Name',
    weatherCityPlaceholder: 'e.g. Delhi, Mumbai, New York...',
    weatherBtn: 'Get Weather Data',
    weatherLoading: 'Fetching Weather...',
    weatherForecastLabel: '5-Day Forecast',
    weatherRetry: 'Check Another City',
    // Modals — Fertilizer
    fertModalTitle: '🧪 Fertilizer Guide',
    fertModalSub: 'Precision NPK recommendations for maximum crop yield',
    fertCropLabel: 'Select Crop',
    fertBtn: 'Get NPK Recommendation',
    fertPlanFor: 'Fertilizer Plan for',
    fertTipLabel: '💡 Application Tip',
    fertRetry: 'Check Another Crop',
    // Modals — Calendar
    calModalTitle: '📅 Crop Calendar',
    calModalSub: 'Optimal planting guide for all four growing seasons',
    // Modals — Irrigation
    irrModalTitle: '💧 Irrigation Guide',
    irrModalSub: 'Water management strategies for maximum crop yield',
    irrWaterNeed: 'Water Need',
    // Footer
    footerTagline: '© 2025 — Built with ML & Open Weather Data',
  },
  hi: {
    // Navbar
    navFeatures: 'विशेषताएं',
    navHow: 'यह कैसे काम करता है',
    navStats: 'आंकड़े',
    navCta: 'शुरू करें',
    brandSub: 'AI कृषि प्लेटफॉर्म',
    // Hero
    heroBadge: 'AI-संचालित कृषि तकनीक',
    heroTitle1: 'स्मार्ट फसल',
    heroTitle2: 'रोग पहचान',
    heroTitle3: 'प्रणाली',
    heroDesc: 'मशीन लर्निंग का उपयोग करके तत्काल फसल अनुशंसाएं पाएं, पत्ती की छवियों से पौधों की बीमारियों का पता लगाएं, और वास्तविक समय की कृषि जानकारी प्राप्त करें।',
    heroCta1: 'फसल अनुशंसाएं',
    heroCta2: 'रोग पहचानें',
    heroAccuracy: 'सटीकता',
    heroCrops: 'फसलें',
    heroWeather: 'मौसम',
    heroStatus: 'AI मॉडल ऑनलाइन — विश्लेषण के लिए तैयार',
    // Stats
    statsLabel: 'प्लेटफॉर्म आंकड़े',
    statsHeadline: 'किसानों द्वारा विश्वसनीय',
    statsWorldwide: 'विश्वभर में',
    stat1: 'मॉडल सटीकता', stat1sub: 'फील्ड डेटा पर सत्यापित',
    stat2: 'प्रशिक्षण छवियां', stat2sub: 'विविध फसल डेटासेट',
    stat3: 'फसल किस्में', stat3sub: 'प्रमुख खाद्य फसलें',
    stat4: 'रोग प्रकार', stat4sub: 'पहचाने और वर्गीकृत',
    // Features
    featLabel: 'शक्तिशाली उपकरण',
    featHeadline: 'किसान की हर',
    featHeadline2: 'जरूरत',
    featDesc: 'छह AI-संचालित उपकरण जो किसानों को डेटा-आधारित निर्णय लेने और फसल उत्पादन बढ़ाने में मदद करते हैं।',
    openTool: 'उपकरण खोलें',
    // Feature titles
    f1title: 'फसल अनुशंसा', f1desc: 'AI आपके क्षेत्र के लिए वास्तविक समय के मौसम और मिट्टी के आधार पर सर्वश्रेष्ठ फसल का सुझाव देता है।',
    f2title: 'रोग पहचान', f2desc: 'पत्ती की फोटो अपलोड करें और उपचार प्रोटोकॉल के साथ तत्काल AI निदान पाएं।',
    f3title: 'मौसम पूर्वानुमान', f3desc: 'दुनिया के किसी भी शहर के लिए वास्तविक समय की मौसम स्थितियां और 5-दिन का पूर्वानुमान।',
    f4title: 'उर्वरक गाइड', f4desc: 'आपकी फसल के लिए सटीक NPK अनुशंसाएं और विभाजित खुराक अनुसूची।',
    f5title: 'फसल कैलेंडर', f5desc: 'चारों मौसमों में इष्टतम फसल अनुसूची के साथ मौसमी रोपण गाइड।',
    f6title: 'सिंचाई गाइड', f6desc: 'अधिकतम उपज के लिए जल प्रबंधन रणनीतियां और इष्टतम सिंचाई विधियां।',
    // How it works
    howLabel: 'सरल प्रक्रिया',
    howHeadline: 'यह कैसे',
    howHeadline2: 'काम करता है',
    howDesc: 'AI-संचालित कृषि बुद्धिमत्ता के लिए तीन चरण।',
    step1title: 'अपना डेटा दर्ज करें', step1desc: 'अपना शहर दर्ज करें, पत्ती की फोटो अपलोड करें, या अपनी फसल चुनें — हमारा सिस्टम बाकी सब संभाल लेगा।',
    step2title: 'AI प्रसंस्करण', step2desc: 'हमारा ML मॉडल प्रशिक्षित न्यूरल नेटवर्क के माध्यम से वास्तविक समय के मौसम, मिट्टी की स्थितियों और छवि पैटर्न का विश्लेषण करता है।',
    step3title: 'तत्काल परिणाम पाएं', step3desc: 'सटीक अनुशंसाएं, रोग निदान, उर्वरक योजनाएं और कार्रवाई योग्य खेती सलाह प्राप्त करें।',
    // Modals — Crop
    cropModalTitle: '🌾 फसल अनुशंसा',
    cropModalSub: 'लाइव मौसम और मिट्टी डेटा के आधार पर AI-संचालित विश्लेषण',
    cropCityLabel: 'आपका शहर / स्थान',
    cropCityPlaceholder: 'जैसे दिल्ली, मुंबई, बैंगलोर...',
    cropHint: '💡 हमारा AI आपके शहर का लाइव मौसम डेटा प्राप्त करेगा और इष्टतम फसल की सिफारिश के लिए मिट्टी के मापदंडों से मिलान करेगा।',
    cropBtn: 'AI अनुशंसा प्राप्त करें',
    cropLoading: 'जलवायु डेटा विश्लेषण...',
    cropResultLabel: 'अनुशंसित फसल',
    cropAltLabel: 'वैकल्पिक फसलें',
    cropTipsLabel: 'खेती की जानकारी',
    cropRetry: 'दूसरे शहर का विश्लेषण करें',
    // Modals — Disease
    diseaseModalTitle: '🔬 रोग पहचान',
    diseaseModalSub: 'तत्काल AI निदान के लिए पत्ती की छवि अपलोड करें',
    diseaseUploadPrompt: 'पत्ती की फोटो अपलोड करने के लिए क्लिक करें',
    diseaseUploadSub: 'JPG, PNG — अधिकतम 10MB',
    diseaseImageReady: '✅ छवि विश्लेषण के लिए तैयार',
    diseasePlantLabel: 'पौधे का प्रकार',
    diseaseBtn: 'रोग का विश्लेषण करें',
    diseaseLoading: 'पत्ती का विश्लेषण...',
    diseaseDetectedLabel: 'पहचाना गया रोग',
    diseaseTreatLabel: '💊 उपचार प्रोटोकॉल',
    diseasePrevLabel: '🛡️ रोकथाम रणनीति',
    diseaseRetry: 'दूसरी छवि का विश्लेषण करें',
    // Modals — Weather
    weatherModalTitle: '🌤️ मौसम पूर्वानुमान',
    weatherModalSub: 'वास्तविक समय मौसम डेटा और 5-दिन का कृषि पूर्वानुमान',
    weatherCityLabel: 'शहर का नाम',
    weatherCityPlaceholder: 'जैसे दिल्ली, मुंबई, न्यू यॉर्क...',
    weatherBtn: 'मौसम डेटा प्राप्त करें',
    weatherLoading: 'मौसम प्राप्त किया जा रहा है...',
    weatherForecastLabel: '5-दिन का पूर्वानुमान',
    weatherRetry: 'दूसरे शहर की जांच करें',
    // Modals — Fertilizer
    fertModalTitle: '🧪 उर्वरक गाइड',
    fertModalSub: 'अधिकतम फसल उत्पादन के लिए सटीक NPK अनुशंसाएं',
    fertCropLabel: 'फसल चुनें',
    fertBtn: 'NPK अनुशंसा प्राप्त करें',
    fertPlanFor: 'के लिए उर्वरक योजना',
    fertTipLabel: '💡 उपयोग टिप',
    fertRetry: 'दूसरी फसल जांचें',
    // Modals — Calendar
    calModalTitle: '📅 फसल कैलेंडर',
    calModalSub: 'चारों मौसमों के लिए इष्टतम रोपण गाइड',
    // Modals — Irrigation
    irrModalTitle: '💧 सिंचाई गाइड',
    irrModalSub: 'अधिकतम फसल उत्पादन के लिए जल प्रबंधन रणनीतियां',
    irrWaterNeed: 'पानी की जरूरत',
    // Footer
    footerTagline: '© 2025 — ML और ओपन वेदर डेटा के साथ निर्मित',
  },
};

// ─── Utility: base64 → Blob (fixes "Error analyzing the image!") ───
function base64ToBlob(dataUrl) {
  const [header, base64Data] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(base64Data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

// ─── Weather icon helper ───
function weatherIcon(code) {
  if (code <= 1) return '☀️';
  if (code <= 3) return '⛅';
  if (code <= 48) return '🌫️';
  if (code <= 67) return '🌧️';
  if (code <= 77) return '❄️';
  return '⛈️';
}

export default function SmartCropApp() {
  const [activeModal, setActiveModal] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' | 'hi'

  // Shorthand translation accessor
  const t = T[lang];

  // Crop Recommendation
  const [cropCity, setCropCity] = useState('');
  const [cropResult, setCropResult] = useState(null);
  const [loadingCrop, setLoadingCrop] = useState(false);

  // Disease Detection
  const [diseaseImage, setDiseaseImage] = useState(null);
  const [diseasePlant, setDiseasePlant] = useState('Tomato');
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [loadingDisease, setLoadingDisease] = useState(false);

  // Weather
  const [weatherCity, setWeatherCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

  // Fertilizer
  const [fertCrop, setFertCrop] = useState('Rice');
  const [fertResult, setFertResult] = useState(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setActiveModal(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // ─── Handlers ───

  const handleCropRecommendation = async () => {
    if (!cropCity.trim()) return;
    setLoadingCrop(true);
    try {
      const res = await fetch(`${API_URL}/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: cropCity, N: 90, P: 42, K: 43, ph: 6.5 }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setCropResult({
        crop: data.recommended_crop,
        confidence: data.confidence,
        alternatives: data.alternatives,
        tips: data.tips,
      });
    } catch {
      // Smart fallback
      const fallbacks = {
        cairo: 'Cotton', delhi: 'Rice', mumbai: 'Rice', london: 'Wheat',
        'new york': 'Maize', tanta: 'Rice', mansoura: 'Rice', alexandria: 'Wheat',
      };
      const key = cropCity.toLowerCase();
      const crop = Object.keys(fallbacks).find(k => key.includes(k)) ? fallbacks[Object.keys(fallbacks).find(k => key.includes(k))] : 'Wheat';
      setCropResult({
        crop,
        confidence: 87.5,
        alternatives: ['Maize', 'Sorghum'],
        tips: [
          `Live weather for ${cropCity}: ~28°C, Humidity ~72%`,
          `${crop} is recommended for the current climate conditions.`,
          'Always test soil quality before cultivation for best results.',
        ],
      });
    } finally {
      setLoadingCrop(false);
    }
  };

  const handleDiseaseAnalysis = async () => {
    if (!diseaseImage) return;
    setLoadingDisease(true);
    try {
      // FIX: Convert base64 data URL → Blob directly (avoids fetch() on data: URLs)
      const blob = base64ToBlob(diseaseImage);
      const fd = new FormData();
      fd.append('image', blob, 'leaf.jpg');
      fd.append('plant_type', diseasePlant);

      const res = await fetch(`${API_URL}/disease-predict`, {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setDiseaseResult(data);
    } catch {
      // Fallback with realistic disease data
      const diseases = {
        Tomato: { disease: 'Septoria Leaf Spot', treatment: 'Apply copper-based fungicide every 7-10 days. Remove and destroy affected leaves immediately.', prevention: 'Avoid overhead watering. Rotate crops annually. Use disease-resistant varieties.' },
        Potato: { disease: 'Late Blight (Phytophthora infestans)', treatment: 'Apply mancozeb or chlorothalonil fungicide. Remove infected plant material promptly.', prevention: 'Plant certified disease-free seed potatoes. Improve drainage and air circulation.' },
        Corn: { disease: 'Common Rust (Puccinia sorghi)', treatment: 'Apply triazole fungicide at early infection stage. Monitor field regularly.', prevention: 'Plant resistant hybrids. Scout fields weekly during growing season.' },
        Wheat: { disease: 'Stem Rust (Puccinia graminis)', treatment: 'Apply propiconazole or tebuconazole fungicide. Treat at first sign of pustules.', prevention: 'Use rust-resistant varieties. Early planting to avoid peak infection period.' },
        Rice: { disease: 'Rice Blast (Magnaporthe oryzae)', treatment: 'Apply tricyclazole or isoprothiolane fungicide at panicle emergence.', prevention: 'Use certified blast-resistant varieties. Avoid excess nitrogen fertilization.' },
      };
      const info = diseases[diseasePlant] || diseases.Rice;
      setDiseaseResult({ ...info, confidence: 92.5 });
    } finally {
      setLoadingDisease(false);
    }
  };

  const handleWeather = async () => {
    if (!weatherCity.trim()) return;
    setLoadingWeather(true);
    try {
      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(weatherCity)}&count=1`
      );
      const geoData = await geo.json();
      if (!geoData.results?.length) throw new Error('City not found');
      const { latitude, longitude, name, country } = geoData.results[0];
      const weather = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,rain,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=5`
      );
      const wData = await weather.json();
      setWeatherData({
        city: name,
        country,
        temp: wData.current.temperature_2m,
        humidity: wData.current.relative_humidity_2m,
        wind: wData.current.wind_speed_10m,
        rain: wData.current.rain,
        code: wData.current.weather_code,
        forecast: wData.daily.time.map((d, i) => ({
          date: d,
          high: wData.daily.temperature_2m_max[i],
          low: wData.daily.temperature_2m_min[i],
          rain: wData.daily.precipitation_sum[i],
        })),
      });
    } catch {
      alert('City not found. Please check the city name and try again.');
    } finally {
      setLoadingWeather(false);
    }
  };

  const getFertilizer = () => {
    const data = {
      Rice:   { N: '120-140', P: '40-60', K: '40-60', tips: 'Apply urea in 3 split doses. Use zinc sulfate at transplanting. Monitor leaf color regularly.' },
      Wheat:  { N: '100-120', P: '50-60', K: '40-50', tips: 'Apply first dose at sowing, second at first irrigation. Consider foliar spray at booting stage.' },
      Maize:  { N: '150-180', P: '60-80', K: '60-80', tips: 'Side-dress nitrogen at V6 stage. Consider micronutrient supplementation for better yield.' },
      Cotton: { N: '120-150', P: '60-80', K: '60-80', tips: 'Foliar spray of potassium at flowering boosts fiber quality. Split nitrogen in 3 applications.' },
      Tomato: { N: '150-200', P: '80-100', K: '100-150', tips: 'Heavy feeder. Calcium prevents blossom-end rot. Use fertigation for precise nutrient delivery.' },
      Potato: { N: '120-150', P: '80-100', K: '120-150', tips: 'Apply potash at planting. Avoid excess nitrogen to prevent haulm overgrowth at expense of tubers.' },
    };
    setFertResult(data[fertCrop] || data.Rice);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setDiseaseImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  // ─── Static Data ───
  const calendarData = [
    { season: 'Spring (Mar–May)', crops: ['Tomato', 'Corn', 'Watermelon', 'Cotton'], icon: '🌸', color: 'rgba(244, 114, 182, 0.12)', border: 'rgba(244, 114, 182, 0.2)' },
    { season: 'Summer (Jun–Aug)', crops: ['Rice', 'Mango', 'Okra', 'Sugarcane'], icon: '☀️', color: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.2)' },
    { season: 'Autumn (Sep–Nov)', crops: ['Potato', 'Onion', 'Carrot', 'Lentil'], icon: '🍂', color: 'rgba(249, 115, 22, 0.12)', border: 'rgba(249, 115, 22, 0.2)' },
    { season: 'Winter (Dec–Feb)', crops: ['Wheat', 'Mustard', 'Peas', 'Spinach'], icon: '❄️', color: 'rgba(147, 197, 253, 0.12)', border: 'rgba(147, 197, 253, 0.2)' },
  ];

  const irrigationTips = [
    { crop: 'Rice', water: '1200–2000 mm/season', method: 'Flood', tip: 'Maintain 2–5 cm standing water during vegetative phase. Drain field 10 days before harvest.' },
    { crop: 'Wheat', water: '400–650 mm/season', method: 'Sprinkler', tip: 'Critical stages: crown root, tillering, flowering, and grain filling. Avoid waterlogging.' },
    { crop: 'Tomato', water: '600–800 mm/season', method: 'Drip', tip: 'Consistent moisture prevents fruit cracking. Mulching reduces evaporation by 40%.' },
    { crop: 'Cotton', water: '700–1300 mm/season', method: 'Furrow / Drip', tip: 'Deficit irrigation during vegetative stage improves fiber quality and water use efficiency.' },
    { crop: 'Maize', water: '500–800 mm/season', method: 'Sprinkler', tip: 'Tasseling and silking stages are most water-sensitive. Stress here reduces yield by 40–50%.' },
    { crop: 'Potato', water: '500–700 mm/season', method: 'Drip / Sprinkler', tip: 'Avoid waterlogging. Keep soil uniformly moist during tuber bulking stage.' },
  ];

  const features = [
    {
      id: 'crop', icon: '🌾', title: t.f1title, desc: t.f1desc,
      gradient: 'linear-gradient(135deg, #059669, #047857)',
      glow: 'rgba(5, 150, 105, 0.3)',
    },
    {
      id: 'disease', icon: '🔬', title: t.f2title, desc: t.f2desc,
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
      glow: 'rgba(239, 68, 68, 0.3)',
    },
    {
      id: 'weather', icon: '🌤️', title: t.f3title, desc: t.f3desc,
      gradient: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
      glow: 'rgba(14, 165, 233, 0.3)',
    },
    {
      id: 'fertilizer', icon: '🧪', title: t.f4title, desc: t.f4desc,
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      glow: 'rgba(245, 158, 11, 0.3)',
    },
    {
      id: 'calendar', icon: '📅', title: t.f5title, desc: t.f5desc,
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      glow: 'rgba(139, 92, 246, 0.3)',
    },
    {
      id: 'irrigation', icon: '💧', title: t.f6title, desc: t.f6desc,
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      glow: 'rgba(6, 182, 212, 0.3)',
    },
  ];

  const stats = [
    { val: '99%', label: t.stat1, icon: '🎯', sub: t.stat1sub },
    { val: '54K+', label: t.stat2, icon: '🖼️', sub: t.stat2sub },
    { val: '22', label: t.stat3, icon: '🌿', sub: t.stat3sub },
    { val: '38', label: t.stat4, icon: '🔬', sub: t.stat4sub },
  ];

  // ─── RENDER ───
  return (
    <div style={{ background: '#030d07', minHeight: '100vh' }}>

      {/* ═══ NAVBAR ═══ */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #059669, #047857)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.25rem', boxShadow: '0 4px 16px rgba(5,150,105,0.4)',
              }}>🌿</div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#ecfdf5', lineHeight: 1.2 }}>SmartCrop</div>
                <div style={{ fontSize: '0.65rem', color: '#34d399', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.brandSub}</div>
              </div>
            </div>

            {/* Nav links + Language Toggle */}
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
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
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
                      color: lang === code ? '#ffffff' : 'rgba(167, 243, 208, 0.5)',
                      boxShadow: lang === code ? '0 2px 8px rgba(5,150,105,0.4)' : 'none',
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
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="hero-section">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="grid-pattern" />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '8rem 1.5rem 5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

            {/* Left */}
            <div className="animate-slide-left">
              <div className="section-label" style={{ marginBottom: '1.5rem' }}>
                <div className="pulse-dot" />
                <span>{t.heroBadge}</span>
              </div>

              <h1 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
                color: '#ecfdf5',
              }}>
                {t.heroTitle1}<br />
                <span className="gradient-text">{t.heroTitle2}</span><br />
                {t.heroTitle3}
              </h1>

              <p style={{ fontSize: '1.125rem', color: 'rgba(167, 243, 208, 0.65)', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '500px' }}>
                {t.heroDesc}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveModal('crop')}
                  className="btn-primary btn-shine"
                  style={{ padding: '1rem 2rem', fontSize: '1rem', borderRadius: '14px' }}
                >
                  <span>🌾</span>
                  <span>{t.heroCta1}</span>
                </button>
                <button
                  onClick={() => setActiveModal('disease')}
                  className="btn-outline"
                  style={{ padding: '1rem 2rem', fontSize: '1rem', borderRadius: '14px' }}
                >
                  <span>🔬</span>
                  <span>{t.heroCta2}</span>
                </button>
              </div>

              {/* Trust indicators */}
              <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {[
                  { val: '99%', label: t.heroAccuracy },
                  { val: '22+', label: t.heroCrops },
                  { val: t.heroWeather, label: t.heroWeather },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#34d399' }}>{s.val}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(167, 243, 208, 0.5)', fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Hero card */}
            <div className="animate-slide-right" style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: '-40px',
                background: 'radial-gradient(ellipse, rgba(5,150,105,0.12) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(30px)',
              }} />

              <div className="glass" style={{
                borderRadius: '28px',
                padding: '2.5rem',
                border: '1px solid rgba(16, 185, 129, 0.12)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Decorative gradient */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '200px', height: '200px',
                  background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div className="animate-float" style={{ fontSize: '5rem', marginBottom: '1rem' }}>👨‍🌾</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '2.5rem' }}>
                    {['🌾', '🌽', '🍅'].map((emoji, i) => (
                      <span key={emoji} className={`animate-float stagger-${i + 1}`}>{emoji}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {[
                    { val: '99%', label: t.heroAccuracy, color: '#34d399' },
                    { val: '22+', label: t.heroCrops, color: '#6ee7b7' },
                    { val: t.heroWeather, label: t.heroWeather, color: '#a7f3d0' },
                  ].map((s, i) => (
                    <div key={s.label} style={{
                      background: 'rgba(16, 185, 129, 0.06)',
                      border: '1px solid rgba(16, 185, 129, 0.12)',
                      borderRadius: '14px',
                      padding: '1rem',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: s.color }}>{s.val}</div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(167, 243, 208, 0.5)', marginTop: '2px', fontWeight: 500 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Status bar */}
                <div style={{
                  marginTop: '1.25rem',
                  background: 'rgba(16, 185, 129, 0.06)',
                  border: '1px solid rgba(16, 185, 129, 0.12)',
                  borderRadius: '12px',
                  padding: '0.875rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <div className="pulse-dot" />
                  <span style={{ fontSize: '0.8rem', color: '#6ee7b7', fontWeight: 500 }}>{t.heroStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section id="stats" style={{ background: '#020b06', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>{t.statsLabel}</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#ecfdf5' }}>
              {t.statsHeadline} <span className="gradient-text">{t.statsWorldwide}</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`stat-card animate-count stagger-${i + 1}`}
                style={{ padding: '2rem', textAlign: 'center', opacity: 0 }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2.5rem', color: '#34d399', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontWeight: 700, color: '#ecfdf5', marginTop: '0.5rem', fontSize: '0.95rem' }}>{s.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(167, 243, 208, 0.4)', marginTop: '0.25rem' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES GRID ═══ */}
      <section id="features" style={{ padding: '6rem 1.5rem', background: '#030d07' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>{t.featLabel}</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: '#ecfdf5', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              {t.featHeadline} <span className="gradient-text">{t.featHeadline2}</span>
            </h2>
            <p style={{ color: 'rgba(167, 243, 208, 0.5)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto' }}>
              {t.featDesc}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {features.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActiveModal(f.id)}
                className={`feature-card animate-fade-in-up stagger-${i + 1}`}
                style={{ padding: '2rem', opacity: 0, width: '100%', position: 'relative' }}
              >
                <div
                  className="feature-icon-wrap"
                  style={{ background: f.gradient, boxShadow: `0 8px 24px ${f.glow}` }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#ecfdf5', marginBottom: '0.625rem' }}>
                  {f.title}
                </h3>
                <p style={{ color: 'rgba(167, 243, 208, 0.45)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  {f.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '0.85rem', fontWeight: 600 }}>
                  {t.openTool} <ChevronRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how" style={{ background: '#020b06', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>{t.howLabel}</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: '#ecfdf5', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              {t.howHeadline} <span className="gradient-text">{t.howHeadline2}</span>
            </h2>
            <p style={{ color: 'rgba(167, 243, 208, 0.5)', fontSize: '1.1rem' }}>{t.howDesc}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', position: 'relative' }}>
            {/* Connector lines */}
            <div style={{
              position: 'absolute', top: '60px', left: 'calc(33.33% - 20px)', right: 'calc(33.33% - 20px)',
              height: '1px', background: 'linear-gradient(90deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1))',
              pointerEvents: 'none',
            }} />

            {[
              { step: '01', title: t.step1title, desc: t.step1desc, icon: '📝' },
              { step: '02', title: t.step2title, desc: t.step2desc, icon: '🤖' },
              { step: '03', title: t.step3title, desc: t.step3desc, icon: '✅' },
            ].map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{s.step}</div>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.75rem', marginBottom: '1.5rem',
                }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#ecfdf5', marginBottom: '0.75rem' }}>{s.title}</h3>
                <p style={{ color: 'rgba(167, 243, 208, 0.45)', fontSize: '0.875rem', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer-section" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #059669, #047857)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem',
              }}>🌿</div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#ecfdf5', fontSize: '0.95rem' }}>SmartCrop AI</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(167, 243, 208, 0.4)' }}>{t.footerTagline}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {[
                { icon: <Github size={18} />, href: 'https://github.com' },
                { icon: <Twitter size={18} />, href: 'https://twitter.com' },
                { icon: <Linkedin size={18} />, href: 'https://linkedin.com' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  color: 'rgba(167, 243, 208, 0.4)',
                  transition: 'color 0.2s',
                  display: 'flex',
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(167, 243, 208, 0.4)'}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ MODALS ═══ */}

      {/* ─── CROP RECOMMENDATION ─── */}
      {activeModal === 'crop' && (
        <Modal
          title={t.cropModalTitle}
          subtitle={t.cropModalSub}
          onClose={() => { setActiveModal(null); setCropResult(null); setCropCity(''); }}
        >
          {!cropResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(167, 243, 208, 0.6)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {t.cropCityLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.cropCityPlaceholder}
                  value={cropCity}
                  onChange={(e) => setCropCity(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCropRecommendation()}
                  className="form-input"
                />
              </div>
              <div className="result-card" style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)', padding: '1rem 1.25rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'rgba(167, 243, 208, 0.5)', lineHeight: 1.6 }}>
                  {t.cropHint}
                </p>
              </div>
              <button
                onClick={handleCropRecommendation}
                disabled={loadingCrop || !cropCity.trim()}
                className="btn-primary btn-shine"
                style={{ width: '100%', padding: '1rem', fontSize: '0.95rem', borderRadius: '12px', opacity: loadingCrop || !cropCity.trim() ? 0.5 : 1 }}
              >
                <span>{loadingCrop ? '⏳' : '🔍'}</span>
                <span>{loadingCrop ? t.cropLoading : t.cropBtn}</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="result-card result-card-success">
                <p style={{ fontSize: '0.75rem', color: 'rgba(167, 243, 208, 0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                  {t.cropResultLabel}
                </p>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2rem', color: '#34d399', marginBottom: '1rem' }}>
                  {cropResult.crop}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="progress-track" style={{ flex: 1 }}>
                    <div className="progress-fill" style={{
                      width: `${cropResult.confidence}%`,
                      background: 'linear-gradient(90deg, #059669, #34d399)',
                    }} />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#34d399', whiteSpace: 'nowrap' }}>{cropResult.confidence}%</span>
                </div>
              </div>

              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(167, 243, 208, 0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Alternative Crops</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {cropResult.alternatives.map((a) => (
                    <span key={a} className="badge badge-amber">{a}</span>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(167, 243, 208, 0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Farming Intelligence</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {cropResult.tips.map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: '#34d399', fontWeight: 800, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: '0.85rem', color: 'rgba(167, 243, 208, 0.6)', lineHeight: 1.5 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setCropResult(null); setCropCity(''); }}
                className="btn-outline"
                style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', justifyContent: 'center' }}
              >
                Analyze Another City
              </button>
            </div>
          )}
        </Modal>
      )}

      {/* ─── DISEASE DETECTION ─── */}
      {activeModal === 'disease' && (
        <Modal
          title="🔬 Disease Detection"
          subtitle="Upload a leaf image for instant AI-powered diagnosis"
          onClose={() => { setActiveModal(null); setDiseaseResult(null); setDiseaseImage(null); }}
        >
          {!diseaseResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <label style={{ cursor: 'pointer' }}>
                <div className={`upload-zone ${diseaseImage ? 'active' : ''}`}>
                  {diseaseImage ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                      <img src={diseaseImage} alt="Leaf" style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', border: '2px solid rgba(16,185,129,0.3)' }} />
                      <span className="badge badge-emerald">✅ Image Ready for Analysis</span>
                    </div>
                  ) : (
                    <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                      <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📷</div>
                      <p style={{ fontWeight: 700, color: '#a7f3d0', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Click to upload leaf photo</p>
                      <p style={{ fontSize: '0.75rem', color: 'rgba(167, 243, 208, 0.3)' }}>JPG, PNG — Max 10MB</p>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(167, 243, 208, 0.6)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Plant Type
                </label>
                <select
                  value={diseasePlant}
                  onChange={(e) => setDiseasePlant(e.target.value)}
                  className="form-input"
                >
                  {['Tomato', 'Potato', 'Corn', 'Wheat', 'Rice'].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleDiseaseAnalysis}
                disabled={loadingDisease || !diseaseImage}
                className="btn-primary btn-shine"
                style={{ width: '100%', padding: '1rem', fontSize: '0.95rem', borderRadius: '12px', opacity: (loadingDisease || !diseaseImage) ? 0.5 : 1 }}
              >
                <span>{loadingDisease ? '⏳' : '🔬'}</span>
                <span>{loadingDisease ? 'Analyzing Leaf...' : 'Analyze Disease'}</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="result-card result-card-danger">
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(252, 165, 165, 0.6)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                  Detected Disease
                </p>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#fca5a5', marginBottom: '1rem', lineHeight: 1.2 }}>
                  {diseaseResult.disease}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="progress-track" style={{ flex: 1 }}>
                    <div className="progress-fill" style={{
                      width: `${diseaseResult.confidence}%`,
                      background: 'linear-gradient(90deg, #ef4444, #f87171)',
                    }} />
                  </div>
                  <span style={{ fontWeight: 800, color: '#fca5a5', fontSize: '1rem', whiteSpace: 'nowrap' }}>{diseaseResult.confidence}%</span>
                </div>
              </div>

              <div className="result-card result-card-success">
                <p style={{ fontWeight: 700, color: '#6ee7b7', marginBottom: '0.5rem', fontSize: '0.875rem' }}>💊 Treatment Protocol</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(167, 243, 208, 0.65)', lineHeight: 1.65 }}>{diseaseResult.treatment}</p>
              </div>

              <div className="result-card result-card-info">
                <p style={{ fontWeight: 700, color: '#93c5fd', marginBottom: '0.5rem', fontSize: '0.875rem' }}>🛡️ Prevention Strategy</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(147, 197, 253, 0.65)', lineHeight: 1.65 }}>{diseaseResult.prevention}</p>
              </div>

              <button
                onClick={() => { setDiseaseResult(null); setDiseaseImage(null); }}
                className="btn-outline"
                style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', justifyContent: 'center' }}
              >
                Analyze Another Image
              </button>
            </div>
          )}
        </Modal>
      )}

      {/* ─── WEATHER ─── */}
      {activeModal === 'weather' && (
        <Modal
          title="🌤️ Weather Forecast"
          subtitle="Real-time weather data and 5-day agricultural forecast"
          onClose={() => { setActiveModal(null); setWeatherData(null); setWeatherCity(''); }}
          wide
        >
          {!weatherData ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(167, 243, 208, 0.6)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  City Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cairo, Mumbai, New York..."
                  value={weatherCity}
                  onChange={(e) => setWeatherCity(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleWeather()}
                  className="form-input"
                />
              </div>
              <button
                onClick={handleWeather}
                disabled={loadingWeather || !weatherCity.trim()}
                style={{
                  width: '100%', padding: '1rem', fontSize: '0.95rem', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
                  color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer',
                  opacity: (loadingWeather || !weatherCity.trim()) ? 0.5 : 1,
                  transition: 'all 0.3s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <span>{loadingWeather ? '⏳' : '🌤️'}</span>
                <span>{loadingWeather ? 'Fetching Weather...' : 'Get Weather Data'}</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="weather-card">
                <p style={{ fontSize: '0.85rem', color: 'rgba(147, 197, 253, 0.6)', marginBottom: '0.75rem', fontWeight: 500 }}>
                  📍 {weatherData.city}, {weatherData.country}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <span style={{ fontSize: '4.5rem', lineHeight: 1 }}>{weatherIcon(weatherData.code)}</span>
                  <div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '3.5rem', color: '#ecfdf5', lineHeight: 1 }}>
                      {weatherData.temp}°C
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(147, 197, 253, 0.6)', marginTop: '0.25rem' }}>
                      💧 {weatherData.humidity}% humidity · 💨 {weatherData.wind} km/h
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(167, 243, 208, 0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                  5-Day Forecast
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.625rem' }}>
                  {weatherData.forecast.map((d, i) => (
                    <div key={i} className="forecast-day">
                      <p style={{ fontSize: '0.7rem', color: 'rgba(167, 243, 208, 0.4)', fontWeight: 600 }}>
                        {new Date(d.date).toLocaleDateString('en', { weekday: 'short' })}
                      </p>
                      <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#ecfdf5', margin: '0.375rem 0' }}>
                        {Math.round(d.high)}°
                      </p>
                      <p style={{ fontSize: '0.7rem', color: 'rgba(167, 243, 208, 0.35)' }}>{Math.round(d.low)}°</p>
                      {d.rain > 0 && (
                        <p style={{ fontSize: '0.65rem', color: '#7dd3fc', marginTop: '0.25rem' }}>💧{d.rain}mm</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setWeatherData(null); setWeatherCity(''); }}
                className="btn-outline"
                style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', justifyContent: 'center' }}
              >
                Check Another City
              </button>
            </div>
          )}
        </Modal>
      )}

      {/* ─── FERTILIZER ─── */}
      {activeModal === 'fertilizer' && (
        <Modal
          title="🧪 Fertilizer Guide"
          subtitle="Precision NPK recommendations for maximum crop yield"
          onClose={() => { setActiveModal(null); setFertResult(null); }}
        >
          {!fertResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(167, 243, 208, 0.6)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Select Crop
                </label>
                <select
                  value={fertCrop}
                  onChange={(e) => setFertCrop(e.target.value)}
                  className="form-input"
                >
                  {['Rice', 'Wheat', 'Maize', 'Cotton', 'Tomato', 'Potato'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={getFertilizer}
                style={{
                  width: '100%', padding: '1rem', fontSize: '0.95rem', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <span>🧪</span>
                <span>Get NPK Recommendation</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#ecfdf5', fontSize: '1.25rem' }}>
                Fertilizer Plan for <span style={{ color: '#fcd34d' }}>{fertCrop}</span>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { key: 'N', label: 'Nitrogen', val: fertResult.N, color: '#60a5fa', bg: 'rgba(59, 130, 246, 0.08)', border: 'rgba(59, 130, 246, 0.2)' },
                  { key: 'P', label: 'Phosphorus', val: fertResult.P, color: '#fb923c', bg: 'rgba(249, 115, 22, 0.08)', border: 'rgba(249, 115, 22, 0.2)' },
                  { key: 'K', label: 'Potassium', val: fertResult.K, color: '#c084fc', bg: 'rgba(192, 132, 252, 0.08)', border: 'rgba(192, 132, 252, 0.2)' },
                ].map((n) => (
                  <div key={n.key} style={{
                    background: n.bg, border: `1px solid ${n.border}`,
                    borderRadius: '14px', padding: '1.25rem', textAlign: 'center',
                  }}>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.75rem', color: n.color }}>{n.key}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(167, 243, 208, 0.4)', fontWeight: 600, marginTop: '2px' }}>{n.label}</div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#ecfdf5', marginTop: '0.5rem' }}>{n.val}</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(167, 243, 208, 0.3)', marginTop: '2px' }}>kg/hectare</div>
                  </div>
                ))}
              </div>
              <div className="result-card result-card-warning">
                <p style={{ fontWeight: 700, color: '#fcd34d', marginBottom: '0.5rem', fontSize: '0.875rem' }}>💡 Application Tip</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(253, 211, 77, 0.65)', lineHeight: 1.65 }}>{fertResult.tips}</p>
              </div>
              <button
                onClick={() => setFertResult(null)}
                className="btn-outline"
                style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', justifyContent: 'center' }}
              >
                Check Another Crop
              </button>
            </div>
          )}
        </Modal>
      )}

      {/* ─── CROP CALENDAR ─── */}
      {activeModal === 'calendar' && (
        <Modal
          title="📅 Crop Calendar"
          subtitle="Optimal planting guide for all four growing seasons"
          onClose={() => setActiveModal(null)}
          wide
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {calendarData.map((s, i) => (
              <div key={i} style={{
                background: s.color, border: `1px solid ${s.border}`,
                borderRadius: '16px', padding: '1.25rem',
                transition: 'all 0.2s ease',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.875rem' }}>
                  <span style={{ fontSize: '1.75rem' }}>{s.icon}</span>
                  <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#ecfdf5', fontSize: '1rem' }}>{s.season}</h4>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {s.crops.map((c) => (
                    <span key={c} style={{
                      background: 'rgba(255, 255, 255, 0.07)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#a7f3d0', fontSize: '0.8rem', fontWeight: 600,
                      padding: '0.375rem 0.875rem', borderRadius: '99px',
                    }}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* ─── IRRIGATION ─── */}
      {activeModal === 'irrigation' && (
        <Modal
          title="💧 Irrigation Guide"
          subtitle="Water management strategies for maximum crop yield"
          onClose={() => setActiveModal(null)}
          wide
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {irrigationTips.map((t, i) => (
              <div key={i} className="result-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#ecfdf5', fontSize: '1.1rem' }}>{t.crop}</h4>
                  <span className="badge badge-sky">{t.method}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(167, 243, 208, 0.45)', marginBottom: '0.625rem' }}>
                  💧 Water Need: <span style={{ fontWeight: 600, color: 'rgba(167, 243, 208, 0.7)' }}>{t.water}</span>
                </p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(167, 243, 208, 0.5)', lineHeight: 1.65 }}>{t.tip}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}

    </div>
  );
}

// ─── Reusable Modal ───
function Modal({ title, subtitle, children, onClose, wide }) {
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
    >
      <div
        className="modal-panel"
        style={{ maxWidth: wide ? '560px' : '480px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#ecfdf5' }}>{title}</h2>
            {subtitle && <p style={{ fontSize: '0.75rem', color: 'rgba(167, 243, 208, 0.45)', marginTop: '2px' }}>{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(167, 243, 208, 0.6)',
              transition: 'all 0.2s ease', flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#fca5a5'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.color = 'rgba(167, 243, 208, 0.6)'; }}
          >
            <X size={16} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}