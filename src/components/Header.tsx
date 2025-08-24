import { StyleSheet, Text, View } from 'react-native';


export default function Header({ title }: { title: string }) {
return (
<View style={styles.root}>
<Text style={styles.title}>{title}</Text>
</View>
);
}


const styles = StyleSheet.create({
root: { padding: 12, alignItems: 'center' },
title: { fontSize: 18, fontWeight: '800' }
});