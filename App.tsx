
import React, { useState, useEffect } from 'react';
import { generateCampaign } from './services/geminiService';
import { EmailCampaign } from './types';
import { translations, Language } from './translations';
import CampaignForm from './components/CampaignForm';
import CampaignDisplay from './components/CampaignDisplay';
import Chatbot from './components/Chatbot';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [campaign, setCampaign] = useState<EmailCampaign | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleGenerate = async (prompt: string) => {
    setLoading(true);
    setError(null);
    setCampaign(null);
    try {
      // Force AI to respond in the selected UI language
      const systemPrompt = `Please generate this campaign in ${lang === 'fa' ? 'Persian' : 'English'}. `;
      const result = await generateCampaign(systemPrompt + prompt);
      setCampaign(result);
    } catch (err: any) {
      console.error(err);
      setError(t.common.errorTitle);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCampaign(null);
    setError(null);
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col font-${lang === 'fa' ? 'vazir' : 'inter'}`}>
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center cursor-pointer" onClick={handleReset}>
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="ml-3 mr-3 text-2xl font-black tracking-tight text-slate-800">{t.appName}</span>
            </div>
            
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
                <a href="#" className="hover:text-indigo-600 transition-colors mx-2">{t.nav.templates}</a>
                <a href="#" className="hover:text-indigo-600 transition-colors mx-2">{t.nav.history}</a>
                <button className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition-all shadow-md">{t.nav.getStarted}</button>
              </div>
              
              {/* Language Switcher */}
              <button 
                onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
                className="flex items-center px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors text-xs font-bold"
              >
                <svg className="w-4 h-4 mr-1 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 9.19 15.352 5 18M15 11.5c-1.92-2.536-4.465-4.316-7.394-5.117" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                {lang === 'fa' ? 'English' : 'فارسی'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-12">
        {!campaign && !loading && (
          <div className="max-w-4xl mx-auto text-center space-y-12 py-12">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                {lang === 'fa' ? (
                  <>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">کمپین‌های بی‌نقص</span> در چند ثانیه
                  </>
                ) : (
                  <>
                    Craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Perfect Campaigns</span> in Seconds
                  </>
                )}
              </h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                {t.hero.subtitle}
              </p>
            </div>

            <CampaignForm onGenerate={handleGenerate} isLoading={loading} t={t.form} lang={lang} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-200">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="text-indigo-600 font-bold text-2xl mb-1">98%</div>
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">{t.hero.stats.openRates}</div>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="text-indigo-600 font-bold text-2xl mb-1">10k+</div>
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">{t.hero.stats.emailsBuilt}</div>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="text-indigo-600 font-bold text-2xl mb-1">4K</div>
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">{t.hero.stats.resolution}</div>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="text-indigo-600 font-bold text-2xl mb-1">AI</div>
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">{t.hero.stats.poweredBy}</div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <LoadingSpinner message={t.common.loading} />
          </div>
        )}

        {error && (
          <div className="max-w-xl mx-auto p-6 bg-red-50 border border-red-100 rounded-3xl text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
            </div>
            <p className="text-red-800 font-medium">{error}</p>
            <button onClick={handleReset} className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-bold transition-all">{t.common.tryAgain}</button>
          </div>
        )}

        {campaign && !loading && (
          <CampaignDisplay campaign={campaign} t={t.display} vt={t.visual} lang={lang} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} {t.appName}. Built by <a href="https://artechict.pages.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors font-bold">Artech</a>.
        </div>
      </footer>

      <Chatbot t={t.chatbot} lang={lang} />
    </div>
  );
};

export default App;
