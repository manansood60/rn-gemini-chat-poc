import LottieView from 'lottie-react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useCallStore } from '../state/callStore';


export default function CallScreen() {
const { status, startIncoming, accept, end, toggleMute, toggleSpeaker, muted, speakerOn } = useCallStore();


return (
<View style={styles.container}>
<Text style={styles.title}>Call Status: {status.toUpperCase()}</Text>


{/* GIF during active/incoming call */}
{(status === 'incoming' || status === 'active') && (
<View style={{ alignItems: 'center' }}>
<Image source={require('../../assets/gif/talking.gif')} style={{ width: 220, height: 140 }} resizeMode="contain" />
<LottieView
source={require('../../assets/lottie/call-wave.json')}
autoPlay
loop
style={{ width: 240, height: 120 }}
/>
</View>
)}


<View style={styles.row}>
<Pressable onPress={startIncoming} style={[styles.btn, { backgroundColor: '#f59e0b' }]}>
<Text style={styles.btnText}>Simulate Incoming</Text>
</Pressable>
<Pressable onPress={accept} style={[styles.btn, { backgroundColor: '#10b981' }]}>
<Text style={styles.btnText}>Accept</Text>
</Pressable>
<Pressable onPress={end} style={[styles.btn, { backgroundColor: '#ef4444' }]}>
<Text style={styles.btnText}>End</Text>
</Pressable>
</View>


<View style={styles.row}>
<Pressable onPress={toggleMute} style={[styles.small, muted && styles.active]}>
<Text style={styles.smallText}>{muted ? 'Unmute' : 'Mute'}</Text>
</Pressable>
<Pressable onPress={toggleSpeaker} style={[styles.small, speakerOn && styles.active]}>
<Text style={styles.smallText}>{speakerOn ? 'Speaker Off' : 'Speaker On'}</Text>
</Pressable>
</View>


<Text style={styles.hint}>This screen stubs call logic. Swap in WebRTC or a telephony SDK for production.</Text>
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' },
title: { fontSize: 20, fontWeight: '800', marginBottom: 16 },
row: { flexDirection: 'row', gap: 10, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center' },
btn: { paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12 },
btnText: { color: 'white', fontWeight: '700' },
small: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, backgroundColor: '#e5e7eb' },
smallText: { fontWeight: '700' },
active: { backgroundColor: '#c7d2fe' },
hint: { marginTop: 16, color: '#6b7280', textAlign: 'center' }
});