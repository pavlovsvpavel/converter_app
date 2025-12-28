import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from '@/components/Themed';
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import * as SecureStore from 'expo-secure-store';
import {LayoutAnimation} from 'react-native';

export default function LanguageSettings() {
    const {t, i18n} = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        // Optional: Add smooth animation
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    const changeLanguage = async (lng: 'en' | 'bg') => {
        try {
            await i18n.changeLanguage(lng);
            await SecureStore.setItemAsync('user-language', lng);
        } catch (error) {
            console.error("Failed to change or save language:", error);
        }
    };

    const renderLanguageOption = (code: 'en' | 'bg', label: string) => {
        const isActive = i18n.language === code;
        return (
            <TouchableOpacity
                className="flex-row items-center justify-between p-3 rounded-lg active:bg-gray-100 dark:active:bg-gray-800"
                onPress={() => changeLanguage(code)}
            >
                <Text className="text-base text-primary">{label}</Text>
                <Ionicons
                    name={isActive ? 'radio-button-on' : 'radio-button-off'}
                    size={24}
                    color={isActive ? '#3B82F6' : '#9CA3AF'}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <TouchableOpacity className="expandable-btn" onPress={toggleExpand}>
                <View className="flex-row items-center">
                    <Ionicons name="language" size={20} color="#6B7280"/>
                    <Text className="ml-3 text-base text-primary" weight="semibold">
                        {t('changeLanguage')}
                    </Text>
                </View>
                <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="#6B7280"/>
            </TouchableOpacity>

            {isExpanded && (
                <View className="justify-between gap-3 border-t border-default mt-4 pt-4">
                    {renderLanguageOption('en', 'English')}
                    {renderLanguageOption('bg', 'Български')}
                </View>
            )}
        </View>
    );
}