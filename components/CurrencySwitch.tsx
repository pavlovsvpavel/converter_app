import React from 'react';
import {View, Text, TouchableOpacity} from '@/components/Themed';
import {CurrencySwitchProps} from "@/interfaces/interfaces";


export default function CurrencySwitch({
                                           isLeftActive,
                                           onToggle,
                                           leftLabel = 'EUR',
                                           rightLabel = 'BGN'
                                       }: CurrencySwitchProps) {
    return (
        <View className="h-[40px] w-[140px] bg-bgnd rounded-full flex-row relative p-1">
            <View
                className={`absolute top-1 bottom-1 w-[48%] bg-blue-500 rounded-full shadow-sm z-0 ${isLeftActive ? 'left-1' : 'right-1'}`}
            />
            <TouchableOpacity
                onPress={() => onToggle(true)}
                className="flex-1 items-center justify-center z-10"
                activeOpacity={1}
            >
                <Text className={`text-xs font-bold ${isLeftActive ? 'text-primary' : 'text-secondary'}`}>
                    {leftLabel}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onToggle(false)}
                className="flex-1 items-center justify-center z-10"
                activeOpacity={1}
            >
                <Text className={`text-xs font-bold ${!isLeftActive ? 'text-primary' : 'text-secondary'}`}>
                    {rightLabel}
                </Text>
            </TouchableOpacity>
        </View>
    );
}