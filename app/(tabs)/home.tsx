import {View, Text} from '@/components/Themed';
import {ScrollView, Image, KeyboardAvoidingView, Platform, Keyboard} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import CustomScreenContainer from "@/components/CustomScreenContainer";
import CurrencyConverterCard from '@/features/CurrencyConverterCard';
import ChangeCalculatorCard from '@/features/ChangeCalculatorCard';
import {images} from "@/constants/images";
import {useEffect} from "react";

export default function HomeScreen() {
    const {t} = useTranslation();

    useEffect(() => {
        const subscription = Keyboard.addListener('keyboardDidHide', () => {
            Keyboard.dismiss();
        });

        return () => subscription.remove();
    }, []);

    return (
        <CustomScreenContainer>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 30}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingVertical: 0, flexGrow: 1}}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="gap-4">
                        <Image
                            source={images.logo} className="w-28 h-28 mx-auto"
                        />
                        <View className="bg-card rounded-xl p-5 mb-5 gap-2">

                            <View className="flex-row justify-between items-center mb-5">
                                <Text className="text-lg text-primary" weight="bold">{t('tools')}</Text>
                                <Ionicons name="calculator-outline" size={22} color="#3B82F6"/>
                            </View>

                            <CurrencyConverterCard/>
                            <ChangeCalculatorCard/>

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </CustomScreenContainer>
    );
}