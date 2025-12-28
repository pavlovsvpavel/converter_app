import React, {useMemo, useState} from 'react';
import {View, Text, TouchableOpacity} from '@/components/Themed';
import {LayoutAnimation} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import CurrencySwitch from '@/components/CurrencySwitch';
import CurrencyInput from '@/components/CurrencyInput';
import {EXCHANGE_RATE} from '@/constants/currency';
import {convertCurrency} from "@/utils/calculations";

export default function CurrencyConverterCard() {
    const {t} = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [amount, setAmount] = useState('');
    const [isEuroToBgn, setIsEuroToBgn] = useState(true);

    const toggleCurrency = (isEuro: boolean) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsEuroToBgn(isEuro);
    };

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    const result = useMemo(() => {
        const numericAmount = parseFloat(amount.replace(',', '.'));
        return convertCurrency(numericAmount, isEuroToBgn);

    }, [amount, isEuroToBgn]);

    const sourceCurrency = isEuroToBgn ? 'EUR' : 'BGN';
    const targetCurrency = isEuroToBgn ? 'BGN' : 'EUR';

    return (
        <View className="bg-card rounded-xl mb-5">
            <TouchableOpacity className="expandable-btn" onPress={toggleExpand}>
                <View className="flex-row items-center">
                    <Ionicons name="swap-horizontal" size={20} color="#3b82f6"/>
                    <Text className="ml-3 text-base text-primary" weight="semibold">
                        {t('currency-converter')}
                    </Text>
                </View>
                <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="#3b82f6"/>
            </TouchableOpacity>

            {isExpanded && (
                <View className="justify-between gap-3 border-t border-default mt-4 pt-4">
                    <View className="flex-row justify-between items-end">
                        <Text className="text-sm text-primary mb-3" weight="semibold">{t('currency')}</Text>
                        <CurrencySwitch
                            isLeftActive={isEuroToBgn}
                            onToggle={toggleCurrency}
                        />
                    </View>

                    <CurrencyInput
                        value={amount}
                        onChangeText={setAmount}
                        currencyLabel={sourceCurrency}
                    />

                    <View
                        className="flex flex-row justify-between items-center bg-bgnd border rounded-lg py-2.5 text-base border-default text-primary w-full h-[50px] px-4">
                        <Text className="text-secondary text-sm">{t('converted-amount')}</Text>
                        <Text className="text-xl text-primary font-bold">
                            {result} <Text className="text-primary text-sm font-bold">{targetCurrency}</Text>
                        </Text>
                    </View>
                    <Text className="text-xs text-center text-secondary mt-2">
                        {t('rate')}: 1 EUR = {EXCHANGE_RATE} BGN
                    </Text>
                </View>
            )}
        </View>
    );
}