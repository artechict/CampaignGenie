
import React, { useState } from 'react';
import { getDir } from '../utils/rtl';

interface CampaignFormProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
  t: any;
  lang: string;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onGenerate, isLoading, t, lang }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const currentDir = getDir(prompt);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-4">
      <div className="relative group">
        <textarea
          value={prompt}
          dir={prompt ? currentDir : (lang === 'fa' ? 'rtl' : 'ltr')}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t.placeholder}
          className={`w-full h-40 p-6 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-lg resize-none shadow-sm group-hover:shadow-md ${prompt ? (currentDir === 'rtl' ? 'text-right' : 'text-left') : (lang === 'fa' ? 'text-right' : 'text-left')}`}
          disabled={isLoading}
        />
        <div className={`absolute bottom-4 text-xs text-slate-400 ${lang === 'fa' ? 'left-4' : 'right-4'}`}>
          {t.hint}
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 ${
          isLoading || !prompt.trim() 
            ? 'bg-slate-300 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200'
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3 ml-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{t.loading}</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{t.button}</span>
          </>
        )}
      </button>
    </form>
  );
};

export default CampaignForm;
