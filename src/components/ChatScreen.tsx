import { useNavigation } from '@react-navigation/native';
import { nanoid } from 'nanoid/non-secure';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ai } from '../api';
import { useChatStore } from '../state/chatStore';
import LoadingDots from './LoadingDots';
import MessageBubble from './MessageBubble';


export default function ChatScreen() {
const nav = useNavigation<any>();
const { messages, enqueue, update } = useChatStore();
const [text, setText] = useState('');
const [loading, setLoading] = useState(false);
const inputRef = useRef<TextInput>(null);


const data = useMemo(() => [...messages].sort((a,b) => a.createdAt - b.createdAt), [messages]);


const onSend = useCallback(async () => {
if (!text.trim() || loading) return;
const id = nanoid();
const userMsg = { id, role: 'user' as const, text: text.trim(), createdAt: Date.now() };
enqueue(userMsg);
setText('');
inputRef.current?.focus();


const pendingId = nanoid();
enqueue({ id: pendingId, role: 'assistant', text: '', createdAt: Date.now(), pending: true });


setLoading(true);
try {
const provider = ai();
const history = data.concat(userMsg).map(m => ({ role: m.role === 'system' ? 'assistant' : m.role, content: m.text }));
const reply = await provider.send(history);
update(pendingId, { text: reply, pending: false });
} catch (e: any) {
update(pendingId, { text: '', pending: false, error: e?.message || 'Error' });
} finally {
setLoading(false);
}
}, [text, loading, enqueue, update, data]);


return (
<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
<View style={styles.header}>
<Text style={styles.title}>AI Chat</Text>
<Pressable onPress={() => nav.navigate('Call')} style={styles.callBtn}>
<Text style={styles.callText}>Start Call</Text>
</Pressable>
</View>


<FlatList
contentContainerStyle={{ paddingVertical: 12 }}
data={data}
keyExtractor={(item) => item.id}
renderItem={({ item }) => (
item.pending ? (
<LoadingDots />
) : (
<MessageBubble text={item.text} role={item.role as any} />
)
)}
inverted
/>


<View style={styles.inputRow}>
<TextInput
ref={inputRef}
style={styles.input}
placeholder="Type a message"
value={text}
onChangeText={setText}
onSubmitEditing={onSend}
returnKeyType="send"
/>
<Pressable onPress={onSend} style={styles.send}>
<Text style={{ color: 'white', fontWeight: '600' }}>Send</Text>
</Pressable>
</View>
</KeyboardAvoidingView>
);
}


const styles = StyleSheet.create({
header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12 },
title: { fontSize: 18, fontWeight: '700' },
callBtn: { backgroundColor: '#10b981', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
callText: { color: 'white', fontWeight: '600' },
inputRow: { flexDirection: 'row', padding: 10, gap: 8 },
input: { flex: 1, backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
send: { backgroundColor: '#2563eb', paddingHorizontal: 16, justifyContent: 'center', borderRadius: 12 }
});