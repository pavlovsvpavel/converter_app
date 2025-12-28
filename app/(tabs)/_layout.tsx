import {useTheme} from '@/contexts/ThemeContext';
import {Text} from '@/components/Themed';
import CustomScreenContainer from "@/components/CustomScreenContainer";
import {Ionicons} from "@expo/vector-icons";
import {TabIconProps} from "@/interfaces/interfaces";
import {Tabs} from "expo-router";
import {themeColors} from "@/constants/colors";
import React from "react";
import {useTranslation} from "react-i18next";

function TabIcon({focused, color, size, name}: TabIconProps) {
    return (
        <Ionicons
            name={name}
            size={focused ? size + 4 : size}
            color={color}
        />
    );
}

function TabsLayout() {
    const {theme} = useTheme();
    const colors = themeColors[theme];
    const {t} = useTranslation();

    return (
        <CustomScreenContainer>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: true,
                    headerShown: false,
                    tabBarActiveTintColor: colors.tabBarActive,
                    tabBarInactiveTintColor: colors.tabBarInactive,
                    tabBarStyle: {
                        elevation: 0,
                        backgroundColor: colors.tabBarBackground,
                        height: 55,
                        paddingBottom: 10,
                        paddingTop: 10,
                        borderTopWidth: 0,
                    },
                    tabBarItemStyle: {
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    tabBarLabel: ({focused, color, children}) => (
                        <Text
                            weight={focused ? 'bold' : 'normal'}
                            style={{color: color, fontSize: 10, marginTop: 2}}
                        >
                            {children}
                        </Text>
                    ),
                }}>
                <Tabs.Screen
                    name="home"
                    options={{
                        title: t('home'),
                        headerShown: false,
                        tabBarIcon: ({focused, color, size}) => (
                            <TabIcon
                                focused={focused}
                                color={color}
                                size={size}
                                name={focused ? 'home' : 'home-outline'}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: t('settings'),
                        headerShown: false,
                        tabBarIcon: ({focused, color, size}) => (
                            <TabIcon
                                focused={focused}
                                color={color}
                                size={size}
                                name={focused ? 'settings' : 'settings-outline'}
                            />
                        ),
                    }}
                />
            </Tabs>
        </CustomScreenContainer>
    );
}

export default React.memo(TabsLayout);


