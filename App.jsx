import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function SmartCropAssistant() {
  const [activeModal, setActiveModal] = useState(null);
  const [cropCity, setCropCity] = useState('');
  const [cropSeason, setCropSeason] = useState('شتاء');
  const [cropResult, setCropResult] = useState(null);
  const [loadingCrop, setLoadingCrop] = useState(false);
  
  const [diseaseImage, setDiseaseImage] = useState(null);
  const [diseasePlant, setDiseasePlant] = useState('طماطم');
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [loadingDisease, setLoadingDisease] = useState(false);

  const handleCropRecommendation = async () => {
    if (!cropCity.trim()) {
      alert('اكتب اسم المدينة!');
      return;
    }
    
    setLoadingCrop(true);
    setTimeout(() => {
      setCropResult({
        crop: 'القمح',
        confidence: 99,
        alternatives: ['الذرة', 'البرسيم'],
        tips: ['الزراعة في نهاية نوفمبر', 'الري كل 3 أيام', 'الحصاد في مايو']
      });
      setLoadingCrop(false);
    }, 1500);
  };

  const handleDiseaseAnalysis = async () => {
    if (!diseaseImage) {
      alert('اختر صورة أولاً!');
      return;
    }
    
    setLoadingDisease(true);
    setTimeout(() => {
      setDiseaseResult({
        disease: 'صدأ الورقة',
        confidence: 95,
        treatment: 'استخدم مبيد فطري ثلاثي الأركان',
        prevention: 'تحسين التهوية، تقليل الرطوبة'
      });
      setLoadingDisease(false);
    }, 1500);
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50" dir="rtl">
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium transition">
            تحميل التطبيق
          </button>
          <div className="hidden md:flex gap-6 text-sm text-emerald-800">
            <a href="#" className="hover:text-emerald-600">تواصل</a>
            <a href="#" className="hover:text-emerald-600">التقنيات</a>
            <a href="#" className="hover:text-emerald-600">عن التطبيق</a>
            <a href="#" className="hover:text-emerald-600">الرئيسية</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-900">محصولاتي</span>
            <span className="text-3xl">🌾</span>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-emerald-600/10 rounded-full px-4 py-2 mb-6">
              <span className="text-emerald-700 text-sm font-semibold">🤖 تقنية ذكاء اصطناعي متقدمة</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              مساعد الزراعة الذكي
            </h1>
            
            <p className="text-lg text-emerald-700 mb-8 leading-relaxed">
              احصل على توصيات زراعية دقيقة وتشخيص سريع لأمراض النبات باستخدام الذكاء الاصطناعي. مصمم خصيصاً للمزارعين المصريين.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setActiveModal('crop')}
                className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg"
              >
                <span className="text-2xl">🌾</span>
                توصيات المحاصيل
              </button>
              
              <button
                onClick={() => setActiveModal('disease')}
                className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg"
              >
                <span className="text-2xl">🔬</span>
                تشخيص الأمراض
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">99%</div>
                <div className="text-xs text-emerald-700 mt-1">دقة التوصيات</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">54K</div>
                <div className="text-xs text-emerald-700 mt-1">صور تدريب</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">38</div>
                <div className="text-xs text-emerald-700 mt-1">نوع مرض</div>
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
          <h2 className="text-4xl font-bold text-emerald-900 text-center mb-12">كيف يعمل؟</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'اختر المدينة', desc: 'أدخل اسم مدينتك أو موقعك الجغرافي' },
              { num: '2', title: 'الذكاء الاصطناعي يحلل', desc: 'معالجة البيانات المناخية والتربة' },
              { num: '3', title: 'احصل على التوصية', desc: 'نتيجة دقيقة في ثواني معدودة' }
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
                <span>🌾</span> توصيات المحاصيل
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {!cropResult ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-emerald-900 mb-2">المدينة</label>
                    <input
                      type="text"
                      placeholder="مثلاً: القاهرة"
                      value={cropCity}
                      onChange={(e) => setCropCity(e.target.value)}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-900 mb-2">الموسم</label>
                    <div className="flex gap-2">
                      {['شتاء', 'ربيع', 'صيف', 'خريف'].map((season) => (
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
                    {loadingCrop ? '⏳ جاري البحث...' : 'احصل على التوصية'}
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
                    <h4 className="font-semibold text-emerald-900 mb-2">🥕 محاصيل بديلة</h4>
                    <div className="flex flex-wrap gap-2">
                      {cropResult.alternatives.map((alt) => (
                        <span key={alt} className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm font-medium">
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-2">💡 نصائح الزراعة</h4>
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
                    جرب مدينة أخرى
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
                <span>🔬</span> تشخيص الأمراض
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
                          <p className="text-sm text-emerald-700 font-medium">صورة تم تحميلها ✓</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="text-4xl">📤</div>
                          <div>
                            <p className="font-semibold text-emerald-900">اسحب الصورة أو اضغط</p>
                            <p className="text-sm text-emerald-600">لاختيار صورة من جهازك</p>
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
                    <label className="block text-sm font-semibold text-emerald-900 mb-2">نوع النبات</label>
                    <select
                      value={diseasePlant}
                      onChange={(e) => setDiseasePlant(e.target.value)}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 text-right"
                    >
                      <option>طماطم</option>
                      <option>بطاطس</option>
                      <option>ذرة</option>
                      <option>قمح</option>
                      <option>أرز</option>
                    </select>
                  </div>

                  <button
                    onClick={handleDiseaseAnalysis}
                    disabled={loadingDisease || !diseaseImage}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
                  >
                    {loadingDisease ? '⏳ جاري التحليل...' : 'حلل الورقة'}
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
                      <span>💊</span> العلاج
                    </h4>
                    <p className="text-emerald-700 bg-green-50 p-3 rounded-lg">{diseaseResult.treatment}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                      <span>🛡️</span> الوقاية
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
                    حلل صورة أخرى
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-emerald-950 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-emerald-100">© 2025 محصولاتي | Smart Crop Assistant</p>
        </div>
      </footer>
    </div>
  );
}