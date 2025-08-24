export type Role = 'user' | 'assistant' | 'system';


export interface Message {
id: string;
role: Role;
text: string;
createdAt: number;
pending?: boolean;
error?: string | null;
}


export type CallStatus = 'idle' | 'incoming' | 'active' | 'ended';