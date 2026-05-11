import React from 'react';
import { Phase } from '../types';
import { motion } from 'motion/react';
import { Search, PenTool, BookOpen, AlertCircle } from 'lucide-react';

interface PhaseTabsProps {
  currentPhase: Phase;
  onPhaseChange: (phase: Phase) => void;
  canChangePhase: boolean;
  onAttemptInvalidChange: () => void;
}

export const PhaseTabs: React.FC<PhaseTabsProps> = ({ 
  currentPhase, 
  onPhaseChange, 
  canChangePhase,
  onAttemptInvalidChange
}) => {
  const tabs = [
    { id: Phase.FOCUSING, label: '1. 開始聚焦問題' },
    { id: Phase.KEYWORDS, label: '2. 提煉關鍵字詞' },
    { id: Phase.LITERATURE, label: '3. 搜尋合適文獻' },
  ];

  const handleTabClick = (phase: Phase) => {
    if (phase === currentPhase) return;
    
    const phaseOrder = [Phase.FOCUSING, Phase.KEYWORDS, Phase.LITERATURE];
    const currentIndex = phaseOrder.indexOf(currentPhase);
    const targetIndex = phaseOrder.indexOf(phase);

    if (targetIndex > currentIndex && !canChangePhase) {
      onAttemptInvalidChange();
      return;
    }

    onPhaseChange(phase);
  };

  return (
    <div className="flex gap-4">
      {tabs.map((tab, index) => {
        const isActive = currentPhase === tab.id;
        const phaseOrder = [Phase.FOCUSING, Phase.KEYWORDS, Phase.LITERATURE];
        const currentIndex = phaseOrder.indexOf(currentPhase);
        const isDisabled = index > currentIndex && !canChangePhase;
        
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`group relative px-5 py-2 rounded-full text-[11px] font-bold transition-all border ${
              isActive 
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-2 ring-indigo-50' 
                : isDisabled
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200 opacity-60'
                  : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            {tab.label}
            {isDisabled && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-800 text-white text-[9px] py-1 px-3 rounded-lg whitespace-nowrap z-50 pointer-events-none">
                請先完成目前階段的討論
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
