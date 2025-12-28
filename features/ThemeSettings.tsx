import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from '@/components/Themed';
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {LayoutAnimation} from 'react-native';

export default function ThemeSettings() {
    const {t} = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    return (
        <View className="mt-5">
            <TouchableOpacity className="expandable-btn" onPress={toggleExpand}>
                <View className="flex-row items-center">
                    <MaterialCommunityIcons name="theme-light-dark" size={20} color="#6B7280"/>
                    <Text className="ml-3 text-base text-primary" weight="semibold">
                        {t('theme')}
                    </Text>
                </View>
                <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="#6B7280"/>
            </TouchableOpacity>

            {isExpanded && (
                <ThemeSwitcher/>
            )}
        </View>
    );
}