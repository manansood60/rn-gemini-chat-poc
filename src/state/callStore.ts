import { create } from 'zustand';
import type { CallStatus } from '../types';


interface CallState {
status: CallStatus;
muted: boolean;
speakerOn: boolean;
startIncoming: () => void;
accept: () => void;
end: () => void;
toggleMute: () => void;
toggleSpeaker: () => void;
}


export const useCallStore = create<CallState>((set) => ({
status: 'idle',
muted: false,
speakerOn: false,
startIncoming: () => set({ status: 'incoming' }),
accept: () => set({ status: 'active' }),
end: () => set({ status: 'ended', muted: false, speakerOn: false }),
toggleMute: () => set((s) => ({ muted: !s.muted })),
toggleSpeaker: () => set((s) => ({ speakerOn: !s.speakerOn }))
}));