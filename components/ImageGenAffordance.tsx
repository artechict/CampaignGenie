
import React, { useState } from 'react';
import { ImageSize, AspectRatio } from '../types';
import { generateCampaignImage } from '../services/geminiService';

interface ImageGenAffordanceProps {
  initialPrompt: string;
  t: any;
}

const ImageGenAffordance: React.FC<ImageGenAffordanceProps> = ({ initialPrompt, t }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [size, setSize] = useState<ImageSize>(ImageSize.SIZE_1K);
  const [ratio, setRatio] = useState<AspectRatio>(AspectRatio.RATIO_1_1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (typeof (window as any).aistudio?.hasSelectedApiKey === 'function') {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        if (typeof (window as any).aistudio?.openSelectKey === 'function') {
          await (window as any).aistudio.openSelectKey();
        }
      }
    }

    setIsGenerating(true);
    setError(null);
    try {
      const url = await generateCampaignImage(prompt, size, ratio);
      setGeneratedImageUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message?.includes("Requested entity was not found") ? t.apiKeyLink : "Error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenKeySelector = async () => {
    if (typeof (window as any).aistudio?.openSelectKey === 'function') {
      await (window as any).aistudio.openSelectKey();
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800 flex items-center">
          <svg className="w-5 h-5 mr-2 ml-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {t.title}
        </h3>
        <button 
          onClick={handleOpenKeySelector}
          className="text-xs text-indigo-600 hover:underline font-medium"
        >
          {t.apiKeyLink}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.promptLabel}</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-24 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm ltr-force"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">{t.sizeLabel}</label>
              <select 
                value={size} 
                onChange={(e) => setSize(e.target.value as ImageSize)}
                className="w-full p-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={ImageSize.SIZE_1K}>1K</option>
                <option value={ImageSize.SIZE_2K}>2K</option>
                <option value={ImageSize.SIZE_4K}>4K</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">{t.ratioLabel}</label>
              <select 
                value={ratio} 
                onChange={(e) => setRatio(e.target.value as AspectRatio)}
                className="w-full p-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Object.values(AspectRatio).map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
              isGenerating || !prompt.trim() ? 'bg-slate-300' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isGenerating ? t.generating : t.generate}
          </button>
          
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <p className="text-[10px] text-slate-400">
            {t.billingInfo} <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">Billing info</a>
          </p>
        </div>

        <div className="border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50 relative overflow-hidden min-h-[250px]">
          {isGenerating ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
            </div>
          ) : generatedImageUrl ? (
            <img src={generatedImageUrl} alt="Generated" className="w-full h-full object-contain" />
          ) : (
            <div className="text-center p-6">
              <svg className="w-12 h-12 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs text-slate-400">{t.placeholder}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenAffordance;
