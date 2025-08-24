import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import CallScreen from '../src/components/CallScreen';
import ChatScreen from '../src/components/ChatScreen';


export type RootStackParamList = {
Chat: undefined;
Call: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
const scheme = useColorScheme();
return (
<Stack.Navigator>
<Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'AI Chat' }} />
<Stack.Screen name="Call" component={CallScreen} options={{ title: 'Call' }} />
</Stack.Navigator>
);
}