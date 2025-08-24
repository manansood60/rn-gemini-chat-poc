import Constants from 'expo-constants';
import { geminiProvider } from './gemini';
import { getAIProvider } from './mock';


export type AIMessage = { role: 'user' | 'assistant'; content: string };
export type AIProvider = {
send: (history: AIMessage[]) => Promise<string>;
};


export function ai(): AIProvider {
const provider = (Constants.expoConfig?.extra as any)?.AI_PROVIDER || 'mock';
if (provider === 'gemini') return geminiProvider();
return getAIProvider();
}