import './globals.css';
import '../services/i18n';
import {useFonts} from "expo-font";
import {ThemeProvider} from '@/contexts/ThemeContext';
import {useTheme} from '@/contexts/ThemeContext';
import {StatusBar} from 'expo-status-bar';
import {Stack} from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AppContent/>
        </ThemeProvider>
    );
}

function AppContent() {
    const { theme, isThemeLoading } = useTheme();

    const [fontsLoaded, fontError] = useFonts({
        'ubuntu-normal': require('../assets/fonts/Ubuntu-Regular.ttf'),
        'ubuntu-bold': require('../assets/fonts/Ubuntu-Bold.ttf'),
        'ubuntu-semibold': require('../assets/fonts/Ubuntu-Medium.ttf'),
        'ubuntu-light': require('../assets/fonts/Ubuntu-Light.ttf'),
        'ubuntu-italic': require('../assets/fonts/Ubuntu-Italic.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError, isThemeLoading]);

    if (!fontsLoaded && !fontError) {
        return null;
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
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{headerShown: false}}
            />
        </Stack>
    )
}
