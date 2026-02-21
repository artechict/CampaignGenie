
import React from 'react';
import { EmailCampaign } from '../types';
import ImageGenAffordance from './ImageGenAffordance';
import { getDir } from '../utils/rtl';

interface CampaignDisplayProps {
  campaign: EmailCampaign;
  t: any;
  vt: any;
  lang: string;
}

const CampaignDisplay: React.FC<CampaignDisplayProps> = ({ campaign, t, vt, lang }) => {
  const mainDir = getDir(campaign.bodyCopy);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <header className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-900" dir={getDir(campaign.title)}>{campaign.title}</h2>
        <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 ml-2"></span> {campaign.tone}</span>
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 ml-2"></span> {campaign.targetAudience}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Email Content */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-800">{t.preview}</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.subjectLines}</label>
                <div className="space-y-2">
                  {campaign.subjectLines.map((line, idx) => {
                    const lineDir = getDir(line);
                    return (
                      <div 
                        key={idx} 
                        dir={lineDir}
                        className={`flex items-center p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 text-sm group cursor-pointer hover:bg-indigo-100 transition-colors ${lineDir === 'rtl' ? 'text-right' : 'text-left'}`}
                      >
                        <span className={`w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold shadow-sm ${lineDir === 'rtl' ? 'ml-3' : 'mr-3'}`}>{idx + 1}</span>
                        <span className="flex-1">{line}</span>
                        <svg className="w-4 h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.bodyCopy}</label>
                <div 
                  dir={mainDir}
                  className={`prose prose-slate max-w-none bg-slate-50 p-6 rounded-2xl border border-slate-100 whitespace-pre-wrap leading-relaxed text-slate-700 ${mainDir === 'rtl' ? 'text-right font-vazir' : 'text-left font-serif'}`}
                >
                  {campaign.bodyCopy}
                </div>
              </div>
            </div>
          </section>

          {/* Image Gen Integration */}
          <ImageGenAffordance initialPrompt={campaign.imagePrompt} t={vt} />
        </div>

        <aside className="space-y-6">
          <div className="bg-indigo-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
            <h4 className="font-bold text-lg">{t.quickTip}</h4>
            <p className="text-indigo-100 text-sm leading-relaxed">
              {t.tipContent}
            </p>
            <div className="pt-4 flex space-x-2">
              <button className="flex-1 bg-white text-indigo-900 py-2 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">{t.export}</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800">{t.strategy}</h4>
            <div className="space-y-3">
              {t.strategies.map((text: string, i: number) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center mt-0.5 mx-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                  </div>
                  <p className="text-xs text-slate-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CampaignDisplay;
