/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TaskSidebar } from './components/TaskSidebar';
import { PhaseTabs } from './components/PhaseTabs';
import { ChatInterface } from './components/ChatInterface';
import { Phase, Message } from './types';
import { chatWithCoach } from './services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, X, User } from 'lucide-react';

export default function App() {
  const [currentPhase, setCurrentPhase] = React.useState<Phase>(Phase.FOCUSING);
  const [completedPhases, setCompletedPhases] = React.useState<Phase[]>([]);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  // Initial greeting
  React.useEffect(() => {
    if (messages.length === 0) {
      const initialText = '你好！我是 EduCoach。在開始研究之前，我們需要先聚焦您的研究。請問您目前感興趣的研究對象（例如：小學生、老師），以及您大致想探討的方向是什麼呢？';
      setMessages([{
        role: 'model',
        text: initialText,
        timestamp: Date.now(),
      }]);
    }
  }, []);

  const handleChat = async (text: string) => {
    const userMessage: Message = {
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const response = await chatWithCoach(currentPhase, newHistory);
      const botMessage: Message = {
        role: 'model',
        text: response as string,
        timestamp: Date.now(),
      };
      
      const updatedHistory = [...newHistory, botMessage];
      setMessages(updatedHistory);

      // Analyze progress: check messages in the current phase
      // Simple heuristic: count combined messages within current phase
      const currentPhaseMessagesCount = updatedHistory.filter(m => {
        // This is a bit tricky with single history, 
        // but we can count from the last phase transition
        return true; 
      }).length;

      if (updatedHistory.length >= 4 && !completedPhases.includes(currentPhase)) {
        setCompletedPhases(prev => [...prev, currentPhase]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhaseChange = (phase: Phase) => {
    if (phase === currentPhase) return;
    
    setCurrentPhase(phase);
    
    // Send transition message
    let transitionText = '';
    if (phase === Phase.KEYWORDS) {
      transitionText = '太棒了！我們已經初步釐清了目標。現在，讓我們試著從中提取出核心關鍵字吧？您覺得哪幾個詞最能代表您的研究核心？';
    } else if (phase === Phase.LITERATURE) {
      transitionText = '太棒了！我們現在要進入文獻搜尋了。在開始之前，為了確保我們搜尋的方向精確，能請您再次把剛剛我們確定好的幾個「核心關鍵字」輸入在聊天室中嗎？接著我會告訴您可以在哪些資料庫尋找，以及可能會遇到的小挑戰。';
    }
    
    if (transitionText) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: transitionText, 
        timestamp: Date.now() 
      }]);
    }
  };

  return (
    <div className="flex bg-slate-50 h-screen font-sans text-slate-800 overflow-hidden">
      <TaskSidebar currentPhase={currentPhase} completedPhases={completedPhases} />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-3 flex items-center justify-center shadow-sm z-30">
          <PhaseTabs 
            currentPhase={currentPhase} 
            onPhaseChange={handlePhaseChange}
            canChangePhase={completedPhases.includes(currentPhase)}
            onAttemptInvalidChange={() => setShowAlert(true)}
          />
        </header>

        <section className="flex-1 overflow-hidden relative">
          <ChatInterface 
            messages={messages} 
            onSendMessage={(text) => handleChat(text)} 
            isLoading={isLoading}
          />
        </section>

        {/* Floating Alert */}
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="absolute bottom-36 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm"
            >
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xl flex items-start gap-4">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-600 shrink-0">
                  <AlertCircle size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900">步步為營，紮實研究</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    在進入下一個階段前，教練建議我們先在目前的階段多加討論，確保研究基礎穩固後再前進喔。
                  </p>
                </div>
                <button 
                  onClick={() => setShowAlert(false)}
                  className="text-slate-300 hover:text-slate-500 transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

