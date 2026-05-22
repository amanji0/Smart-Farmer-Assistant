import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function SmartCropAssistant() {
  const [activeModal, setActiveModal] = useState(null);
  const [cropCity, setCropCity] = useState('');
  const [cropSeason, setCropSeason] = useState('Winter');
  const [cropResult, setCropResult] = useState(null);
  const [loadingCrop, setLoadingCrop] = useState(false);
  
  const [diseaseImage, setDiseaseImage] = useState(null);
  const [diseasePlant, setDiseasePlant] = useState('Tomato');
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [loadingDisease, setLoadingDisease] = useState(false);

  const handleCropRecommendation = async () => {
    if (!cropCity.trim()) {
      alert('Enter city name!');
      return;
    }
    
    setLoadingCrop(true);
    try {
      // Mocked environmental data for now, but sent to the real AI model
      const response = await fetch('http://localhost:8000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: cropCity,
          N: 90, P: 42, K: 43, 
          temperature: 20.8, 
          humidity: 82.0, 
          ph: 6.5, 
          rainfall: 202.9
        })
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      
      // Map English crop names to Arabic if possible, or just use the data
      // For now, we'll use the data from the backend
      setCropResult({
        crop: data.recommended_crop,
        confidence: data.confidence,
        alternatives: data.alternatives,
        tips: data.tips
      });
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      alert('Connection error with server!');
    } finally {
      setLoadingCrop(false);
    }
  };

  const handleDiseaseAnalysis = async () => {
    if (!diseaseImage) {
      alert('Select an image first!');
      return;
    }
    
    setLoadingDisease(true);
    try {
      // Convert data URL back to a Blob for upload
      const fetchResponse = await fetch(diseaseImage);
      const blob = await fetchResponse.blob();
      
      const formData = new FormData();
      formData.append('image', blob, 'leaf.jpg');
      formData.append('plant_type', diseasePlant);
      
      const response = await fetch('http://localhost:8000/disease-predict', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Disease analysis failed');
      
      const data = await response.json();
      
      setDiseaseResult({
        disease: data.disease,
        confidence: data.confidence,
        treatment: data.treatment,
        prevention: data.prevention
      });
    } catch (error) {
      console.error('Error analyzing disease:', error);
      alert('Error analyzing the image!');
    } finally {
      setLoadingDisease(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDiseaseImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50" dir="ltr">
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium transition">
            Download App
          </button>
          <div className="hidden md:flex gap-6 text-sm text-emerald-800">
            <a href="#" className="hover:text-emerald-600">Contact</a>
            <a href="#" className="hover:text-emerald-600">Technologies</a>
            <a href="#" className="hover:text-emerald-600">About</a>
            <a href="#" className="hover:text-emerald-600">Home</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-900">Smart Crop Disease Detection System</span>
            <span className="text-3xl">🌾</span>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-emerald-600/10 rounded-full px-4 py-2 mb-6">
              <span className="text-emerald-700 text-sm font-semibold">🤖 Advanced AI Technology</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              Smart Crop Disease Detection System
            </h1>
            
            <p className="text-lg text-emerald-700 mb-8 leading-relaxed">
              Get accurate farming recommendations and fast detection of plant diseases using Artificial Intelligence. Designed for modern global agriculture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setActiveModal('crop')}
                className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg"
              >
                <span className="text-2xl">🌾</span>
                Crop Recommendations
              </button>
              
              <button
                onClick={() => setActiveModal('disease')}
                className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg"
              >
                <span className="text-2xl">🔬</span>
                Disease Diagnosis
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">99%</div>
                <div className="text-xs text-emerald-700 mt-1">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">54K</div>
                <div className="text-xs text-emerald-700 mt-1">Training Photos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">38</div>
                <div className="text-xs text-emerald-700 mt-1">Disease Types</div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-block bg-emerald-50 rounded-3xl p-1">
              <div className="bg-gradient-to-b from-amber-100 to-emerald-50 rounded-3xl p-12 text-center">
                <div className="text-9xl mb-4 drop-shadow-lg">👨‍🌾</div>
                <div className="text-6xl">🌾🌻</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-emerald-900 text-center mb-12">How it works?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Select City', desc: 'Enter your city or geographical location' },
              { num: '2', title: 'AI Analysis', desc: 'Process climate and soil data' },
              { num: '3', title: 'Get Recommendation', desc: 'Accurate result in seconds' }
            ].map((step, i) => (
              <div key={i} className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3">{step.title}</h3>
                <p className="text-emerald-700">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeModal === 'crop' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <button
                onClick={() => {
                  setActiveModal(null);
                  setCropResult(null);
                  setCropCity('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
                <span>🌾</span> Crop Recommendations
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {!cropResult ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-emerald-900 mb-2">City</label>
                    <input
                      type="text"
                      placeholder="e.g. Cairo"
                      value={cropCity}
                      onChange={(e) => setCropCity(e.target.value)}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-900 mb-2">Season</label>
                    <div className="flex gap-2">
                      {['Winter', 'Spring', 'Summer', 'Autumn'].map((season) => (
                        <button
                          key={season}
                          onClick={() => setCropSeason(season)}
                          className={`flex-1 py-2 rounded-lg font-medium transition ${
                            cropSeason === season
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {season}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleCropRecommendation}
                    disabled={loadingCrop}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
                  >
                    {loadingCrop ? '⏳ Searching...' : 'Get Recommendation'}
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-amber-50 p-6 rounded-xl">
                    <div className="text-5xl mb-3">🌾</div>
                    <h3 className="text-3xl font-bold text-emerald-900 mb-2">{cropResult.crop}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${cropResult.confidence}%` }}></div>
                      </div>
                      <span className="font-bold text-emerald-600">{cropResult.confidence}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-2">🥕 Alternative Crops</h4>
                    <div className="flex flex-wrap gap-2">
                      {cropResult.alternatives.map((alt) => (
                        <span key={alt} className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm font-medium">
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-2">💡 Farming Tips</h4>
                    <ul className="space-y-1 text-sm text-emerald-700">
                      {cropResult.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setCropResult(null);
                      setCropCity('');
                    }}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 rounded-lg transition"
                  >
                    Try another city
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeModal === 'disease' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <button
                onClick={() => {
                  setActiveModal(null);
                  setDiseaseResult(null);
                  setDiseaseImage(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
                <span>🔬</span> Disease Diagnosis
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {!diseaseResult ? (
                <>
                  <label className="block">
                    <div className="border-2 border-dashed border-emerald-300 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-600 hover:bg-emerald-50 transition">
                      {diseaseImage ? (
                        <div className="space-y-3">
                          <img src={diseaseImage} alt="Leaf" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                          <p className="text-sm text-emerald-700 font-medium">Uploaded Image ✓</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="text-4xl">📤</div>
                          <div>
                            <p className="font-semibold text-emerald-900">Drag image or click</p>
                            <p className="text-sm text-emerald-600">to choose from your device</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-900 mb-2">Plant Type</label>
                    <select
                      value={diseasePlant}
                      onChange={(e) => setDiseasePlant(e.target.value)}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option>Tomato</option>
                      <option>Potato</option>
                      <option>Corn</option>
                      <option>Wheat</option>
                      <option>Rice</option>
                    </select>
                  </div>

                  <button
                    onClick={handleDiseaseAnalysis}
                    disabled={loadingDisease || !diseaseImage}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
                  >
                    {loadingDisease ? '⏳ Analyzing...' : 'Analyze Leaf'}
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl">
                    <div className="text-5xl mb-3">⚠️</div>
                    <h3 className="text-2xl font-bold text-red-900 mb-2">{diseaseResult.disease}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${diseaseResult.confidence}%` }}></div>
                      </div>
                      <span className="font-bold text-red-600">{diseaseResult.confidence}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                      <span>💊</span> Treatment
                    </h4>
                    <p className="text-emerald-700 bg-green-50 p-3 rounded-lg">{diseaseResult.treatment}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                      <span>🛡️</span> Prevention
                    </h4>
                    <p className="text-emerald-700 bg-blue-50 p-3 rounded-lg">{diseaseResult.prevention}</p>
                  </div>

                  <button
                    onClick={() => {
                      setDiseaseResult(null);
                      setDiseaseImage(null);
                    }}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 rounded-lg transition"
                  >
                    Analyze another image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-emerald-950 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-emerald-100">© 2025 | Smart Crop Disease Detection System</p>
        </div>
      </footer>
    </div>
  );
}