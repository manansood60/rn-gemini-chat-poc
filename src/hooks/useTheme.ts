import { useColorScheme } from 'react-native';


export default function useTheme() {
const scheme = useColorScheme();
const isDark = scheme === 'dark';
return { scheme, isDark };
}