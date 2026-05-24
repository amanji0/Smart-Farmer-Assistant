const translations = {
  en: {
    heroTitle1: "Smart Crop",
    heroTitle2: "Disease Detection",
    heroTitle3: "System",
    heroSubtitle: "Empowering farmers with AI-driven crop recommendations, disease diagnosis, and a direct marketplace to sell produce.",
    tryCrop: "Crop Recommendation",
    tryDisease: "Disease Detection",
    tryWeather: "Weather & Forecast",
    tryMarket: "Marketplace",
    trySchemes: "Gov Schemes",
    howItWorks: "How It Works",
    step1Title: "Soil & Climate Analysis",
    step1Desc: "Enter NPK values, pH, and city to get AI crop suggestions based on real weather.",
    step2Title: "Disease Diagnosis",
    step2Desc: "Upload a leaf image. Our AI instantly identifies the disease and suggests treatment.",
    step3Title: "Marketplace",
    step3Desc: "Farmers list crops directly. Vendors buy securely using Razorpay.",
    footerTagline: "SmartCrop AI",
    modalCropTitle: "🌱 Crop Recommendation",
    modalCropSub: "Get AI-driven crop suggestions based on your soil and local climate",
    modalDiseaseTitle: "🔬 Disease Detection",
    modalDiseaseSub: "Upload a leaf image for instant AI-powered diagnosis",
    modalWeatherTitle: "🌦️ Weather Forecast",
    modalWeatherSub: "Get 5-day weather forecast and current conditions",
    loading: "Analyzing...",
    vendorLogin: "Vendor Login",
    farmerLogin: "Farmer Login",
    navAdmin: "Admin Dashboard",
    logout: "Logout",
  },
  hi: {
    heroTitle1: "स्मार्ट फसल",
    heroTitle2: "रोग पहचान",
    heroTitle3: "प्रणाली",
    heroSubtitle: "किसानों को एआई-संचालित फसल सिफारिशें, रोग निदान और उपज बेचने के लिए एक सीधा बाज़ार प्रदान करना।",
    tryCrop: "फसल की सिफारिश",
    tryDisease: "रोग की पहचान",
    tryWeather: "मौसम और पूर्वानुमान",
    tryMarket: "बाज़ार (Marketplace)",
    trySchemes: "सरकारी योजनाएं",
    howItWorks: "यह कैसे काम करता है",
    step1Title: "मिट्टी और जलवायु विश्लेषण",
    step1Desc: "एआई फसल सुझाव प्राप्त करने के लिए एनपीके मान, पीएच और शहर दर्ज करें।",
    step2Title: "रोग निदान",
    step2Desc: "पत्ती की छवि अपलोड करें। हमारा एआई तुरंत बीमारी की पहचान करता है।",
    step3Title: "बाज़ार",
    step3Desc: "किसान सीधे फसल सूचीबद्ध करते हैं। विक्रेता सुरक्षित रूप से खरीदते हैं।",
    footerTagline: "स्मार्टक्रॉप एआई",
    modalCropTitle: "🌱 फसल की सिफारिश",
    modalCropSub: "अपनी मिट्टी और स्थानीय जलवायु के आधार पर सुझाव प्राप्त करें",
    modalDiseaseTitle: "🔬 रोग की पहचान",
    modalDiseaseSub: "त्वरित एआई निदान के लिए पत्ती की छवि अपलोड करें",
    modalWeatherTitle: "🌦️ मौसम पूर्वानुमान",
    modalWeatherSub: "5 दिन का मौसम पूर्वानुमान और वर्तमान स्थिति प्राप्त करें",
    loading: "विश्लेषण कर रहा है...",
    vendorLogin: "विक्रेता लॉगिन",
    farmerLogin: "किसान लॉगिन",
    navAdmin: "एडमिन डैशबोर्ड",
    logout: "लॉग आउट",
  },
  // We'll add simplified placeholder structures for the other 10 languages
  // that fall back to English or phonetic equivalents for demonstration
  bn: { heroTitle: "স্মার্ট ফসল ও রোগ নির্ণয় সিস্টেম", tryMarket: "বাজার", trySchemes: "সরকারি স্কিম" },
  te: { heroTitle: "స్మార్ట్ క్రాప్ & డిసీజ్ డిటెక్షన్ సిస్టమ్", tryMarket: "సంత", trySchemes: "ప్రభుత్వ పథకాలు" },
  mr: { heroTitle: "स्मार्ट पीक आणि रोग शोध प्रणाली", tryMarket: "बाजारपेठ", trySchemes: "सरकारी योजना" },
  ta: { heroTitle: "ஸ்மார்ட் பயிர் மற்றும் நோய் கண்டறிதல்", tryMarket: "சந்தை", trySchemes: "அரசு திட்டங்கள்" },
  gu: { heroTitle: "સ્માર્ટ પાક અને રોગ શોધ સિસ્ટમ", tryMarket: "બજાર", trySchemes: "સરકારી યોજનાઓ" },
  kn: { heroTitle: "ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ಮತ್ತು ರೋಗ ಪತ್ತೆ ವ್ಯವಸ್ಥೆ", tryMarket: "ಮಾರುಕಟ್ಟೆ", trySchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು" },
  ml: { heroTitle: "സ്മാർട്ട് വിള & രോഗം കണ്ടെത്തൽ", tryMarket: "വിപണി", trySchemes: "സർക്കാർ പദ്ധതികൾ" },
  or: { heroTitle: "ସ୍ମାର୍ଟ ଫସଲ ଏବଂ ରୋଗ ଚିହ୍ନଟ ପ୍ରଣାଳୀ", tryMarket: "ବଜାର", trySchemes: "ସରକାରୀ ଯୋଜନା" },
  pa: { heroTitle: "ਸਮਾਰਟ ਫਸਲ ਅਤੇ ਬਿਮਾਰੀ ਖੋਜ ਸਿਸਟਮ", tryMarket: "ਬਾਜ਼ਾਰ", trySchemes: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ" },
  ur: { heroTitle: "سمارٹ فصل اور بیماری کی تشخیص کا نظام", tryMarket: "مارکیٹ", trySchemes: "حکومتی اسکیمیں" },
};

export const getTranslation = (lang, key) => {
  if (translations[lang] && translations[lang][key]) {
    return translations[lang][key];
  }
  // Fallback to Hindi if Regional fails, then English
  if (translations['hi'] && translations['hi'][key] && lang !== 'en') {
     return translations['hi'][key]; 
  }
  return translations['en'][key] || key;
};

export const supportedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'mr', name: 'मराठी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'ur', name: 'اردو' },
];
