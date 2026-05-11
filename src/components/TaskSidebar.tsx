import React from 'react';
import { motion } from 'motion/react';
import { TASKS } from '../constants';
import { Phase } from '../types';
import { CheckCircle2, Circle, Target } from 'lucide-react';

interface TaskSidebarProps {
  currentPhase: Phase;
  completedPhases: Phase[];
}

export const TaskSidebar: React.FC<TaskSidebarProps> = ({ currentPhase, completedPhases }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen overflow-y-auto p-5 flex flex-col gap-6 shrink-0">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200">
          E
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">EduCoach</h1>
          <p className="text-[9px] text-slate-500 font-medium mt-1">教育研究教練</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">任務清單</h2>
        {TASKS.map((task, index) => {
          const isCurrent = currentPhase === task.id;
          const isCompleted = completedPhases.includes(task.id);

          return (
            <motion.div
              key={task.id}
              initial={false}
              animate={{
                opacity: isCurrent || isCompleted ? 1 : 0.4,
              }}
              className={`flex gap-4 p-4 rounded-xl border transition-all ${
                isCurrent 
                  ? 'bg-slate-50 border-slate-200' 
                  : 'bg-transparent border-transparent'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                isCompleted 
                  ? 'bg-emerald-500 text-white' 
                  : isCurrent 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-400'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-bold truncate ${isCurrent ? 'text-slate-900' : 'text-slate-500'}`}>
                  {task.title}
                </h3>
                <p className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${isCurrent ? 'text-slate-600' : 'text-slate-400'}`}>
                  {task.goal}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-auto px-4 py-8 border-t border-slate-100">
        <p className="text-[10px] text-slate-300 font-mono text-center uppercase tracking-widest">
          Academic Research Coach
        </p>
      </div>
    </aside>
  );
};
