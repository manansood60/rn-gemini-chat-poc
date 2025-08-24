import { StyleSheet, Text, View } from 'react-native';
import useTheme from '../hooks/useTheme';
import { bubble } from '../theme/colors';


export default function MessageBubble({ text, role }: { text: string; role: 'user' | 'assistant' }) {
const { isDark } = useTheme();
const isUser = role === 'user';


return (
<View style={[styles.row, isUser ? styles.right : styles.left]}>
<View
style={[styles.bubble, {
backgroundColor: isUser
? (isDark ? bubble.user.dark : bubble.user.light)
: (isDark ? bubble.assistant.dark : bubble.assistant.light)
}]}>
<Text style={[styles.text, isUser && styles.userText]}>{text}</Text>
</View>
</View>
);
}


const styles = StyleSheet.create({
row: { paddingHorizontal: 12, marginVertical: 6, width: '100%' },
left: { alignItems: 'flex-start' },
right: { alignItems: 'flex-end' },
bubble: { maxWidth: '80%', padding: 12, borderRadius: 14 },
text: { color: '#111827', fontSize: 16, lineHeight: 20 },
userText: { color: 'white' }
});