import React from "react";
import {View, Text} from '@/components/Themed';
import {ScrollView, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import CustomScreenContainer from "@/components/CustomScreenContainer";
import {images} from "@/constants/images";
import LanguageSettings from '@/features/LanguageSettings';
import ThemeSettings from '@/features/ThemeSettings';

export default function SettingsScreen() {
    const {t} = useTranslation();

    return (
        <CustomScreenContainer>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingVertical: 0, flexGrow: 1}}
            >
                <View className="gap-4">
                    <Image
                        source={images.logo}
                        className="w-28 h-28 mx-auto"
                    />

                    <View className="bg-card rounded-xl p-5 mb-5 gap-2">

                        <View className="flex-row justify-between items-center mb-5">
                            <Text className="text-lg text-primary" weight="bold">{t('settings')}</Text>
                            <Ionicons name="settings-outline" size={22} color="#3B82F6"/>
                        </View>

                        <LanguageSettings/>
                        <ThemeSettings/>
                    </View>
                </View>
            </ScrollView>
        </CustomScreenContainer>
    );
}