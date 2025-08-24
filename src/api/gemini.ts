import type { AIMessage, AIProvider } from './index';

/**
 * Real, non-streaming Gemini call using REST API.
 * Works in React Native with `fetch` (no Node polyfills needed).
 * Default model: `gemini-2.5-flash` — change if you need a different one.
 *
 * API docs: https://ai.google.dev/api/rest/v1beta/models
 * Endpoint: POST /v1beta/models/{model}:generateContent
 */
export function geminiProvider(model: string = 'gemini-2.5-flash'): AIProvider {
  const API_KEY = "AIzaSyADSE1JDp8_zMcKlVlQTzqnbAxAZO7YQQU";

  if (!API_KEY) {
    throw new Error('GEMINI_API_KEY missing. Set it in app.json extra or .env');
  }

  const URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

  return {
    async send(history: AIMessage[]) {
      // Map RN chat roles -> Gemini roles
      // RN uses 'user' | 'assistant'; Gemini expects 'user' | 'model'
      const contents = history.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const body = JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.6,
          topP: 0.9,
          maxOutputTokens: 1024,
        },
        // safetySettings: [...] // optional
      });

      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(`Gemini error ${res.status}: ${errText}`);
      }

      const data: any = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      if (!text) throw new Error('Gemini returned no text');
      return text;
    },
  };
}