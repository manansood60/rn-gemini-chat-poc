import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import ChatScreen from './src/components/ChatScreen';
import CallScreen from './src/components/CallScreen';


export type RootStackParamList = {
Chat: undefined;
Call: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
const scheme = useColorScheme();
return (
<NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
<Stack.Navigator>
<Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'AI Chat' }} />
<Stack.Screen name="Call" component={CallScreen} options={{ title: 'Call' }} />
</Stack.Navigator>
</NavigationContainer>
);
}