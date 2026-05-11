export enum Phase {
  FOCUSING = 'FOCUSING',
  KEYWORDS = 'KEYWORDS',
  LITERATURE = 'LITERATURE',
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Task {
  id: Phase;
  title: string;
  goal: string;
  description: string;
}
