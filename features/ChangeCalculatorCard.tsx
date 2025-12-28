import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from '@/components/Themed';
import { LayoutAnimation } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import CurrencySwitch from '@/components/CurrencySwitch';
import CurrencyInput from '@/components/CurrencyInput';
import { EXCHANGE_RATE } from '@/constants/currency';

export default function ChangeCalculatorCard() {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [billAmount, setBillAmount] = useState('');
    const [givenAmount, setGivenAmount] = useState('');
    const [givenIsEuro, setGivenIsEuro] = useState(true);

    const toggleGivenCurrency = (isEuro: boolean) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setGivenIsEuro(isEuro);
    };

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    const changeResults = useMemo(() => {
        if (!billAmount || !givenAmount) return { eur: '0.00', bgn: '0.00' };
        const bill = parseFloat(billAmount.replace(',', '.'));
        const given = parseFloat(givenAmount.replace(',', '.'));
        if (isNaN(bill) || isNaN(given)) return { eur: '0.00', bgn: '0.00' };

        const givenInEuro = givenIsEuro ? given : given / EXCHANGE_RATE;
        const diffInEuro = givenInEuro - bill;
        const diffInBgn = diffInEuro * EXCHANGE_RATE;

        return {
            eur: diffInEuro.toFixed(2),
            bgn: diffInBgn.toFixed(2),
            isNegative: diffInEuro < 0
        };
    }, [billAmount, givenAmount, givenIsEuro]);

    return (
        <View className="bg-card rounded-xl">
            <TouchableOpacity className="expandable-btn" onPress={toggleExpand}>
                <View className="flex-row items-center">
                    <Ionicons name="calculator" size={20} color="#6B7280" />
                    <Text className="ml-3 text-base text-primary" weight="semibold">
                        {t('change-calculator')}
                    </Text>
                </View>
                <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="#6B7280" />
            </TouchableOpacity>

            {isExpanded && (
                <View className="justify-between gap-4 border-t border-default mt-4 pt-4">
                    <View>
                        <Text className="text-sm text-primary mb-2" weight="semibold">{t('bill-amount')}</Text>
                        <CurrencyInput
                            value={billAmount}
                            onChangeText={setBillAmount}
                            currencyLabel="EUR"
                        />
                    </View>

                    <View>
                        <View className="flex-row justify-between items-end mb-2">
                            <Text className="text-sm text-primary" weight="semibold">{t('paid-amount')}</Text>
                            <CurrencySwitch
                                isLeftActive={givenIsEuro}
                                onToggle={toggleGivenCurrency}
                            />
                        </View>
                        <CurrencyInput
                            value={givenAmount}
                            onChangeText={setGivenAmount}
                            currencyLabel={givenIsEuro ? 'EUR' : 'BGN'}
                        />
                    </View>

                    <View className="flex-column justify-between my-2">
                        <Text className="text-sm text-primary" weight="semibold">{t('change-to-return')}</Text>
                        <View className="bg-bgnd rounded-lg p-3 border border-default mt-2">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-primary text-sm font-semibold">EUR</Text>
                                <Text className={`text-xl font-bold ${changeResults.isNegative ? 'text-red-500' : 'text-primary'}`}>
                                    {changeResults.eur} €
                                </Text>
                            </View>
                            <View className="h-[1px] bg-gray-200 w-full my-4" />
                            <View className="flex-row justify-between items-center">
                                <Text className="text-primary text-sm font-semibold">BGN</Text>
                                <Text className={`text-xl font-bold ${changeResults.isNegative ? 'text-red-500' : 'text-primary'}`}>
                                    {changeResults.bgn} lv
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-xs text-center text-secondary">
                        {t('rate')}: 1 EUR = {EXCHANGE_RATE} BGN
                    </Text>
                </View>
            )}
        </View>
    );
}