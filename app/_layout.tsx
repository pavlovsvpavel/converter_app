import {View} from "react-native";
import './globals.css';
import '../services/i18n';
import {useFonts} from "expo-font";
import {ThemeProvider} from '@/contexts/ThemeContext';
import {useTheme} from '@/contexts/ThemeContext';
import {StatusBar} from 'expo-status-bar';
import {PageLoadingSpinner} from "@/components/PageLoadingSpinner";
import {Stack} from "expo-router";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AppContent/>
        </ThemeProvider>
    );
}

function AppContent() {
    const {theme} = useTheme();

    const [fontsLoaded] = useFonts({
        'ubuntu-normal': require('../assets/fonts/Ubuntu-Regular.ttf'),
        'ubuntu-bold': require('../assets/fonts/Ubuntu-Bold.ttf'),
        'ubuntu-semibold': require('../assets/fonts/Ubuntu-Medium.ttf'),
        'ubuntu-light': require('../assets/fonts/Ubuntu-Light.ttf'),
        'ubuntu-italic': require('../assets/fonts/Ubuntu-Italic.ttf'),
    });

    const isAppLoading = !fontsLoaded;

    if (isAppLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <PageLoadingSpinner/>
            </View>
        );
    }

    return (
        <>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'}/>
            <RootNavigator/>
        </>
    );
}

function RootNavigator() {
    return (
        <Stack
            screenOptions={{
                animation: 'slide_from_right',
                gestureEnabled: true,
            }}
        >
            <Stack.Screen
                name="(tabs)"
                options={{headerShown: false}}
            />
        </Stack>
    )
}
