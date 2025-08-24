import Constants from 'expo-constants';
import { geminiProvider } from './gemini';
import { getAIProvider } from './mock';

export type AIMessage = { role: 'user' | 'assistant'; content: string };
export type AIProvider = {
  send: (history: AIMessage[]) => Promise<string>;
};

export function ai(): AIProvider {
  const extra = (Constants.expoConfig?.extra as any) || {};
  const provider = extra?.AI_PROVIDER || 'mock';
  if (provider === 'gemini') {
    return geminiProvider(extra?.GEMINI_MODEL || 'gemini-2.5-flash');
  }
  return getAIProvider();
}