import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';


export default function LoadingDots() {
const a1 = useRef(new Animated.Value(0)).current;
const a2 = useRef(new Animated.Value(0)).current;
const a3 = useRef(new Animated.Value(0)).current;


useEffect(() => {
const mk = (v: Animated.Value, delay: number) => Animated.loop(Animated.sequence([
Animated.timing(v, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
Animated.timing(v, { toValue: 0, duration: 400, useNativeDriver: true })
]));
const a = mk(a1, 0); const b = mk(a2, 150); const c = mk(a3, 300);
a.start(); b.start(); c.start();
return () => { a.stop(); b.stop(); c.stop(); };
}, [a1, a2, a3]);


const Dot = ({ v }: { v: Animated.Value }) => (
<Animated.View style={[styles.dot, { opacity: v }]} />
);


return (
<View style={styles.row}><Dot v={a1} /><Dot v={a2} /><Dot v={a3} /></View>
);
}


const styles = StyleSheet.create({
row: { flexDirection: 'row', gap: 6, padding: 8 },
dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#9ca3af' }
});