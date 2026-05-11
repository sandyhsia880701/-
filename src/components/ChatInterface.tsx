import React from 'react';
import { Phase } from '../types';
import { motion } from 'motion/react';
import { Send, User, Bot, Loader2 } from 'lucide-react';

interface ChatInterfaceProps {
  messages: { role: 'user' | 'model'; text: string; timestamp: number }[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading }) => {
  const [input, setInput] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden text-slate-800">
      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-8 space-y-8 no-scrollbar scroll-smooth max-w-4xl mx-auto w-full"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 italic">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
              <Bot size={28} className="text-indigo-500" />
            </div>
            <p className="max-w-xs text-center text-xs font-medium">
              準備好開始您的研究旅途了嗎？我在這裡引導您每一步。
            </p>
          </div>
        )}
        {messages.map((message, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md border-2 border-white overflow-hidden ${
              message.role === 'user' ? 'bg-slate-800 text-white' : 'bg-indigo-100 text-indigo-600'
            }`}>
              {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className={`relative max-w-[85%] p-4 rounded-2xl leading-relaxed text-sm shadow-sm border ${
              message.role === 'user' 
                ? 'bg-white text-slate-800 border-slate-100 rounded-tr-none' 
                : 'bg-white text-slate-700 border-slate-200 rounded-tl-none font-medium'
            }`}>
              <div className={`absolute top-0 w-3 h-3 bg-white border-t border-slate-100 rotate-45 ${
                message.role === 'user' ? '-right-1.5' : '-left-1.5 border-l border-slate-200'
              }`} />
              <div className="relative z-10 whitespace-pre-wrap">
                {message.text}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-4 opacity-60">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-400 flex items-center justify-center border-2 border-white shadow-sm">
              <Bot size={20} />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="flex gap-1">
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] shrink-0">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="在此輸入您的回答..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white px-6 rounded-xl transition-all shadow-xl shadow-indigo-100 active:scale-95 font-bold text-sm tracking-wide"
          >
            送出回答
          </button>
        </form>
      </div>
    </div>
  );
};
