import type { AIMessage, AIProvider } from './index';


export function getAIProvider(): AIProvider {
return {
async send(history: AIMessage[]) {
const last = history[history.length - 1]?.content || '';
// Tiny fake model: echoes and adds a playful suffix
await new Promise(r => setTimeout(r, 700));
return `You said: "${last}" — here is a mock response.`;
}
};
}