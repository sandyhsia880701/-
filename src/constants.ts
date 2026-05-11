import { Phase, Task } from './types';

export const TASKS: Task[] = [
  {
    id: Phase.FOCUSING,
    title: '聚焦問題',
    goal: '對象、場域與問題方向',
    description: '確定研究的對象（如小學生）、場域（如大學語文課堂）以及核心研究問題與大致方向。',
  },
  {
    id: Phase.KEYWORDS,
    title: '關鍵字詞',
    goal: '建立檢索策略',
    description: '從研究問題中萃取出核心概念，並轉化為有效的搜尋關鍵字。',
  },
  {
    id: Phase.LITERATURE,
    title: '搜尋文獻',
    goal: '獲取學術資源',
    description: '學習如何使用關鍵字在學術資料庫中尋找並篩選合適的文獻。',
  },
];
