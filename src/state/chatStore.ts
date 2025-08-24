import { create } from 'zustand';
import { Message } from '../types';


interface ChatState {
messages: Message[];
enqueue: (msg: Message) => void;
update: (id: string, patch: Partial<Message>) => void;
reset: () => void;
}


export const useChatStore = create<ChatState>((set) => ({
messages: [],
enqueue: (msg) => set((s) => ({ messages: [msg, ...s.messages] })),
update: (id, patch) => set((s) => ({
messages: s.messages.map(m => m.id === id ? { ...m, ...patch } : m)
})),
reset: () => set({ messages: [] })
}));