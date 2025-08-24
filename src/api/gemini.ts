import axios from 'axios';
import type { AIMessage, AIProvider } from './index';


/**
* Replace the URL and payload shape with the current Gemini 2.5 Text/Audio endpoint.
* Keep the interface stable: pass chat history, return assistant text.
*/
export function geminiProvider(): AIProvider {
const API_KEY = "AIzaSyADSE1JDp8_zMcKlVlQTzqnbAxAZO7YQQU";


const client = axios.create({
baseURL: 'https://generativelanguage.googleapis.com/v1beta/', // TODO: confirm path for your chosen model
timeout: 20000,
params: { key: API_KEY }
});


return {
async send(history: AIMessage[]) {
// Transform to model-specific format
const contents = history.map((m) => ({ role: m.role, parts: [{ text: m.content }] }));


// Example request body for text-only; adjust for audio if needed
const body = {
contents,
// model: 'models/gemini-2.5-flash', // example placeholder; set explicitly on your endpoint
};


// Example: POST /models/{model}:generateContent
// const { data } = await client.post('models/gemini-2.5-flash:generateContent', body);
// const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';


// To avoid breakage before you wire the exact endpoint, throw if no key
if (!API_KEY) {
throw new Error('GEMINI_API_KEY missing. Set it in app.json extra or .env');
}


// For now, simulate until you wire the real call
return 'Gemini response (wire actual endpoint here).';
}
};
}